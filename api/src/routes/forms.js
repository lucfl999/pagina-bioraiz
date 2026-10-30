import express from 'express';
import { sendEmail, sendParticipationConfirmation } from '../services/emailService.js';
import { sendActivityRegistrationConfirmation } from '../services/activityEmailService.js';
import { buildAdminHtml } from '../services/htmlBuilder.js';

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hola@bioraiz.net';
const ACTIVITY_CHANNELS = ['Instagram', 'Un amigo', 'Un sponsor', 'Radio o prensa', 'Otro'];
const ACTIVITY_OPTIONS = new Set([
  'Viernes 6 · 19:00 · Stretching',
  'Sábado 7 · 16:00 · Yoga',
  'Sábado 7 · 16:30 a 17:30 · Biodanza',
  'Sábado 7 · 17:00 · Pilates',
  'Sábado 7 · 18:00 · Yoga',
  'Sábado 7 · 18:15 · Terapia de sonido',
  'Domingo 8 · 15:00 · Oráculo Vivo',
  'Domingo 8 · 15:00 · Pilates',
  'Domingo 8 · 16:00 · Yoga & stretching',
  'Domingo 8 · 16:30 a 17:30 · Biodanza',
  'Domingo 8 · 17:00 · Experiencia práctica grupal',
  'Domingo 8 · 18:00 · Yoga & stretching',
  'Domingo 8 · 18:15 · Terapia de sonido',
]);

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]);

const buildActivityRegistrationHtml = ({ nombre, whatsapp, email, actividades, salud, canal }) => {
  const fields = [
    ['Nombre y apellido', nombre],
    ['WhatsApp', whatsapp],
    ['Email', email],
    ['Actividades', actividades.join('\n')],
    ['Lesión, embarazo o condición de salud', salud || 'No informada'],
    ['Cómo se enteró de BIORAIZ', canal],
    ['Consentimiento', 'Aceptado'],
  ];
  const rows = fields.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#2A3D24;background:#FAF6ED;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:#4A5C3A;white-space:pre-line;">${escapeHtml(value)}</td>
    </tr>`).join('');

  return `
    <div style="font-family:monospace;max-width:600px;">
      <h2 style="color:#2A3D24;border-bottom:2px solid #EDE4CF;padding-bottom:12px;">[BIORAIZ] Nueva inscripción a actividades</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #EDE4CF;border-radius:8px;overflow:hidden;">${rows}</table>
    </div>`;
};

const isEmail = (email) => typeof email === 'string'
  && email.length <= 254
  && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// POST /api/forms/actividades
router.post('/actividades', async (req, res) => {
  const data = req.body;
  const isText = (value, maxLength) => typeof value === 'string'
    && value.trim().length > 0
    && value.trim().length <= maxLength;

  if (!data || typeof data !== 'object' || Array.isArray(data)
    || !isText(data.nombre, 120)
    || !isText(data.whatsapp, 40)
    || !isEmail(data.email)
    || !Array.isArray(data.actividades)
    || data.actividades.length === 0
    || data.actividades.length > ACTIVITY_OPTIONS.size
    || new Set(data.actividades).size !== data.actividades.length
    || data.actividades.some((activity) => !ACTIVITY_OPTIONS.has(activity))
    || !ACTIVITY_CHANNELS.includes(data.canal)
    || data.consentimiento !== true
    || (data.salud != null && typeof data.salud !== 'string')
    || (typeof data.salud === 'string' && data.salud.length > 1000)) {
    return res.status(400).json({ error: 'Revisá los datos obligatorios de la inscripción.' });
  }

  const registration = {
    nombre: data.nombre.trim(),
    whatsapp: data.whatsapp.trim(),
    email: data.email.trim(),
    actividades: data.actividades,
    salud: typeof data.salud === 'string' ? data.salud.trim() : '',
    canal: data.canal,
  };

  try {
    await Promise.all([
      sendEmail(
        ADMIN_EMAIL,
        '[BIORAIZ] Nueva inscripción a actividades',
        buildActivityRegistrationHtml(registration),
        `Nombre y apellido: ${registration.nombre}\nWhatsApp: ${registration.whatsapp}\nEmail: ${registration.email}\nActividades:\n${registration.actividades.join('\n')}\nLesión, embarazo o condición de salud: ${registration.salud || 'No informada'}\nCómo se enteró de BIORAIZ: ${registration.canal}\nConsentimiento: Aceptado`
      ),
      sendActivityRegistrationConfirmation(registration.email, registration.nombre, registration.actividades),
    ]);

    return res.json({ success: true });
  } catch (error) {
    console.error('Activity registration email error:', error.message);
    return res.status(500).json({ error: 'No pudimos enviar la inscripción. Intentá nuevamente.' });
  }
});

// POST /api/forms/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: 'Faltan campos obligatorios' });

    await sendEmail(
      ADMIN_EMAIL,
      `[BIORAIZ] Contacto de ${name}`,
      buildAdminHtml('Contacto general', { Nombre: name, Email: email, Mensaje: message })
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/forms/participa  — recibe cualquier objeto de formulario del frontend
router.post('/participa', async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object')
      return res.status(400).json({ error: 'Datos inválidos' });

    const tipo = data.tipo_participacion || data.type || 'Participación';
    const email = data.email;
    // Get participant name from various possible field names
    const nombre = data.nombre || data.responsable || data.representante || data.name || 'Participante';
    
    const fields = Object.fromEntries(
      Object.entries(data).filter(([k]) => k !== 'tipo_participacion' && k !== '_subject')
    );

    // Send email to admin
    await sendEmail(
      ADMIN_EMAIL,
      `[BIORAIZ] Nueva solicitud — ${tipo}`,
      buildAdminHtml(`Solicitud: ${tipo}`, fields)
    );

    // Send confirmation email to participant (fire-and-forget)
    if (email && nombre) {
      sendParticipationConfirmation(email, tipo, nombre).catch(err =>
        console.error(`Confirmation email failed for ${email}:`, err.message)
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Participa form error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/forms/press-kit
router.post('/press-kit', async (req, res) => {
  try {
    const { name, email, media, purpose } = req.body;
    if (!name || !email || !media)
      return res.status(400).json({ error: 'Faltan campos obligatorios' });

    await sendEmail(
      ADMIN_EMAIL,
      `[BIORAIZ] Solicitud press kit — ${name}`,
      buildAdminHtml('Press kit', { Nombre: name, Email: email, Medio: media, Propósito: purpose })
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Press kit error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
