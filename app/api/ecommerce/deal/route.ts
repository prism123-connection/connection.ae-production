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

// 📦 POST /api/ecommerce/create
export async function POST(req: NextRequest) {
  const { error, user } = await authenticateUser();
  if (error) return error;

  const body = await req.json();

   const {  productId } = body;

    if (!productId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }


  try {

      const product = await  prisma.product.findUnique({
        where : {id : productId}
      })

      if (!product) {
        return NextResponse.json(
      { error: "Missing product" },
      { status: 400 }
    );
      }

     const deal = await prisma.deals.create({
      data: {
        productId,
        sellerId : product.userId,
        buyerId: user.id,
        amount: product.price,
        skus: 'need to be added',
      },
    });

    return NextResponse.json({ status: 201 });

  } catch (err: any) {
    console.error("Product creation failed:", err);
    return NextResponse.json({ error: "Failed to create product", details: err.message }, { status: 500 });
  }
}
