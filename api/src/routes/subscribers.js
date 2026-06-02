import express from 'express';
import { pool } from '../index.js';
import { sendSubscriberWelcome, sendSubscriberNotification } from '../services/emailService.js';

const router = express.Router();

// POST /api/subscribers
// Body: { email, source? }
// source: 'entradas' | 'grilla' | 'newsletter' (default: 'newsletter')
router.post('/', async (req, res) => {
  try {
    const { email, source = 'newsletter' } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

    // Si ya existe con el mismo source, no duplicar
    const existing = await pool.query(
      'SELECT id FROM subscribers WHERE email = $1 AND source = $2',
      [email, source]
    );
    if (existing.rows.length > 0) {
      // Responde OK igual (no queremos enumerar emails)
      return res.status(201).json({ success: true, message: 'Suscripción exitosa' });
    }

    const result = await pool.query(
      'INSERT INTO subscribers (email, source, subscribed_at) VALUES ($1, $2, NOW()) RETURNING id',
      [email, source]
    );

    // Mail de bienvenida específico según el origen (fire-and-forget)
    sendSubscriberWelcome(email, source).catch(err =>
      console.error('Welcome email failed:', err.message)
    );

    res.status(201).json({ success: true, id: result.rows[0].id, message: 'Suscripción exitosa' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/subscribers/notify-all
// Opcional: { source } para filtrar por lista
router.post('/notify-all', async (req, res) => {
  try {
    const { subject, content, source } = req.body;
    if (!subject || !content) return res.status(400).json({ error: 'Subject and content are required' });

    const query = source
      ? 'SELECT DISTINCT email FROM subscribers WHERE source = $1'
      : 'SELECT DISTINCT email FROM subscribers';
    const params = source ? [source] : [];

    const result = await pool.query(query, params);
    const subscribers = result.rows;

    await Promise.all(subscribers.map(sub =>
      sendSubscriberNotification(sub.email, subject, content)
        .catch(err => console.error(`Failed to notify ${sub.email}:`, err.message))
    ));

    res.json({ success: true, message: `Notificación enviada a ${subscribers.length} suscriptores` });
  } catch (error) {
    console.error('Bulk notification error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
