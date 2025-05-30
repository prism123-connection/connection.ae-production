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

// GET /api/ecommerce — Fetch all products (any owner)
export async function GET(req: NextRequest) {
  const { error, user } = await authenticateUser();
  if (error) return error;

  try {

    const cartItems = await prisma.cart.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            name: true,
            price: true,
            productImages: {
              select: {
                url: true,  // Correct field name for image URL
              },
            },
          },
        },
      },
    });
    

    return NextResponse.json(cartItems);
  } catch (err: any) {
    console.error("Failed to fetch all products:", err);
    return NextResponse.json({ error: "Failed to fetch products", details: err.message }, { status: 500 });
  }
}


// POST - Add item to cart
export async function POST(req: NextRequest) {
    const { error, user } = await authenticateUser();
    if (error) return error;
  
    try {
      const body = await req.json();
      const { productId, quantity } = body;
  
      if (!productId || !quantity || quantity <= 0) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
      }
  
      const cartItem = await prisma.cart.upsert({
        where: {
          userId_productId: {
            userId: user.id,
            productId,
          },
        },
        update: {
          quantity: { increment: quantity }, // add to existing
        },
        create: {
          userId: user.id,
          productId,
          quantity,
        },
      });
  
      return NextResponse.json(cartItem);
    } catch (err: any) {
      console.error("Failed to add to cart:", err);
      return NextResponse.json({ error: "Failed to add to cart", details: err.message }, { status: 500 });
    }
  }
  
  // DELETE - Remove item from cart
  export async function DELETE(req: NextRequest) {
    const { error, user } = await authenticateUser();
    if (error) return error;
  
    try {
      const body = await req.json();
      const { productId } = body;
  
      if (!productId) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
      }
  
      await prisma.cart.deleteMany({
        where: {
          userId: user.id,
          productId,
        },
      });
  
      return NextResponse.json({ message: "Item removed from cart" });
    } catch (err: any) {
      console.error("Failed to delete from cart:", err);
      return NextResponse.json({ error: "Failed to delete from cart", details: err.message }, { status: 500 });
    }
  }