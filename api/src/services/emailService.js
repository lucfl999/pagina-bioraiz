import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Brevo SMTP transporter
// Usuario SMTP: viene de BREVO_SMTP_USER (ej: ad4355001@smtp-brevo.com)
// Password: la API key de Brevo
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_API_KEY,
  },
});

const FROM_ADDRESS = `BIORAIZ <hola@bioraiz.net>`;

export const sendEmail = async (to, subject, html, text) => {
  try {
    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
      text: text || subject,
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendSubscriberWelcome = async (email) => {
  const html = `
    <div style="font-family: 'Georgia', serif; max-width: 520px; margin: 0 auto; color: #1A2012;">
      <div style="padding: 40px 0 20px; border-bottom: 1px solid #EDE4CF;">
        <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #6E9050; font-family: monospace;">BIORAIZ · Carta de Raíz</p>
      </div>
      <div style="padding: 32px 0;">
        <h1 style="font-size: 28px; font-weight: 400; line-height: 1.2; color: #2A3D24; margin-bottom: 20px;">
          ¡Gracias por suscribirte!
        </h1>
        <p style="font-size: 16px; line-height: 1.7; color: #4A5C3A; margin-bottom: 16px;">
          Te vamos a avisar cuando salgan las entradas para BIORAIZ 2026 y te mantenemos al tanto de novedades de la feria.
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #4A5C3A;">
          <strong>13 · 14 · 15 de noviembre, 2026</strong><br/>
          Las Cortaderas · Neuquén, Patagonia
        </p>
      </div>
      <div style="padding: 20px 0; border-top: 1px solid #EDE4CF;">
        <p style="font-size: 12px; color: #7A8A6A; font-family: monospace;">
          Recibiste este mail porque te suscribiste en bioraiz.net ·
          <a href="mailto:hola@bioraiz.net" style="color: #6E9050;">hola@bioraiz.net</a>
        </p>
      </div>
    </div>
  `;

  await sendEmail(email, 'Te avisamos cuando salgan las entradas — BIORAIZ 2026', html);
};

export const sendFormNotification = async (adminEmail, formType, fields) => {
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#2A3D24;">${k}</td><td style="padding:6px 12px;color:#4A5C3A;">${v}</td></tr>`)
    .join('');

  const html = `
    <div style="font-family: monospace; max-width: 600px;">
      <h2 style="color: #2A3D24;">Nueva solicitud: ${formType}</h2>
      <table style="width:100%;border-collapse:collapse;background:#FAF6ED;border:1px solid #EDE4CF;border-radius:8px;">${rows}</table>
    </div>
  `;

  await sendEmail(
    adminEmail,
    `[BIORAIZ] Nueva solicitud — ${formType}`,
    html,
  );
};

export const sendSubscriberNotification = async (email, subject, content) => {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #1A2012;">
      <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #6E9050; font-family: monospace; padding-bottom: 16px; border-bottom: 1px solid #EDE4CF;">BIORAIZ · Carta de Raíz</p>
      <div style="padding: 32px 0;">${content}</div>
      <p style="font-size: 12px; color: #7A8A6A; font-family: monospace; border-top: 1px solid #EDE4CF; padding-top: 16px;">
        Recibiste este mail porque te suscribiste en bioraiz.net
      </p>
    </div>
  `;
  await sendEmail(email, subject, html);
};
