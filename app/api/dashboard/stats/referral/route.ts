import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || !decoded.id) {
      cookiesStore.delete("auth_token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Fetch the total number of users the current user has referred
    const totalMembers = await prisma.referral.count({
      where: {
        referrerId: userId,
      },
    });

    // Fetch the total number of referred users with the role "PAID_USER"
    const paidReferrals = await prisma.referral.count({
      where: {
        referrerId: userId,
        referred: {
          role: Role.PAID_USER,
        },
      },
    });

    const referralBonus = paidReferrals * 10;

    // Return the totalMembers and referralBonus in the response
    return NextResponse.json({
      totalMembers,
      referralBonus,
    });
  } catch (error) {
    console.error("Error fetching referrals data:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral data" },
      { status: 500 }
    );
  }
}
