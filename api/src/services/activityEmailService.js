import { sendEmail } from './emailService.js';

const escapeEmailHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]);

const buildConfirmationHtml = (body) => `
  <div style="font-family:'Georgia',serif;max-width:520px;margin:0 auto;color:#1A2012;">
    <div style="padding:32px 0 16px;border-bottom:1px solid #EDE4CF;">
      <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6E9050;font-family:monospace;">BIORAIZ · 6 · 7 · 8 NOV 2026</p>
    </div>
    <div style="padding:32px 0;font-size:15px;line-height:1.7;color:#4A5C3A;">
      ${body}
    </div>
    <div style="padding:16px 0;border-top:1px solid #EDE4CF;">
      <p style="margin:0;font-size:12px;color:#7A8A6A;font-family:monospace;">
        Recibiste este mail desde noreply@bioraiz.net · Si necesitás responder, escribinos a hola@bioraiz.net
      </p>
    </div>
  </div>`;

export const sendActivityRegistrationConfirmation = async (email, participantName, activities) => {
  const safeName = escapeEmailHtml(participantName);
  const safeActivities = activities
    .map((activity) => `<li style="margin:0 0 8px;">${escapeEmailHtml(activity)}</li>`)
    .join('');
  const html = buildConfirmationHtml(`
    <p style="margin:0 0 16px;">Hola ${safeName},</p>
    <p style="margin:0 0 16px;">Recibimos tu inscripción a las actividades de BIORAIZ 2026. ¡Gracias por sumarte!</p>
    <p style="margin:0 0 8px;"><strong>Estas son las actividades que elegiste:</strong></p>
    <ul style="padding-left:22px;margin:0 0 20px;">${safeActivities}</ul>
    <p style="margin:0 0 16px;">Te esperamos el 6, 7 y 8 de noviembre en Isla 132, Neuquén Capital. Si necesitás corregir algún dato, escribinos a hola@bioraiz.net.</p>
    <p style="margin:0;">Equipo BIORAIZ</p>
  `);
  const text = `Hola ${participantName}, recibimos tu inscripción a las actividades de BIORAIZ 2026.\n\nActividades elegidas:\n${activities.map((activity) => `- ${activity}`).join('\n')}\n\nTe esperamos el 6, 7 y 8 de noviembre en Isla 132, Neuquén Capital. Si necesitás corregir algún dato, escribinos a hola@bioraiz.net.`;

  await sendEmail(email, 'Confirmación de inscripción a actividades · BIORAIZ 2026', html, text);
};
