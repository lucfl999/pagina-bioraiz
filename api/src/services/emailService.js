import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const ADMIN_EMAIL   = process.env.ADMIN_EMAIL || 'hola@bioraiz.net';
const FROM          = { name: 'BIORAIZ', email: 'noreply@bioraiz.net' };

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
          Neuquén Capital · Neuquén, Patagonia
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

const PARTICIPATION_CONFIRMATIONS = {
  feriantes: {
    subject: 'Recibimos tu postulación · BIORAIZ 2026 · Feria',
    replyTo: 'contact@bioraiz.net',
    body: (name) => `
      <p style="margin:0 0 16px;">Hola ${name},</p>
      <p style="margin:0 0 16px;">Recibimos tu postulación para participar como feriante en BIORAIZ — Bio & Wellness Festival Patagonia, 13 al 15 de noviembre de 2026 en Neuquén Capital.</p>
      <p style="margin:0 0 16px;">El equipo de curaduría revisa todas las postulaciones y se comunica con los seleccionados. El proceso toma algo de tiempo.</p>
      <p style="margin:0 0 16px;">Si tenés alguna consulta mientras tanto, respondé este email y te llegamos.</p>
      <p style="margin:0 0 16px;">Gracias por querer ser parte.</p>
      <p style="margin:0;">Coordinación de Feria · BIORAIZ<br/>contact@bioraiz.net</p>
    `,
  },
  gastronomicos: {
    subject: 'Recibimos tu postulación · BIORAIZ 2026 · Zona Gastronómica',
    replyTo: 'contact@bioraiz.net',
    body: (name) => `
      <p style="margin:0 0 16px;">Hola ${name},</p>
      <p style="margin:0 0 16px;">Tu postulación para la zona gastronómica de BIORAIZ llegó bien. Tres días, 13 al 15 de noviembre de 2026, Neuquén Capital.</p>
      <p style="margin:0 0 16px;">Estamos cerrando la selección de puestos y nos comunicamos con los confirmados en las próximas semanas. El criterio es curatorial — buscamos diversidad de propuestas y coherencia con los valores del festival.</p>
      <p style="margin:0 0 16px;">Cualquier consulta, respondé este email.</p>
      <p style="margin:0;">Coordinación Gastronómica · BIORAIZ<br/>contact@bioraiz.net</p>
    `,
  },
  speakers: {
    subject: 'Recibimos tu propuesta · BIORAIZ 2026 · Programa de Contenidos',
    replyTo: 'speakers@bioraiz.net',
    body: (name) => `
      <p style="margin:0 0 16px;">Hola ${name},</p>
      <p style="margin:0 0 16px;">Recibimos tu propuesta para el programa de contenidos de BIORAIZ. El espacio de charlas y talleres ocurre dentro de "El Sol" — la globa principal del festival — con capacidad para 400 personas y tres días completos de programación.</p>
      <p style="margin:0 0 16px;">El equipo de contenidos revisa cada propuesta y se comunica personalmente con quienes avancen en el proceso. Puede tomar algunas semanas — lo hacemos con cuidado.</p>
      <p style="margin:0 0 16px;">Gracias por el interés. Si necesitás algo, respondé este email.</p>
      <p style="margin:0;">Coordinación de Contenidos · BIORAIZ<br/>speakers@bioraiz.net</p>
    `,
  },
  facilitadores: {
    subject: 'Recibimos tu propuesta · BIORAIZ 2026 · Talleres & Experiencias',
    replyTo: 'contact@bioraiz.net',
    body: (name) => `
      <p style="margin:0 0 16px;">Hola ${name},</p>
      <p style="margin:0 0 16px;">Tu propuesta para facilitar un taller o experiencia en BIORAIZ está en nuestras manos. Buscamos facilitadores con propuestas sólidas para "El Sol" — experiencias de 60 a 90 minutos con grupos reales, no contenido de relleno.</p>
      <p style="margin:0 0 16px;">Revisamos cada propuesta y nos comunicamos con quienes encajen con la programación. El proceso puede tomar algunas semanas.</p>
      <p style="margin:0 0 16px;">Cualquier consulta, estamos acá.</p>
      <p style="margin:0;">Coordinación de Contenidos · BIORAIZ<br/>contact@bioraiz.net</p>
    `,
  },
  artistas: {
    subject: 'Recibimos tu postulación · BIORAIZ 2026 · Convocatoria Artistas Emergentes',
    replyTo: 'contact@bioraiz.net',
    body: (name) => `
      <p style="margin:0 0 16px;">Hola ${name},</p>
      <p style="margin:0 0 16px;">Recibimos tu postulación para la convocatoria de artistas emergentes de BIORAIZ. Tres escenarios, tres días, Neuquén Capital — 13 al 15 de noviembre de 2026.</p>
      <p style="margin:0 0 16px;">El equipo de booking revisa todas las postulaciones y contacta a los seleccionados lo antes posible. Si no recibís respuesta dentro de un plazo razonable, podés consultarnos respondiendo este email.</p>
      <p style="margin:0 0 16px;">Gracias por postularte.</p>
      <p style="margin:0;">Booking · BIORAIZ<br/>contact@bioraiz.net</p>
    `,
  },
  sponsors: {
    subject: 'Recibimos tu solicitud · BIORAIZ 2026 · Alianzas y Sponsorships',
    replyTo: 'contact@bioraiz.net',
    body: (name) => `
      <p style="margin:0 0 16px;">Hola ${name},</p>
      <p style="margin:0 0 16px;">Recibimos tu solicitud para ser sponsor o aliada de BIORAIZ 2026 — Bio & Wellness Festival Patagonia, 13 al 15 de noviembre en Neuquén Capital.</p>
      <p style="margin:0 0 16px;">El equipo de alianzas revisa todas las propuestas y se comunica con los interesados en las próximas semanas. Buscamos partners que compartan nuestros valores de sostenibilidad y conciencia.</p>
      <p style="margin:0 0 16px;">Si tenés consultas mientras tanto, respondé este email y te llegamos.</p>
      <p style="margin:0;">Alianzas y Sponsors · BIORAIZ<br/>contact@bioraiz.net</p>
    `,
  },
  prensa: {
    subject: 'Recibimos tu solicitud de acreditación · BIORAIZ 2026 · Prensa',
    replyTo: 'prensa@bioraiz.net',
    body: (name) => `
      <p style="margin:0 0 16px;">Hola ${name},</p>
      <p style="margin:0 0 16px;">Recibimos tu solicitud de acreditación de prensa para BIORAIZ — 13 al 15 de noviembre de 2026, Neuquén Capital.</p>
      <p style="margin:0 0 16px;">Confirmamos acreditaciones lo antes que podamos. Te llegará la confirmación con todos los detalles operativos: accesos, zonas habilitadas y protocolo de prensa.</p>
      <p style="margin:0 0 16px;">Si necesitás material antes de esa fecha (kit de prensa, datos del festival, imágenes), respondé este email y te lo enviamos.</p>
      <p style="margin:0;">Prensa & Comunicación · BIORAIZ<br/>prensa@bioraiz.net</p>
    `,
  },
};

const buildConfirmationHtml = (body) => `
  <div style="font-family:'Georgia',serif;max-width:520px;margin:0 auto;color:#1A2012;">
    <div style="padding:32px 0 16px;border-bottom:1px solid #EDE4CF;">
      <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6E9050;font-family:monospace;">BIORAIZ · 13 · 14 · 15 NOV 2026</p>
    </div>
    <div style="padding:32px 0;font-size:15px;line-height:1.7;color:#4A5C3A;">
      ${body}
    </div>
    <div style="padding:16px 0;border-top:1px solid #EDE4CF;">
      <p style="margin:0;font-size:12px;color:#7A8A6A;font-family:monospace;">
        Recibiste este mail desde noreply@bioraiz.net · Si necesitás responder, hazlo desde esta bandeja
      </p>
    </div>
  </div>`;

export const sendParticipationConfirmation = async (email, participationType, participantName) => {
  // Map form types to confirmation types - handle both the full labels from frontend and simple IDs
  const typeMap = {
    // From frontend tab.label values
    'feriantes / emprendedores': 'feriantes',
    'gastronómicos': 'gastronomicos',
    'artistas / músicos': 'artistas',
    'speakers': 'speakers',
    'facilitadores': 'facilitadores',
    'sponsors / alianzas': 'sponsors',
    'prensa / media': 'prensa',
    // Alternative simple IDs
    'feriante': 'feriantes',
    'feriantes': 'feriantes',
    'gastronomico': 'gastronomicos',
    'gastronomicos': 'gastronomicos',
    'speaker': 'speakers',
    'speakers': 'speakers',
    'facilitador': 'facilitadores',
    'facilitadores': 'facilitadores',
    'artista': 'artistas',
    'artistas': 'artistas',
    'sponsor': 'sponsors',
    'sponsors': 'sponsors',
    'prensa': 'prensa',
  };

  const normalizedType = typeMap[participationType?.toLowerCase()];
  const config = PARTICIPATION_CONFIRMATIONS[normalizedType];

  if (!config) {
    console.warn(`No confirmation template found for type: ${participationType}. Available types: ${Object.keys(PARTICIPATION_CONFIRMATIONS).join(', ')}`);
    return { success: false, error: 'Unknown participation type' };
  }

  const html = buildConfirmationHtml(config.body(participantName));

  try {
    await sendEmail(email, config.subject, html);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send participation confirmation to ${email}:`, error.message);
    throw error;
  }
};
