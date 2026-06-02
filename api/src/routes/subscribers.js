import express from 'express';
import { pool } from '../index.js';
import { sendSubscriberWelcome } from '../services/emailService.js';

const router = express.Router();

// POST /api/subscribers - Create new subscriber
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if already subscribed
    const existing = await pool.query(
      'SELECT id FROM subscribers WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Add subscriber
    const result = await pool.query(
      'INSERT INTO subscribers (email, subscribed_at) VALUES ($1, NOW()) RETURNING id, email',
      [email]
    );

    // Send welcome email (fire-and-forget — no bloquea la respuesta)
    sendSubscriberWelcome(email).catch(err =>
      console.error('Welcome email failed:', err.message)
    );

    res.status(201).json({
      success: true,
      id: result.rows[0].id,
      message: 'Suscripción exitosa'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/subscribers/:id - Get subscriber
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM subscribers WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/subscribers/notify-all - Send notification to all subscribers
router.post('/notify-all', async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ error: 'Subject and content are required' });
    }

    // Get all subscribers
    const result = await pool.query('SELECT email FROM subscribers');
    const subscribers = result.rows;

    // Send to each subscriber
    const promises = subscribers.map(sub =>
      sendSubscriberNotification(sub.email, subject, content).catch(err =>
        console.error(`Failed to notify ${sub.email}:`, err)
      )
    );

    await Promise.all(promises);

    res.json({
      success: true,
      message: `Notification sent to ${subscribers.length} subscribers`
    });
  } catch (error) {
    console.error('Bulk notification error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
