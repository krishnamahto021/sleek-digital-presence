import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contact";
import { apiLimiter } from "./middleware/rateLimiter";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Apply general rate limiting to all routes
app.use(apiLimiter);

// Routes
app.use("/api", contactRouter);

// Base route
app.get("/", (req: Request, res: Response): void => {
  res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
