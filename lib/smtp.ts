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
