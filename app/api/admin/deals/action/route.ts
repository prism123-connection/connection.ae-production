import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { sendOrderPaymentRequestMail } from '@/lib/smtp';

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
    const { dealId , dealStatus, productId} = body;
    if (!dealId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const existingDeal = await prisma.deals.findUnique({
      where: { id: dealId },
    });
    if (!existingDeal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

     if (!productId) {
          return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
    
      const existingProduct = await prisma.product.findUnique({
          where: { id: productId },
      });
    
      if (!existingProduct) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    
      const amount = existingProduct.price

     await prisma.deals.update({
      where: { id: dealId },
      data: { dealStatus: dealStatus },
    });

    if (dealStatus === 'APPROVED') { 

      const deal = await prisma.deals.findUnique({
        where: { id: dealId },
        include: { buyer : true },
      })

      const email = deal?.buyer?.email;

      if (!email) { return NextResponse.json({ error: 'Buyer email not found' }, { status: 404 });}

    const paymentLink  = `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/ecommerce/payment-gateway?productId=${productId}&dealId=${dealId}`

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });


      sendOrderPaymentRequestMail(email, deal.buyer.firstName, deal.buyer.lastName, Number(deal.amount), currentDate, paymentLink)
    }

    return NextResponse.json({ status: 200 });
  } catch (err: any) {
    console.error("Failed to fetch all products:", err);
    return NextResponse.json({ error: "Failed to verify user", details: err.message }, { status: 500 });
  }
}
