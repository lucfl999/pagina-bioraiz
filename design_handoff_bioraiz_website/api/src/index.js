import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import emailRoutes from './routes/emails.js';
import formRoutes from './routes/forms.js';
import subscriberRoutes from './routes/subscribers.js';
import ticketRoutes from './routes/tickets.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/emails', emailRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/tickets', ticketRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(port, () => {
  console.log(`BIORAIZ API running on port ${port}`);
});

export { app, pool };
