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

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || !decoded.id) {
      cookiesStore.delete("auth_token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Fetch the user's wallet balance from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        walletBalance: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch wallet balance" },
      { status: 500 }
    );
  }
}
