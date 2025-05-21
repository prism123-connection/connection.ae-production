
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

export async function POST(req: NextRequest) {

  const { error } = await authenticateUser();
  if (error) return error;


  const { amount } = await req.json();
  const outletRef = process.env.NGENIUS_OUTLET_REF!;
   const apiKey = process.env.NGENIUS_API_KEY!;
  // Generating Access Token
  const res = await fetch('https://api-gateway.ngenius-payments.com/identity/auth/access-token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/vnd.ni-identity.v1+json',
    //   'Accept': 'application/vnd.ni-identity.v1+json',
    },
  });
  const { access_token } = await res.json(); // ACCESS TOKEN IS BEING SUCCESSFULLY GENERATED
  console.log('access_token_order', access_token)

  // Create order
  const orderRes = await fetch(`https://api-gateway.ngenius-payments.com/transactions/outlets/${outletRef}/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/vnd.ni-payment.v2+json',
      'Accept': 'application/vnd.ni-payment.v2+json',
    },
    body: JSON.stringify({
      action: 'PURCHASE',
      amount: {
        currencyCode: 'AED',
        value: amount * 100, // convert to minor units
      },
      merchantAttributes: {
        maskPaymentInfo: true,
        paymentAttempts: 3,
        redirectUrl: `https://www.theconnection.ae/auth/payment/callback`,
        // redirectUrl: `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/auth/payment/callback`,
        offerOnly: "VISA, MASTERCARD"
      },
    }),
  });

  const order = await orderRes.json();
  console.log('order', order)
  return NextResponse.json({ paymentUrl: order._links.payment.href });
}
