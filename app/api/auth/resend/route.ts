import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { customAlphabet } from "nanoid";
import { sendConfirmationEmail } from "@/lib/smtp";
import { TokenType } from "@prisma/client";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 32);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.verified) {
      return NextResponse.json(
        { error: "User not found or already verified" },
        { status: 400 }
      );
    }

    const verificationToken = nanoid();

    await prisma.$transaction(async (prisma) => {
      // Delete any existing verification tokens for the user
      await prisma.token.deleteMany({
        where: { userId: user.id, type: TokenType.EMAIL_VERIFICATION},
      });

      await prisma.token.create({
        data: {
          userId: user.id,
          token: verificationToken,
          type: TokenType.EMAIL_VERIFICATION,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Expires in 24 hours
        },
      });
    });

    const confirmationLink = `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/auth/verify?token=${verificationToken}`;
    console.log("Confirmation mail: ", confirmationLink)
    await sendConfirmationEmail(email, confirmationLink);

    return NextResponse.json({ success: true, message: "Verification email resent" }, { status: 200 });

  } catch (error) {
    console.error("Error in resending confirmation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
