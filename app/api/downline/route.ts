import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // const token = req.headers.get("Authorization")?.split(" ")[1];
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    console.log("userID from downline: ", userId)

    // Fetch downline referrals up to 3 levels deep (level 0, level 1, and level 2)
    const downlineReferrals = await prisma.$queryRaw`
      WITH RECURSIVE downline AS (
        SELECT 
          r.referred_id AS referredId,
          r.referrer_id AS referrerId,
          u.firstName,
          u.lastName,
          u.email,
          u.role, 
          r.conversion,
          r.updatedAt AS convertedAt,
          0 AS level
        FROM 
          Referral r
          JOIN User u ON r.referred_id = u.id
        WHERE 
          r.referrer_id = ${userId}
        
        UNION ALL
        
        SELECT 
          r.referred_id AS referredId,
          r.referrer_id AS referrerId,
          u.firstName,
          u.lastName,
          u.email,
          r.conversion,
          u.role, 
          r.updatedAt AS convertedAt,
          d.level + 1
        FROM 
          Referral r
          JOIN User u ON r.referred_id = u.id
          JOIN downline d ON r.referrer_id = d.referredId
        WHERE 
          d.level < 2
      )
      SELECT * FROM downline
      ORDER BY level, firstName, lastName;
    `;

    if (!Array.isArray(downlineReferrals) || downlineReferrals.length === 0) {
      return NextResponse.json({ success: true, referrals: [] });
    }

    const formattedReferrals = downlineReferrals.map((referral: any) => ({
      referredId: referral.referredId,
      firstName: referral.firstName,
      lastName: referral.lastName,
      email: referral.email,
      level: referral.level.toString(),
      conversion: referral.conversion,
      convertedAt: referral.convertedAt,
      role : referral.role,
    }));

    console.log("Formatted Referrals: ", formattedReferrals)

    return NextResponse.json({
      success: true,
      referrals: formattedReferrals,
    });
  } catch (error) {
    console.error("Error fetching downline referrals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch downline referrals" },
      { status: 500 }
    );
  }
}