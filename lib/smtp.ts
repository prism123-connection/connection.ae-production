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

/**
 * Generates the HTML email template.
 * @param confirmationLink - Link for confirming the email
 * @returns Email HTML string
 */
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
