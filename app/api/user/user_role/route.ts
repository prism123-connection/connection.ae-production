import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Came here with: ", body);

    const { role } = body;

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

    console.log("After decoding cookies token: ", decoded);

    const existingUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }


    const updateData: Record<string, any> = {};

    if (role === 'FREE') {
        updateData.role = Role.FREE_USER;
    }

    console.log("Updating user info with: ", updateData);

    try {
      await prisma.user.update({
        where: { id: decoded.id },
        data: updateData,
      });
    } catch (prismaError) {
      console.error("Prisma update failed:", prismaError);
      return NextResponse.json(
        { error: "Failed to update user data" },
        { status: 500 }
      );
    }

    cookiesStore.delete("auth_token");

    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: updateData.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    cookiesStore.set("auth_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(
      { message: "User Successfully Created to use free version" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
