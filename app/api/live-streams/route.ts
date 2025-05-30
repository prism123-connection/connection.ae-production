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

// GET /api/livestream — Fetch all live streams (any owner)
export async function GET(req: NextRequest) {
  const { error } = await authenticateUser();
  if (error) return error;

  try {
    const liveStreams = await prisma.liveStream.findMany({
      orderBy: {
        goLiveAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatarUrl: true
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            productImages: true,
          },
        },
      },
    });

    return NextResponse.json(liveStreams);
  } catch (err: any) {
    console.error("Failed to fetch live streams:", err);
    return NextResponse.json({ error: "Failed to fetch live streams", details: err.message }, { status: 500 });
  }
}
