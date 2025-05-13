
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


export async function GET() {
  console.log('------------------------- inside token get func')
  const { error } = await authenticateUser();
  if (error) return error;

  const apiKey = process.env.NGENIUS_API_KEY!;
  console.log('------------------------------api key', apiKey)

  const res = await fetch('https://api-gateway.ngenius-payments.com/identity/auth/access-token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/vnd.ni-identity.v1+json',
    //   'Accept': 'application/vnd.ni-identity.v1+json',
    },
  });

  const data = await res.json();
  console.log('token', data)
  return NextResponse.json(data);
}
