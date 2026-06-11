import express from 'express';
import { sendEmail, sendParticipationConfirmation } from '../services/emailService.js';
import { validateCloudinaryUrl } from '../services/cloudinaryService.js';

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hola@bioraiz.net';

function buildAdminHtml(type, fields) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => {
      // Si es URL de Cloudinary, mostrar como imagen embebida
      if (typeof v === 'string' && validateCloudinaryUrl(v)) {
        return `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#2A3D24;background:#FAF6ED;">📷 ${k}</td>
          <td style="padding:8px 12px;color:#4A5C3A;">
            <a href="${v}" style="color:#6E9050;text-decoration:underline;">${v.substring(v.lastIndexOf('/') + 1)}</a><br/>
            <img src="${v}" style="max-width:200px;border-radius:4px;margin-top:8px;" />
          </td>
        </tr>`;
      }
      return `<tr><td style="padding:8px 12px;font-weight:600;color:#2A3D24;background:#FAF6ED;">${k}</td><td style="padding:8px 12px;color:#4A5C3A;">${v}</td></tr>`;
    })
    .join('');
  return `
    <div style="font-family:monospace;max-width:600px;">
      <h2 style="color:#2A3D24;border-bottom:2px solid #EDE4CF;padding-bottom:12px;">[BIORAIZ] ${type}</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #EDE4CF;border-radius:8px;overflow:hidden;">${rows}</table>
    </div>`;
}

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
