
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function authenticateUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth_token")?.value;

  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    cookiesStore.delete("auth_token");
    return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    cookiesStore.delete("auth_token");
    return { error: NextResponse.json({ error: "User not found" }, { status: 404 }) };
  }

  return { user };
}

export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userIdFromQuery = searchParams.get('userId');
    const callId = searchParams.get('callId'); // assuming this is productId
  
    if (!userIdFromQuery || !callId) {
      return NextResponse.json({ error: "Missing userId or callId" }, { status: 400 });
    }
  
    const { error, user } = await authenticateUser();
    if (error) return error;
  
    if (user.id !== userIdFromQuery) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
    }
  
    try {
      const liveStream = await prisma.liveStream.update({
        where: {
          id: callId,
          userId: user.id
        },
        data: {
          status: "ENDED",
          endAt: new Date(),
        },
      });
  
      return NextResponse.json({ message: "Live stream ended successfully", liveStream });
    } catch (err) {
      console.error("Failed to update live stream:", err);
      return NextResponse.json({ error: "Failed to update live stream" }, { status: 500 });
    }
  }