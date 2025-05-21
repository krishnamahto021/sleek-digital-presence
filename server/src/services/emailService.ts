import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export const sendContactEmail = async (data: EmailData): Promise<void> => {
  const {
    name,
    email,
    message,
    subject = "New Contact Form Submission",
  } = data;

  const msg = {
    to: process.env.TO_EMAIL || "",
    from: process.env.FROM_EMAIL || "krishnamahato021@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Contact Message</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            <div style="background-color: #f9fafb; border-left: 4px solid #6366f1; padding: 15px; margin-bottom: 20px; border-radius: 0 4px 4px 0;">
              <p style="margin: 0; font-size: 16px;"><strong style="color: #4f46e5;">From:</strong> ${name}</p>
            </div>
            
            <div style="background-color: #f9fafb; border-left: 4px solid #6366f1; padding: 15px; margin-bottom: 20px; border-radius: 0 4px 4px 0;">
              <p style="margin: 0; font-size: 16px;"><strong style="color: #4f46e5;">Email:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 25px;">
              <h2 style="color: #4f46e5; font-size: 18px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Message:</h2>
              <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await sgMail.send(msg);
};
