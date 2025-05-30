
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role } from '@prisma/client';
import { sendOrderPaymentReceiveMail } from '@/lib/smtp';
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
  const { error, user } = await authenticateUser();
  if (error) return error;
  const ref = req.nextUrl.searchParams.get('ref');
  const dealId = req.nextUrl.searchParams.get('dealId');
  const outletRef = process.env.NGENIUS_OUTLET_REF!;
  const apiKey = process.env.NGENIUS_API_KEY!;

  // -------------- look correct for this 

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

     await prisma.transaction.create({
        data : {
        transactionId: paymentId,
        userId: user.id,
        currency: currency,
        status: 'COMPLETED',
        type: 'DEAL',
        amount : amount,
        }
    })

    
  const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
  });

  await sendOrderPaymentReceiveMail(user.email, user.firstName, user.lastName, amount, paymentId, currentDate )

  if (!dealId) {
  return NextResponse.json({ error: 'Missing dealId' }, { status: 400 });
  }

    const dealMade = await prisma.deals.findUnique({
        where: { id: dealId },
        include : {
            seller : {
                include : {
                    referralsReceived : {
                        include : {
                            referrer : true
                        }
                    }
                }
            }, 
            buyer : true
        }
    });

    await prisma.deals.update({
        where : { id : dealId}, 
        data : {
            paymentStatus : 'RECEIVED'
        }
    })

    if (dealMade?.amount === undefined) {
        return {status : 500, error : 'deal amount is undefined'}
    }

    const originalAmount = dealMade?.amount.toNumber(); 
    const transferrableAmount = originalAmount * 0.5;
    const referrerCommission = transferrableAmount * 0.25;
    const sellerReceivable = transferrableAmount - referrerCommission;
    const referrerId  = dealMade?.seller.referralsReceived[0].referrer.id

    await prisma.user.update({
         where : {id : dealMade?.sellerId}, 
         data : {
            walletBalance :{
                increment : sellerReceivable
            } 
         }
    })

    if (dealMade?.seller.referralsReceived.length && dealMade?.seller.referralsReceived.length > 0) {
        await prisma.user.update({
            where : {id : referrerId }, 
            data : {
                walletBalance : {
                    increment : referrerCommission
                }
            }
        })
    }

    return NextResponse.json({ status: transactionStatus });

    }else {
          return NextResponse.json( { status: transactionStatus } );
    }

}


