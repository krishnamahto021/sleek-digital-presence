import rateLimit from "express-rate-limit";

// Create a rate limiter for general API requests
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: "draft-7", // Use RFC draft standard headers
  legacyHeaders: false, // Disable legacy headers
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// More strict rate limiter for contact form submissions
export const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // Limit each IP to 5 contact form submissions per hour
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message:
    "Too many contact requests from this IP, please try again after an hour",
});
