import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.SENDGRID_API_KEY);
// Initialize SendGrid with API key
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY ||
    "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"
);

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
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  await sgMail.send(msg);
};
