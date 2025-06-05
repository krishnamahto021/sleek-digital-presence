import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { sendContactEmail } from "../services/emailService";
import { contactFormLimiter } from "../middleware/rateLimiter";

const router = express.Router();

// Validation middleware
const validateContactRequest = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("message")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
];

// POST /api/contact - Send contact form email
// Apply more strict rate limiting specifically for contact form
router.post(
  "/contact",
  contactFormLimiter,
  validateContactRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
        return;
      }

      const {
        name,
        email,
        message,
        subject = "New Contact Form Submission",
      } = req.body;

      // Additional server-side validation
      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        res.status(400).json({
          message: "All fields are required",
          errors: [{ msg: "Name, email, and message are all required" }],
        });
        return;
      }

      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        subject,
      });

      res.status(200).json({
        message:
          "Message sent successfully! Thank you for contacting me. I'll get back to you soon.",
        success: true,
      });
    } catch (error: any) {
      console.error("Contact form error:", error);

      // Provide different error messages based on the error type
      if (error.message.includes("SendGrid API key")) {
        res.status(503).json({
          message:
            "Email service is temporarily unavailable. Please try contacting me directly via email.",
          error: "Email service configuration error",
        });
      } else if (error.message.includes("Recipient email")) {
        res.status(503).json({
          message:
            "Email service is temporarily unavailable. Please try contacting me directly via email.",
          error: "Recipient configuration error",
        });
      } else if (error.message.includes("Invalid SendGrid API key")) {
        res.status(503).json({
          message:
            "Email service is temporarily unavailable. Please try contacting me directly via email.",
          error: "Authentication error",
        });
      } else if (error.message.includes("SendGrid validation")) {
        res.status(400).json({
          message:
            "There was an issue with your message format. Please try again.",
          error: error.message,
        });
      } else {
        res.status(500).json({
          message:
            "Failed to send message. Please try contacting me directly via email.",
          error: "Internal server error",
        });
      }
    }
  }
);

// Health check endpoint
router.get("/health", (req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
    message: "Contact API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
