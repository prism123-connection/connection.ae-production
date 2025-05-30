import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import { sendConfirmationEmail } from "@/lib/smtp";
import { Role, TokenType } from "@prisma/client";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, referralCode } = body;

    console.log(
      "Came here with: ",
      firstName,
      lastName,
      email,
      password,
      referralCode
    );

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email, verified: true },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log("Exising user: ", existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);
    let referrer = null;

    if (referralCode) {
      referrer = await prisma.user.findUnique({
        where: { referralId: referralCode },
      });
      if (!referrer ||  (referrer.role !== Role.PAID_USER && referrer.role !== Role.ADMIN && referrer.role !== Role.SUPER_ADMIN )) {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 400 }
        );
      }
    }

    console.log("referrer: ", referrer);

    const userReferralId = nanoid();
    const verificationToken = nanoid(32);

    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          firstName,
          lastName,
          password: hashedPassword,
          referralId: userReferralId,
        },
        create: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          referralId: userReferralId,
        },
      });

      if (referrer) {
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            referredId: user.id,
          },
        });
      }

      console.log("Created referral");

      await prisma.token.deleteMany({
        where: { userId: user.id, type: TokenType.EMAIL_VERIFICATION },
      });

      await prisma.token.create({
        data: {
          userId: user.id,
          token: verificationToken,
          type: TokenType.EMAIL_VERIFICATION,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      return { userId: user.id, token: verificationToken };
    });

    const confirmationLink = `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/auth/verify?token=${result.token}`;
    console.log("result token: ", result.token);
    console.log("verificationToken: ", verificationToken);
    await sendConfirmationEmail(email, confirmationLink);

    return NextResponse.json(
      { success: true, message: "Verification email sent" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
