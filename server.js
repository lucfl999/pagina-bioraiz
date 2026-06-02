import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY;

if (!SENDINBLUE_API_KEY) {
  console.error('ERROR: SENDINBLUE_API_KEY no está configurada en .env');
  process.exit(1);
}

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://lucfl999.github.io',
    'https://lucfl999.github.io/pagina-bioraiz',
    'https://bioraiz.net',
    'https://www.bioraiz.net',
    process.env.FRONTEND_URL
  ].filter(Boolean)
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Enviar email a través de Sendinblue
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: to, subject, (html o text)' 
      });
    }

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        to: Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }],
        sender: { email: 'noreply@bioraiz.com', name: 'BIORAIZ' },
        subject,
        htmlContent: html,
        textContent: text
      },
      {
        headers: {
          'api-key': SENDINBLUE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ 
      success: true, 
      messageId: response.data.messageId 
    });
  } catch (error) {
    console.error('Error enviando email:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error al enviar email',
      message: error.response?.data?.message || error.message
    });
  }
});

// Suscribirse a lista de contactos
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }

    const response = await axios.post(
      'https://api.brevo.com/v3/contacts',
      {
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        listIds: [2] // Cambiar según tu ID de lista en Sendinblue
      },
      {
        headers: {
          'api-key': SENDINBLUE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ 
      success: true, 
      contactId: response.data.id 
    });
  } catch (error) {
    // Si el contacto ya existe, también es un éxito
    if (error.response?.status === 400 && error.response?.data?.code === 'duplicate_parameter') {
      return res.json({ success: true, message: 'Contacto ya registrado' });
    }

    console.error('Error suscribiendo contacto:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error al suscribir',
      message: error.response?.data?.message || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor BIORAIZ ejecutándose en puerto ${PORT}`);
  console.log(`   API Key: ${SENDINBLUE_API_KEY.substring(0, 10)}... (protegida)`);
  console.log(`   Endpoints disponibles:`);
  console.log(`   - POST /api/send-email`);
  console.log(`   - POST /api/subscribe\n`);
});
