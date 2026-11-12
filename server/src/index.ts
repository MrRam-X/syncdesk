import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db";
import { type HealthResponse } from "@syncdesk/shared";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors());
app.use(express.json());

// Mount API Routes
app.use("/api/auth", authRouter);

// Health Check Endpoint
app.get("/api/health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    const response: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      database: `connected (DB Time: ${result.rows[0].now})`,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({
      status: "error",
      timestamp: new Date().toISOString(),
      database: "disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Syncdesk Server running on http://localhost:${PORT}`);
});
