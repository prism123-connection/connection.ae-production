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

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const registrations = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!registrations) {
      return NextResponse.json(
        { success: false, error: "No users found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
