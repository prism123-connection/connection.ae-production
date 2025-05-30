
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role } from '@prisma/client';
import { sendPaymentReceiveMail } from '@/lib/smtp';
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
  const { error, user } = await authenticateUser();
  const cookiesStore = await cookies();
  if (error) return error;
  const ref = req.nextUrl.searchParams.get('ref');
  const outletRef = process.env.NGENIUS_OUTLET_REF!;
  const apiKey = process.env.NGENIUS_API_KEY!;
  // Generating Access Token 
  const tokenRes = await fetch('https://api-gateway.ngenius-payments.com/identity/auth/access-token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/vnd.ni-identity.v1+json',
    //   'Accept': 'application/vnd.ni-identity.v1+json',
    },
  });
  const { access_token } = await tokenRes.json(); // ACCESS TOKEN IS BEING SUCCESSFULLY GENERATED
  console.log('access_token_order', access_token)

  const res = await fetch(`https://api-gateway.ngenius-payments.com/transactions/outlets/${outletRef}/orders/${ref}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/vnd.ni-payment.v2+json',
    },
  });
  const order = await res.json();
  console.log(order); 
  console.log('order_embedded', order?._embedded?.payment); 

  let transactionStatus = null;
  let paymentId = null; 
  let amount = null; 
  let currency = null; 
  // Checking for the first time payment
  if (order?._embedded?.payment && order._embedded.payment.length > 0) {
    transactionStatus = order._embedded.payment[0].state;
    paymentId = order._embedded.payment[0].reference
    amount = order._embedded.payment[0].amount.value
    currency = order._embedded.payment[0].amount.currencyCode

    if (order._embedded.payment.length > 1) {
    // This would be the second payment in a recurring scenario
    transactionStatus = order._embedded.payment[1].state;
    paymentId = order._embedded.payment[1].reference
    amount = order._embedded.payment[1].amount.value
    currency = order._embedded.payment[1].amount.currencyCode
  }
}
console.log('payment status:', transactionStatus);
console.log('paymentId:', paymentId);
console.log('amount:', amount);
console.log('currency:', currency);

    if (transactionStatus === 'PURCHASED') {

      const updatedUser = await prisma.$transaction(async (prisma) => {
        await prisma.transaction.create({
          data: {
            userId: user.id,
            transactionId: paymentId,
            amount: parseFloat(amount),
            currency: currency,
            status: 'COMPLETED',
          },
        });
  
        return await prisma.user.update({
          where: { id: user.id },
          data: { role: Role.PAID_USER },
          select: { id: true, email: true, role: true },
        });
      });

  const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

  await sendPaymentReceiveMail(user.email, user.firstName, user.lastName, amount, paymentId, currentDate )

    cookiesStore.delete("auth_token");

      // ✅ Generate a new token with updated role
     const newToken = jwt.sign(
         { id: user.id, email: user.email, role: updatedUser.role },
         process.env.JWT_SECRET!,
         { expiresIn: "7d" }
      );

      cookiesStore.set("auth_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ status: transactionStatus });

    }else {
          return NextResponse.json( { status: transactionStatus } );
    }

}


