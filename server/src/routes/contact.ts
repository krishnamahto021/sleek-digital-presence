import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { sendContactEmail } from "../services/emailService";
import { contactFormLimiter } from "../middleware/rateLimiter";

const router = express.Router();

// Validation middleware
const validateContactRequest = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("message").trim().not().isEmpty().withMessage("Message is required"),
];

// POST /api/contact - Send contact form email
// Apply more strict rate limiting specifically for contact form
router.post(
  "/contact",
  contactFormLimiter,
  validateContactRequest,
  async (req: Request, res: Response): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const {
      name,
      email,
      message,
      subject = "New Contact Form Submission",
    } = req.body;

    try {
      await sendContactEmail({ name, email, message, subject });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email", error });
    }
  }
);

export default router;
