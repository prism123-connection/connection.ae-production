
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


export async function GET(req: NextRequest) {
  const { error } = await authenticateUser();
  if (error) return error;
  const ref = req.nextUrl.searchParams.get('ref');
  const outletRef = process.env.NGENIUS_OUTLET_REF!;
  const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_DEPLOYED_URL}/api/payment/ngenius/token`);
  const { access_token } = await tokenRes.json();

  const res = await fetch(`https://api-gateway.ngenius-payments.com/transactions/outlets/${outletRef}/orders/${ref}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/vnd.ni-payment.v2+json',
    },
  });

  const order = await res.json();
  const status = order?.paymentStatus;

  // ✅ Update your database here
//   if (status === 'CAPTURED') {
//     await prisma.payment.update({
//       where: { ref },
//       data: { status: 'SUCCESS' },
//     });
//   } else {
//     await prisma.payment.update({
//       where: { ref },
//       data: { status: 'FAILED' },
//     });
//   }

  return NextResponse.json({ status });
}
