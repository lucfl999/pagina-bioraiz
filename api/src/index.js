import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import emailRoutes from './routes/emails.js';
import formRoutes from './routes/forms.js';
import subscriberRoutes from './routes/subscribers.js';
import ticketRoutes from './routes/tickets.js';
import adminRoutes from './routes/admin.js';
import instagramRoutes from './routes/instagram.js';
import storeRoutes from './routes/store.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGIN || 'https://bioraiz.net,https://www.bioraiz.net,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Database connection
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Webhook de MP necesita body raw para validar firma, pero parseamos JSON para el resto
app.use('/api/tickets/webhook', express.raw({ type: 'application/json' }), (req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    try { req.body = JSON.parse(req.body.toString()); } catch (_) { req.body = {}; }
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir fotos y PDFs generados
const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/emails', emailRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/admin', adminRoutes);

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

// Init: crear tabla de tickets si no existe
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id              SERIAL PRIMARY KEY,
        id_qr           VARCHAR(80)  UNIQUE NOT NULL,
        mp_payment_id   VARCHAR(64),
        mp_order_id     VARCHAR(64),
        nombre          VARCHAR(255) NOT NULL,
        email           VARCHAR(255) NOT NULL,
        telefono        VARCHAR(50),
        dni             VARCHAR(20),
        tipo_entrada    VARCHAR(50),
        dia_asistencia  VARCHAR(100),
        foto_url        VARCHAR(512),
        monto           DECIMAL(12,2),
        estado          VARCHAR(20)  DEFAULT 'pendiente',
        fecha_compra    TIMESTAMP    DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla tickets lista');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS store_orders (
        id                 SERIAL PRIMARY KEY,
        order_code         UUID UNIQUE NOT NULL,
        nombre             VARCHAR(120) NOT NULL,
        dni                VARCHAR(8) NOT NULL,
        email              VARCHAR(254) NOT NULL,
        whatsapp           VARCHAR(40) NOT NULL,
        items              JSONB NOT NULL,
        subtotal           DECIMAL(12,2) NOT NULL,
        descuento          DECIMAL(12,2) NOT NULL,
        total              DECIMAL(12,2) NOT NULL,
        estado             VARCHAR(24) NOT NULL DEFAULT 'pending',
        mp_preference_id   VARCHAR(64),
        mp_payment_id      VARCHAR(64),
        admin_email_sent   BOOLEAN NOT NULL DEFAULT FALSE,
        buyer_email_sent   BOOLEAN NOT NULL DEFAULT FALSE,
        fecha_compra       TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at         TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query('ALTER TABLE store_orders ADD COLUMN IF NOT EXISTS dni VARCHAR(8)');
    await pool.query('CREATE INDEX IF NOT EXISTS store_orders_fecha_compra_idx ON store_orders (fecha_compra DESC)');
    await pool.query('CREATE INDEX IF NOT EXISTS store_orders_mp_payment_id_idx ON store_orders (mp_payment_id)');
    console.log('✅ Tabla store_orders lista');
  } catch (err) {
    console.error('Error inicializando DB:', err.message);
  }
}

app.listen(port, process.env.HOST || '0.0.0.0', () => {
  console.log(`BIORAIZ API running on port ${port}`);
  initDB();
});

export { app };
