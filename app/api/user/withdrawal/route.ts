import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to authenticate user
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

  if (user.walletBalance === 0) {
    return NextResponse.json({status : 500, error : 'Insufficient balance'})
  }

  const body = await req.json();

  const { amount  } = body;

  if (amount === undefined || amount === null || isNaN(Number(amount))) {
      return NextResponse.json({ message: 'Please enter the amount' })
  }


  try {

    // Create KYC record
     await prisma.withdrawals.create({
      data: {
        amount : amount, 
        currency : 'USD', 
        userId : user.id,
        walletBalance : user.walletBalance
      },
    });

    await prisma.user.update({
        where: {id : user.id},
        data : {
            walletBalance : {
                decrement : amount
            }
        }
    })

    return NextResponse.json({ status: 201 });
  } catch (err: any) {
    console.error("KYC creation failed:", err);
    return NextResponse.json({ error: "Failed to create product", details: err.message }, { status: 500 });
  }
}
