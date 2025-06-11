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
export async function POST(req: NextRequest) {
  const { error, user } = await authenticateUser();
  if (error) return error;

const body = await req.json();

const {  dealId , deliveryStatus} = body;

if (!dealId || !deliveryStatus) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
}

const deal = await prisma.deals.findUnique({
  where: { id: dealId },
});

if (!deal) {
    return NextResponse.json(
      { error: "Deal not found" },
      { status: 404 }
    );  
}

if (deal.sellerId !== user.id) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  try {
    const deals = await prisma.deals.update({
       where: { id: deal.id, },
        data: {
            deliveryStatus : deliveryStatus
        }
  
    });

    return NextResponse.json({ deals }, { status: 200 });
  } catch (err: any) {
    console.error("Failed to fetch all products:", err);
    return NextResponse.json({ error: "Failed to fetch products", details: err.message }, { status: 500 });
  }
}
