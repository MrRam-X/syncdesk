import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';
import { sql } from 'drizzle-orm';
import { HealthResponse } from '@syncdesk/shared';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for local frontend and production deployments
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());

// Health Check Endpoint (Verifies server & Neon DB connection)
app.get('/api/health', async (_req, res) => {
  try {
    // Run a lightweight test query on Neon DB
    const result = await pool.query('SELECT NOW()');

    const response: HealthResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: `connected (DB Time: ${result.rows[0].now})`,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Syncdesk Server running on http://localhost:${PORT}`);
});