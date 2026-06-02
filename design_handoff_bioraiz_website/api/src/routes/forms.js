import express from 'express';
import { sendFormSubmission } from '../services/emailService.js';

const router = express.Router();

// POST /api/forms/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    await sendFormSubmission({
      name,
      email,
      message,
      type: 'Contacto General'
    });

    res.json({
      success: true,
      message: 'Formulario enviado correctamente'
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/forms/participa
router.post('/participa', async (req, res) => {
  try {
    const { name, email, productName, description, category } = req.body;

    if (!name || !email || !productName || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await sendFormSubmission({
      name,
      email,
      message: `
        Nombre del productor: ${name}
        Producto/Categoría: ${productName} (${category})
        Descripción: ${description}
      `,
      type: 'Solicitud de Participación'
    });

    res.json({
      success: true,
      message: 'Solicitud de participación enviada'
    });
  } catch (error) {
    console.error('Participation form error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/forms/press-kit
router.post('/press-kit', async (req, res) => {
  try {
    const { name, email, media, purpose } = req.body;

    if (!name || !email || !media) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await sendFormSubmission({
      name,
      email,
      message: `
        Medio/Programa: ${media}
        Propósito: ${purpose || 'No especificado'}
      `,
      type: 'Solicitud de Press Kit'
    });

    // TODO: Generar y enviar PDF con press kit

    res.json({
      success: true,
      message: 'Press kit enviado a tu email'
    });
  } catch (error) {
    console.error('Press kit request error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
