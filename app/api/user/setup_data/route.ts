import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    if (!decoded || !decoded.id) {
      cookiesStore.delete("auth_token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("Got this in user data after decoding from cookies: ", decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        dateOfBirth: true,
        gender: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        emiratesId: true,
        phoneNumber: true,
        occupation: true,
        referralSource: true,
        joinReason: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const referral = await prisma.referral.findUnique({
      where: { referredId: decoded.id },
      include: {
        referrer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    console.log("Referral: ", referral);

    return NextResponse.json(
      {
        user,
        referrer: referral?.referrer
          ? {
              name: `${referral.referrer.firstName} ${referral.referrer.lastName}`,
              email: referral.referrer.email,
            }
          : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
