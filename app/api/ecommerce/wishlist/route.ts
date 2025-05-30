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

  const wishlistItems = await prisma.wishlist.findMany({
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

    return NextResponse.json(wishlistItems);
  } catch (err: any) {
    console.error("Failed to fetch all products:", err);
    return NextResponse.json({ error: "Failed to fetch products", details: err.message }, { status: 500 });
  }
}

// POST - Add item to wishlist
export async function POST(req: NextRequest) {
    const { error, user } = await authenticateUser();
    if (error) return error;
  
    try {
      const { productId } = await req.json();
  
      if (!productId) {
        return NextResponse.json({ error: "Missing productId" }, { status: 400 });
      }
  
      const wishlistItem = await prisma.wishlist.upsert({
        where: {
          userId_productId: {
            userId: user.id,
            productId,
          }
        },
        update: {},
        create: {
          userId: user.id,
          productId,
        }
      });
  
      return NextResponse.json(wishlistItem);
    } catch (err: any) {
      console.error("Failed to add to wishlist:", err);
      return NextResponse.json({ error: "Failed to add to wishlist", details: err.message }, { status: 500 });
    }
  }
  
  // DELETE - Remove item from wishlist
  export async function DELETE(req: NextRequest) {
    const { error, user } = await authenticateUser();
    if (error) return error;
  
    try {
      const { productId } = await req.json();
  
      if (!productId) {
        return NextResponse.json({ error: "Missing productId" }, { status: 400 });
      }
  
      await prisma.wishlist.delete({
        where: {
          userId_productId: {
            userId: user.id,
            productId,
          }
        }
      });
  
      return NextResponse.json({ message: "Item removed from wishlist" });
    } catch (err: any) {
      console.error("Failed to delete from wishlist:", err);
      return NextResponse.json({ error: "Failed to delete from wishlist", details: err.message }, { status: 500 });
    }
  }