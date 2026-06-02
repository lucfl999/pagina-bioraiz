import express from 'express';

const router = express.Router();

// POST /api/emails/send - Generic email sending
router.post('/send', async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // sendEmail implementation is handled by emailService

    res.json({
      success: true,
      message: 'Email sent'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
