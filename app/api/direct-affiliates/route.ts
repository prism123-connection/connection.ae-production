import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || !decoded.id) {
      cookiesStore.delete("auth_token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Fetch direct referrals
    const directReferrals = await prisma.referral.findMany({
      where: {
        referrerId: userId,
      },
      include: {
        referred: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            walletBalance: true,
            createdAt: true,
            role: true,
          },
        },
      },
    });

    console.log("Direct referrals: ", directReferrals);

    if (!directReferrals || directReferrals.length === 0) {
      return NextResponse.json({ referrals: [] });
    }

    return NextResponse.json({
      success: true,
      referrals: directReferrals.map((referral) => ({
        firstName: referral.referred.firstName,
        lastName: referral.referred.lastName,
        email: referral.referred.email,
        conversion: referral.conversion,
        convertedAt: referral.updatedAt,
        role : referral.referred.role,
      })),
    });
  } catch (error) {
    console.error("Error fetching direct referrals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch direct referrals" },
      { status: 500 }
    );
  }
}
