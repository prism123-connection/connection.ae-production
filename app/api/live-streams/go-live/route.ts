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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userIdFromQuery = searchParams.get('userId'); 
  const callId = searchParams.get('callId');

  const { error, user } = await authenticateUser();
  if (error) return error;

  if (user.id !== userIdFromQuery) {
    return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
  }

  const apiKey = process.env.STREAM_API_KEY!;
  const apiSecret = process.env.STREAM_SECRET!;

  const payload = {
    user_id: userIdFromQuery,
    validity_in_seconds: 604800,
  };

  const token = jwt.sign(payload, apiSecret);

  return NextResponse.json({ apiKey, token });
}


export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userIdFromQuery = searchParams.get('userId'); 
  const callId = searchParams.get('callId');

  const { error, user } = await authenticateUser();
  if (error) return error;

  if (user.id !== userIdFromQuery) {
    return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
  }

  try {
    await prisma.liveStream.update({
      where: {
        id: callId!, 
        userId : user.id
       },
      data: {
        status: "LIVE",
        startAt: new Date(),
      },
    });
  } catch (err) {
    console.error("Error setting stream LIVE:", err);
    return NextResponse.json({ error: "Failed to update live stream status" }, { status: 500 });
  }


  return NextResponse.json({ status : 201 });
}

