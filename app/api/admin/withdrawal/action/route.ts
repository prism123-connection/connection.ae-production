import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Authenticate user, but don’t restrict product ownership
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

export async function POST(req: NextRequest) {
  const { error, user } = await authenticateUser();
  if (error) return error;
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
  return NextResponse.json({ status: 500 });
  }

  try {
    const body = await req.json();
    const { withdrawalId, action } = body;
    if (!withdrawalId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }
    const existingWithdrawal = await prisma.withdrawals.findUnique({
      where: { id: withdrawalId },
    });
    if (!existingWithdrawal) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    await prisma.withdrawals.update({
      where: { id: withdrawalId },
      data: { status : action},
    });
    return NextResponse.json( { status: 200 });
  } catch (err: any) {
    console.error("Failed to fetch all products:", err);
    return NextResponse.json({ error: "Failed to verify user", details: err.message }, { status: 500 });
  }
}
