import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Role, TransactionStatus } from "@prisma/client";
import paypal from '@paypal/checkout-server-sdk';

// Initialize PayPal SDK
const environment =
  process.env.PAYPAL_ENVIRONMENT === "live"
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID!,
        process.env.PAYPAL_CLIENT_SECRET!
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID!,
        process.env.PAYPAL_CLIENT_SECRET!
    );

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || !decoded.id) {
      cookiesStore.delete("auth_token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // const { transactionId, amount, currency } = await req.json();

    // if (!transactionId || !amount || !currency) {
    //   return NextResponse.json(
    //     { error: "Missing transaction details" },
    //     { status: 400 }
    //   );
    // }

    const { transactionId } = await req.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: "Missing transaction ID" },
        { status: 400 }
      );
    }

     // ✅ Verify transaction with PayPal
     const request = new paypal.orders.OrdersGetRequest(transactionId);
     const order = await client.execute(request);
 
     if (!order.result || order.result.status !== "COMPLETED") {
       return NextResponse.json(
         { error: "Transaction not completed or invalid" },
         { status: 400 }
       );
     }
 
     const amount = order.result.purchase_units[0].amount.value;
     const currency = order.result.purchase_units[0].amount.currency_code;

    // ✅ Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.$transaction(async (prisma) => {
      await prisma.transaction.create({
        data: {
          userId: userId,
          transactionId: transactionId,
          amount: parseFloat(amount),
          currency: currency,
          status: TransactionStatus.COMPLETED,
        },
      });

      return await prisma.user.update({
        where: { id: userId },
        data: { role: Role.PAID_USER },
        select: { id: true, email: true, role: true },
      });
    });

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

    return NextResponse.json(
      { success: true, message: "Payment recorded, user verified" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
