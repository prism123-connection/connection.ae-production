import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Sends a confirmation email with a verification link.
 * @param to - Recipient's email address
 * @param confirmationLink - Link for confirming the email
 */

// <------------------------------ Confirmation Mail  ------------------------------>

export async function sendConfirmationEmail(
  to: string,
  confirmationLink: string
) {
  const subject = "Confirm Your Email";
  const text = `Please confirm your email by clicking the following link: ${confirmationLink}`;
  const html = generateEmailTemplate(confirmationLink);

  const mailOptions = {
    from: `<${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    text,
    html,
    attachments: [
      {
        filename: "logo.png",
        href: "https://connection-ae-production.vercel.app/logo.png",
        cid: "logo_cid",
        contentDisposition: "inline" as "inline",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

function generateEmailTemplate(confirmationLink: string) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Email</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              .logo {
                  max-width: 150px;
                  margin-bottom: 20px;
              }
              .button {
                  display: inline-block;
                  padding: 12px 24px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #06B079;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #666;
              }
              .link-text {
                  word-wrap: break-word;
                  color: #06B079;
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="container">
             <img src="cid:logo_cid" alt="Logo" class="logo">
              <h2>Confirm Your Email</h2>
              <p>Thank you for signing up! Please confirm your email address by clicking the button below.</p>
              <a href="${confirmationLink}" class="button" target="_blank" style="text-decoration: none;">Confirm Email</a>
              <p>If the button doesn’t work, you can also copy and paste the following URL into a new tab:</p>
              <a href="${confirmationLink}" class="link-text">${confirmationLink}</a>
              <p class="footer">If you didn’t create an account, you can ignore this email.</p>
          </div>
      </body>
      </html>
    `;
}

// <------------------------------ Welcome mail   ------------------------------>

export async function sendWelcomeMail(to: string, firstName: string, lastName : string) {
  const subject = "Welcome to Connection Dubai — Let’s Grow Together!";
  const html = generateWelcomeMailTempate(firstName, lastName);

  const mailOptions = {
    from: `<${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "logo.png",
        href: "https://connection-ae-production.vercel.app/logo.png",
        cid: "logo_cid",
        contentDisposition: "inline" as "inline",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

function generateWelcomeMailTempate(firstName: string, lastName: string) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Email</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              .logo {
                  max-width: 150px;
                  margin-bottom: 20px;
              }
              .button {
                  display: inline-block;
                  padding: 12px 24px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #06B079;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #666;
              }
              .link-text {
                  word-wrap: break-word;
                  color: #06B079;
                  font-size: 14px;
              }
          </style>
      </head>
   <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 6px;">

     <div style="display:flex;width:100%;margin-top:20px;justify-content: center; margin-left: auto; margin-right: auto;">
            <img src="cid:logo_cid" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
      </div>

    <h2 style="color: #333;">Welcome to Connection — Let’s Grow Together!</h2>
    
    <p style="color: #555; font-size: 16px;">Hi ${firstName} ${lastName},</p>
    
    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      Welcome aboard!<br><br>
      You’ve just taken your first big step into a world of real business opportunities, global connections, and growth without limits — and we couldn’t be more excited to have you with us.
    </p>

    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      At Connection, we believe business is better when it’s done together. Whether you’re here to scale your hustle, connect with trusted professionals, or earn from your network — you’re now part of a platform that was built for people just like you.
    </p>

    <p style="color: #333; font-weight: bold; margin-top: 20px;">Here’s what’s coming your way:</p>
    <ul style="color: #555; font-size: 16px; padding-left: 20px; line-height: 1.6;">
      <li>Access to 50+ business categories</li>
      <li>A safe, verified platform to connect and trade</li>
      <li>Tools to start your business in Dubai without a license</li>
      <li>Referral rewards and passive income streams</li>
      <li>Entry to a global network of entrepreneurs, investors, and doers</li>
    </ul>

    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      This isn’t just a membership — it’s your launchpad to doing business the smart way.<br>
      You’re in. You’re connected. Now let’s get growing.
    </p>

    <p style="color: #555; font-size: 16px;">If you need anything at all, we’re just a message away.</p>

    <p style="color: #555; font-size: 16px;">
      Welcome to the future of business.<br>
      Welcome to Connection.
    </p>

    <p style="color: #333; font-weight: bold;">Warm regards,<br>Team Connection</p>

    <p style="color: #777; font-size: 14px;">
      “Let’s Connect. Let’s Grow.”<br>
      <a href="https://www.theconnection.ae" style="color: #0066cc; text-decoration: none;">www.theconnection.ae</a><br>
      Email - <a href="mailto:connect@thecomnection.ar" style="color: #0066cc;">connect@thecomnection.ar</a><br>
      WhatsApp
    </p>
  </div>
</body>

      </html>
    `;
}

// <------------------------------ Subscription Payment Successfull Mail    ------------------------------>

export async function sendPaymentReceiveMail(to: string, firstName: string, lastName : string, amount: number, transactionId: string, transactionDate: string) {
  const subject = "Payment Successful — Welcome to Connection Premium! — Let’s Grow Together!";
  const html = generatePaymentReceiveMail(firstName, lastName, amount, transactionId, transactionDate );

  const mailOptions = {
    from: `<${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "logo.png",
        href: "https://connection-ae-production.vercel.app/logo.png",
        cid: "logo_cid",
        contentDisposition: "inline" as "inline",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}


function generatePaymentReceiveMail(firstName: string, lastName: string, amount: number, transactionId: string, transactionDate: string ) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: #ffffff;
            background-color: #06B079;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
        .link-text {
            word-wrap: break-word;
            color: #06B079;
            font-size: 14px;
        }
    </style>
</head>

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 6px;">

    <!-- Logo -->
    <div style="display:flex;width:100%;margin-top:20px;justify-content: center; margin-left: auto; margin-right: auto;">
      <img src="cid:logo_cid" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
    </div>

    <!-- Payment Confirmation Message -->
    <h2 style="color: #333;">Payment Successful — Welcome to Connection Premium! — Let’s Grow Together!</h2>

    <p style="color: #555; font-size: 16px;">Hi ${firstName} ${lastName},</p>

    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      Thank you for your payment. Your transaction has been successfully processed and you now have full access to the benefits of the Connection platform.
    </p>

    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      Whether you're here to build your brand, grow your income, or tap into new markets, your journey just got a powerful boost.
    </p>

    <!-- Optional transaction info -->
    <p style="color: #333; font-weight: bold; margin-top: 20px;">Transaction Summary:</p>
    <ul style="color: #555; font-size: 16px; padding-left: 20px; line-height: 1.6;">
      <li><strong>Amount Paid:</strong> ${amount}</li>
      <li><strong>Transaction ID:</strong> ${transactionId}</li>
      <li><strong>Date:</strong> ${transactionDate}</li>
    </ul>

    <!-- What's Next -->
    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      Here’s what you can now explore:
    </p>
    <ul style="color: #555; font-size: 16px; padding-left: 20px; line-height: 1.6;">
      <li>List your services or business in 50+ categories</li>
      <li>Build a verified profile and start networking</li>
      <li>Earn from referrals and affiliate commissions</li>
      <li>Connect directly with other professionals and clients</li>
    </ul>

    <!-- Support and closing -->
    <p style="color: #555; font-size: 16px;">
      If you have any questions about your payment or need help getting started, feel free to reach out to our support team at any time.
    </p>

    <p style="color: #555; font-size: 16px;">
      We're excited to see what you'll build with us.
    </p>

    <p style="color: #333; font-weight: bold;">Let’s connect and grow — together.<br>Team Connection</p>

    <!-- Footer -->
    <p style="color: #777; font-size: 14px;">
      “Let’s Connect. Let’s Grow.”<br>
      <a href="https://www.theconnection.ae" style="color: #0066cc; text-decoration: none;">www.theconnection.ae</a><br>
      Email - <a href="mailto:connect@thecomnection.ar" style="color: #0066cc;">connect@thecomnection.ar</a><br>
      WhatsApp
    </p>
  </div>
</body>
</html>

    `;
}

// <------------------------------ E-commmerce Order payment mail    ------------------------------>

export async function sendOrderPaymentRequestMail(to: string, firstName: string, lastName : string, amount: number, transactionDate: string, paymentLink : string) {
  const subject = "Order Request Successfull — Welcome to Connection Premium! — Let’s Grow Together!";
  const html = generateOrderPaymentRequestMail(firstName, lastName, amount, transactionDate , paymentLink);

  const mailOptions = {
    from: `<${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "logo.png",
        href: "https://connection-ae-production.vercel.app/logo.png",
        cid: "logo_cid",
        contentDisposition: "inline" as "inline",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

function generateOrderPaymentRequestMail(
  firstName: string,
  lastName: string,
  amount: number,
  transactionDate: string,
  paymentLink: string
) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Payment Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      font-size: 16px;
      color: #ffffff;
      background-color: #06B079;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    }
    .link-text {
      word-wrap: break-word;
      color: #06B079;
      font-size: 14px;
    }
  </style>
</head>

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 6px;">

    <!-- Logo -->
    <div style="display:flex;width:100%;margin-top:20px;justify-content: center;">
      <img src="cid:logo_cid" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
    </div>

    <!-- Payment Request Message -->
    <h2 style="color: #333;">Your Order Request Has Been Approved</h2>

    <p style="color: #555; font-size: 16px;">Hi ${firstName} ${lastName},</p>

    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      Great news! Your purchase request has been approved. Please complete your payment to proceed with the order.
    </p>

    <!-- Transaction Info -->
    <p style="color: #333; font-weight: bold; margin-top: 20px;">Transaction Summary:</p>
    <ul style="color: #555; font-size: 16px; padding-left: 20px; line-height: 1.6;">
      <li><strong>Amount:</strong> ${amount}</li>
      <li><strong>Date:</strong> ${transactionDate}</li>
    </ul>

    <!-- Support and closing -->
    <p style="color: #555; font-size: 16px;">
      If you have any questions or need help, feel free to contact our support team.
    </p>

    <p style="color: #333; font-weight: bold;">Thank you for choosing Connection.<br>Team Connection</p>

    <!-- Footer -->
    <p style="color: #777; font-size: 14px;">
      “Let’s Connect. Let’s Grow.”<br>
      <a href="https://www.theconnection.ae" style="color: #0066cc; text-decoration: none;">www.theconnection.ae</a><br>
      Email - <a href="mailto:connect@thecomnection.ar" style="color: #0066cc;">connect@thecomnection.ar</a><br>
      WhatsApp
    </p>
  </div>
</body>
</html>
  `;
}

// <------------------------------ E-commmerce Order payment receive mail    ------------------------------>

export async function sendOrderPaymentReceiveMail(to: string, firstName: string, lastName : string, amount: number, transactionDate: string, paymentLink : string) {
  const subject = "Payment Successful — Welcome to Connection Premium! — Let’s Grow Together!";
  const html = generateOrderPaymentReceivedMail(firstName, lastName, amount, transactionDate , paymentLink);

  const mailOptions = {
    from: `<${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: "logo.png",
        href: "https://connection-ae-production.vercel.app/logo.png",
        cid: "logo_cid",
        contentDisposition: "inline" as "inline",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

function generateOrderPaymentReceivedMail(
  firstName: string,
  lastName: string,
  amount: number,
  transactionDate: string,
  paymentLink: string // optional, retained in case you want to show invoice or order tracking
) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Payment Received</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      font-size: 16px;
      color: #ffffff;
      background-color: #06B079;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    }
    .link-text {
      word-wrap: break-word;
      color: #06B079;
      font-size: 14px;
    }
  </style>
</head>

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 6px;">

    <!-- Logo -->
    <div style="display:flex;width:100%;margin-top:20px;justify-content: center;">
      <img src="cid:logo_cid" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
    </div>

    <!-- Payment Confirmation Message -->
    <h2 style="color: #333;">Payment Received Successfully</h2>

    <p style="color: #555; font-size: 16px;">Hi ${firstName} ${lastName},</p>

    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      We’re pleased to inform you that your payment for the product order has been received successfully.
    </p>

    <!-- Transaction Info -->
    <p style="color: #333; font-weight: bold; margin-top: 20px;">Transaction Summary:</p>
    <ul style="color: #555; font-size: 16px; padding-left: 20px; line-height: 1.6;">
      <li><strong>Amount:</strong> ${amount}</li>
      <li><strong>Date:</strong> ${transactionDate}</li>
    </ul>

    <!-- Support and closing -->
    <p style="color: #555; font-size: 16px;">
      If you have any questions or need assistance, please don’t hesitate to contact our support team.
    </p>

    <p style="color: #333; font-weight: bold;">Thank you for shopping with us.<br>Team Connection</p>

    <!-- Footer -->
    <p style="color: #777; font-size: 14px;">
      “Let’s Connect. Let’s Grow.”<br>
      <a href="https://www.theconnection.ae" style="color: #0066cc; text-decoration: none;">www.theconnection.ae</a><br>
      Email - <a href="mailto:connect@thecomnection.ar" style="color: #0066cc;">connect@thecomnection.ar</a><br>
      WhatsApp
    </p>
  </div>
</body>
</html>
  `;
}


// add kyc approval mail
// add product approval mail
// add withdrawal mail
  //  <li><strong>Transaction ID:</strong> ${transactionId}</li>