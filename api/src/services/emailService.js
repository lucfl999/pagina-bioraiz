import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const ADMIN_EMAIL   = process.env.ADMIN_EMAIL || 'hola@bioraiz.net';
const FROM          = { name: 'BIORAIZ', email: 'hola@bioraiz.net' };

const brevo = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': BREVO_API_KEY,
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const sendEmail = async (to, subject, html, text) => {
  if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

  const toArr = Array.isArray(to)
    ? to.map(e => (typeof e === 'string' ? { email: e } : e))
    : [{ email: to }];

  const { data } = await brevo.post('/smtp/email', {
    sender: FROM,
    to: toArr,
    subject,
    htmlContent: html,
    textContent: text || subject,
  });

  console.log(`Email sent to ${to} — messageId: ${data.messageId}`);
  return { success: true, messageId: data.messageId };
};

const WELCOME_CONTENT = {
  entradas: {
    subject: 'Te avisamos cuando salgan las entradas — BIORAIZ 2026',
    title:   '¡Anotado!',
    body:    'En cuanto salgan a la venta las entradas para BIORAIZ 2026 te mandamos un mail. Vas a ser de los primeros en saberlo.',
  },
  grilla: {
    subject: 'Te mandamos la grilla completa — BIORAIZ 2026',
    title:   '¡Anotado!',
    body:    'Cuando tengamos la grilla completa de actividades del festival te la mandamos directamente. Tres días cargados — mejor tenerla guardada.',
  },
  newsletter: {
    subject: 'Bienvenido a la Carta de Raíz — BIORAIZ',
    title:   'Bienvenido a la Carta de Raíz',
    body:    'Una vez al mes te mandamos novedades del evento, historias de productores y notas eco. Sin spam, sin urgencia.',
  },
};

export const sendSubscriberWelcome = async (email, source = 'newsletter') => {
  const content = WELCOME_CONTENT[source] || WELCOME_CONTENT.newsletter;
  const html = `
    <div style="font-family:'Georgia',serif;max-width:520px;margin:0 auto;color:#1A2012;">
      <div style="padding:32px 0 16px;border-bottom:1px solid #EDE4CF;">
        <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6E9050;font-family:monospace;">BIORAIZ · 13 · 14 · 15 NOV 2026</p>
      </div>
      <div style="padding:32px 0;">
        <h1 style="font-size:28px;font-weight:400;line-height:1.2;color:#2A3D24;margin:0 0 20px;">${content.title}</h1>
        <p style="font-size:16px;line-height:1.7;color:#4A5C3A;margin:0 0 20px;">${content.body}</p>
        <p style="font-size:15px;line-height:1.7;color:#4A5C3A;margin:0;">
          <strong>13 · 14 · 15 de noviembre, 2026</strong><br/>
          Las Cortaderas · Neuquén, Patagonia
        </p>
      </div>
      <div style="padding:16px 0;border-top:1px solid #EDE4CF;">
        <p style="margin:0;font-size:12px;color:#7A8A6A;font-family:monospace;">
          Recibiste este mail porque te suscribiste en bioraiz.net ·
          <a href="mailto:hola@bioraiz.net" style="color:#6E9050;">hola@bioraiz.net</a>
        </p>
      </div>
    </div>`;
  await sendEmail(email, content.subject, html);
};

export const sendSubscriberNotification = async (email, subject, content) => {
  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1A2012;">
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6E9050;font-family:monospace;padding-bottom:16px;border-bottom:1px solid #EDE4CF;"
      >BIORAIZ · Carta de Raíz</p>
      <div style="padding:32px 0;">${content}</div>
      <p style="font-size:12px;color:#7A8A6A;font-family:monospace;border-top:1px solid #EDE4CF;padding-top:16px;">
        Recibiste este mail porque te suscribiste en bioraiz.net
      </p>
    </div>`;
  await sendEmail(email, subject, html);
};
