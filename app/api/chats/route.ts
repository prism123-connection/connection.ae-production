import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ token: token });
}
