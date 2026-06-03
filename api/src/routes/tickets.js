import express from 'express';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pool } from '../index.js';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

const PRECIOS = {
  'raices-early': 22000,
  'bosque-early': 58400,
  'raices':       30000,
  'bosque':       80000,
};

const NOMBRES_TICKET = {
  'raices-early': 'Raíces · Early Bird',
  'bosque-early': 'Bosque · Early Bird',
  'raices':       'Raíces · General',
  'bosque':       'Bosque · VIP',
};

const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

function getMPClient() {
  return new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
    options: { timeout: 15000 },
  });
}

function calcularMonto(tipoEntrada, diasSeleccionados) {
  const precioDia = PRECIOS[tipoEntrada];
  if (!precioDia) throw new Error('Tipo de entrada inválido');
  // 3x2: pagás 2, entrás 3
  return diasSeleccionados === 3 ? precioDia * 2 : precioDia;
}

function generarIdQr(nombre) {
  const ts = Math.floor(Date.now() / 1000);
  const name8 = nombre.replace(/\s+/g, '').toUpperCase().slice(0, 8).padEnd(8, 'X');
  const random = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 6);
  return `${ts}_${name8}_${random}`;
}

// ─── POST /api/tickets/create-preference ──────────────────────────────────────
router.post('/create-preference', async (req, res) => {
  try {
    const {
      nombre, email, telefono, dni,
      tipo_entrada, dia_asistencia, dias_seleccionados,
      foto_base64,
    } = req.body;

    if (!nombre || !email || !telefono || !dni || !tipo_entrada || !dia_asistencia || !foto_base64) {
      return res.status(400).json({ error: 'Campos requeridos incompletos' });
    }
    if (!PRECIOS[tipo_entrada]) {
      return res.status(400).json({ error: 'Tipo de entrada inválido' });
    }

    const dias = parseInt(dias_seleccionados) === 3 ? 3 : 1;
    const monto = calcularMonto(tipo_entrada, dias);

    // Guardamos la foto temporalmente con un ID provisional
    const tempId = `temp_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const fotoPath = path.join(UPLOADS_DIR, `${tempId}.jpg`);
    const base64Data = foto_base64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(fotoPath, Buffer.from(base64Data, 'base64'));

    const client = getMPClient();
    const preference = new Preference(client);

    const backBase = process.env.FRONTEND_URL || 'https://bioraiz.net';
    const apiBase  = process.env.API_URL      || 'https://empathetic-courage-production.up.railway.app';

    const result = await preference.create({
      body: {
        items: [{
          title:      NOMBRES_TICKET[tipo_entrada] || tipo_entrada,
          description: `BIORAIZ 2026 · ${dia_asistencia}`,
          quantity:    1,
          unit_price:  monto,
          currency_id: 'ARS',
        }],
        payer: { name: nombre, email },
        metadata: {
          nombre,
          email,
          telefono,
          dni,
          tipo_entrada,
          dia_asistencia,
          dias_seleccionados: dias,
          foto_temp_id: tempId,
        },
        external_reference: tempId,
        notification_url: `${apiBase}/api/tickets/webhook`,
        back_urls: {
          success: `${backBase}/entradas?pago=exito`,
          failure: `${backBase}/entradas?pago=error`,
          pending: `${backBase}/entradas?pago=pendiente`,
        },
        auto_return: 'approved',
      },
    });

    res.json({
      init_point: result.init_point,
      preference_id: result.id,
    });
  } catch (error) {
    console.error('Error creando preferencia MP:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
});

// ─── POST /api/tickets/webhook ────────────────────────────────────────────────
router.post('/webhook', async (req, res) => {
  // Responder 200 rápido para que MP no reintente
  res.status(200).json({ received: true });

  try {
    const { type, data, topic, id } = req.body;

    const isPayment = type === 'payment' || topic === 'payment';
    if (!isPayment) return;

    const paymentId = data?.id || id;
    if (!paymentId) return;

    // Evitar procesar duplicados
    const { rows: exists } = await pool.query(
      'SELECT id FROM tickets WHERE mp_payment_id = $1', [String(paymentId)]
    );
    if (exists.length > 0) return;

    const client = getMPClient();
    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: paymentId });

    if (payment.status !== 'approved') return;

    const meta = payment.metadata || {};
    const {
      nombre        = '',
      email         = '',
      telefono      = '',
      dni           = '',
      tipo_entrada  = '',
      dia_asistencia = '',
      dias_seleccionados = 1,
      foto_temp_id  = '',
    } = meta;

    const monto   = payment.transaction_amount || 0;
    const orderId = String(payment.order?.id || payment.id);
    const idQr    = generarIdQr(nombre);

    // Mover foto temporal al nombre definitivo
    const tempFotoPath = path.join(UPLOADS_DIR, `${foto_temp_id}.jpg`);
    const fotoPath     = path.join(UPLOADS_DIR, `${idQr}.jpg`);
    if (fs.existsSync(tempFotoPath)) {
      fs.renameSync(tempFotoPath, fotoPath);
    }

    // Leer foto para el PDF
    let fotoBuffer = null;
    if (fs.existsSync(fotoPath)) {
      fotoBuffer = fs.readFileSync(fotoPath);
    }

    // Generar QR como buffer PNG
    const qrBuffer = await QRCode.toBuffer(idQr, {
      width: 320,
      margin: 1,
      color: { dark: '#1E3320', light: '#FAF6ED' },
    });

    // Generar PDF
    const pdfBuffer = await generarPDF({
      idQr, nombre, tipo_entrada, dia_asistencia,
      dni, orderId, fotoBuffer, qrBuffer,
    });

    // Guardar en DB
    const fotoUrl = foto_temp_id
      ? `${process.env.API_URL || ''}/uploads/${idQr}.jpg`
      : '';
    await pool.query(
      `INSERT INTO tickets
        (id_qr, mp_payment_id, mp_order_id, nombre, email, telefono, dni,
         tipo_entrada, dia_asistencia, foto_url, monto, estado)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'aprobado')`,
      [idQr, String(paymentId), orderId, nombre, email, telefono, dni,
       tipo_entrada, dia_asistencia, fotoUrl, monto]
    );

    // Enviar mail con PDF adjunto
    await enviarTicketPorMail({ nombre, email, idQr, tipo_entrada, dia_asistencia, pdfBuffer });

    console.log(`✅ Ticket generado y enviado: ${idQr} → ${email}`);
  } catch (err) {
    console.error('Error procesando webhook MP:', err);
  }
});

// ─── Generación de PDF ─────────────────────────────────────────────────────
async function generarPDF({ idQr, nombre, tipo_entrada, dia_asistencia, dni, orderId, fotoBuffer, qrBuffer }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 0 });
    const chunks = [];

    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W = 595.28;
    const H = 841.89;
    const verde   = '#1E3320';
    const dorado  = '#C8A647';
    const beige   = '#FAF6ED';
    const musgo   = '#6E9050';
    const borde   = '#7A9E5A';

    // Fondo
    doc.rect(0, 0, W, H).fill(verde);

    // Franja decorativa superior
    doc.rect(0, 0, W, 8).fill(dorado);

    // BIORAIZ title
    doc.font('Helvetica-Bold')
       .fontSize(42)
       .fillColor(dorado)
       .text('BIORAIZ', 0, 32, { align: 'center', width: W });

    // Subtítulo
    doc.font('Helvetica')
       .fontSize(10)
       .fillColor(musgo)
       .text('Festival de Bienestar Patagonia · Neuquén · Nov 2026', 0, 82, { align: 'center', width: W });

    // Separador
    doc.moveTo(60, 110).lineTo(W - 60, 110).strokeColor(borde).lineWidth(0.5).stroke();

    // Foto de perfil circular
    const fotoX = 60;
    const fotoY = 130;
    const fotoR = 50;
    if (fotoBuffer) {
      doc.save()
         .circle(fotoX + fotoR, fotoY + fotoR, fotoR)
         .clip()
         .image(fotoBuffer, fotoX, fotoY, { width: fotoR * 2, height: fotoR * 2 })
         .restore();
      // Borde circular dorado
      doc.circle(fotoX + fotoR, fotoY + fotoR, fotoR)
         .stroke(dorado).lineWidth(2);
    }

    // Datos del comprador
    const txtX = fotoX + fotoR * 2 + 24;
    const txtW = W - txtX - 60;

    doc.font('Helvetica-Bold').fontSize(18).fillColor(beige)
       .text(nombre || '—', txtX, 138, { width: txtW, lineBreak: false });

    const tipoNombres = {
      'raices-early': 'Raíces · Early Bird',
      'bosque-early': 'Bosque · Early Bird',
      'raices':       'Raíces · General',
      'bosque':       'Bosque · VIP',
    };
    const tipoDisplay = tipoNombres[tipo_entrada] || tipo_entrada;

    doc.font('Helvetica').fontSize(11).fillColor(musgo)
       .text(tipoDisplay, txtX, 164, { width: txtW });
    doc.font('Helvetica').fontSize(11).fillColor(beige)
       .text(`📅  ${dia_asistencia}`, txtX, 182, { width: txtW });
    doc.font('Helvetica').fontSize(11).fillColor(beige)
       .text(`DNI: ${dni}`, txtX, 200, { width: txtW });

    // Separador
    doc.moveTo(60, 250).lineTo(W - 60, 250).strokeColor(borde).lineWidth(0.5).stroke();

    // QR Code centrado
    const qrSize = 200;
    const qrX = (W - qrSize) / 2;
    const qrY = 268;

    // Fondo beige para el QR
    doc.roundedRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 8)
       .fill(beige);

    doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });

    // ID QR
    doc.font('Helvetica').fontSize(8).fillColor(musgo)
       .text(idQr, 0, qrY + qrSize + 26, { align: 'center', width: W });

    // Separador
    doc.moveTo(60, qrY + qrSize + 46).lineTo(W - 60, qrY + qrSize + 46)
       .strokeColor(borde).lineWidth(0.5).stroke();

    // Orden MP
    doc.font('Helvetica').fontSize(10).fillColor(musgo)
       .text(`N° de orden: ${orderId}`, 0, qrY + qrSize + 58, { align: 'center', width: W });

    // Texto legal
    doc.font('Helvetica').fontSize(9).fillColor(musgo)
       .text('Este ticket es personal e intransferible', 0, qrY + qrSize + 78, { align: 'center', width: W });

    // Franja decorativa inferior
    doc.rect(0, H - 8, W, 8).fill(dorado);

    doc.end();
  });
}

// ─── Envío de mail con PDF adjunto ────────────────────────────────────────────
async function enviarTicketPorMail({ nombre, email, idQr, tipo_entrada, dia_asistencia, pdfBuffer }) {
  const tipoNombres = {
    'raices-early': 'Raíces Early Bird',
    'bosque-early': 'Bosque Early Bird',
    'raices':       'Raíces General',
    'bosque':       'Bosque VIP',
  };
  const tipoDisplay = tipoNombres[tipo_entrada] || tipo_entrada;

  const html = `
    <div style="font-family:'Georgia',serif;max-width:560px;margin:0 auto;color:#1A2012;background:#FAF6ED;padding:0;">
      <div style="background:#1E3320;padding:32px 40px 24px;text-align:center;">
        <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6E9050;font-family:monospace;">BIORAIZ · 13 · 14 · 15 NOV 2026</p>
        <h1 style="margin:0;font-size:32px;font-weight:400;color:#C8A647;font-family:Georgia,serif;">BIORAIZ</h1>
      </div>
      <div style="padding:36px 40px;">
        <h2 style="font-size:22px;font-weight:400;margin:0 0 16px;color:#2A3D24;">¡Tu entrada está lista, ${nombre.split(' ')[0]}! 🌿</h2>
        <p style="font-size:15px;line-height:1.7;color:#4A5C3A;margin:0 0 24px;">
          Tu entrada para BIORAIZ 2026 está adjunta como PDF. Llevala en tu celular o imprimila — solo necesitamos escanear el QR al ingresar.
        </p>
        <div style="background:#1E3320;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6E9050;font-family:monospace;">Tu entrada</p>
          <p style="margin:0 0 4px;font-size:18px;font-weight:600;color:#FAF6ED;">${tipoDisplay}</p>
          <p style="margin:0;font-size:14px;color:#C8A647;">📅 ${dia_asistencia}</p>
        </div>
        <p style="font-size:13px;color:#7A8A6A;line-height:1.6;margin:0 0 8px;">
          Este ticket es personal e intransferible. Presentalo junto a tu DNI en el ingreso.
        </p>
        <p style="font-size:12px;color:#7A8A6A;font-family:monospace;">ID: ${idQr}</p>
      </div>
      <div style="padding:16px 40px 32px;border-top:1px solid #EDE4CF;">
        <p style="margin:0;font-size:12px;color:#7A8A6A;font-family:monospace;">
          Neuquén Capital · Patagonia ·
          <a href="mailto:hola@bioraiz.net" style="color:#6E9050;">hola@bioraiz.net</a>
        </p>
      </div>
    </div>`;

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    console.warn('BREVO_API_KEY no configurada, no se envió el mail del ticket');
    return;
  }

  const { default: axios } = await import('axios');
  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender:     { name: 'BIORAIZ', email: 'noreply@bioraiz.net' },
      to:         [{ email }],
      subject:    `Tu entrada para BIORAIZ 🌿 · ${nombre}`,
      htmlContent: html,
      attachment: [{
        name:    `ticket-bioraiz-${idQr}.pdf`,
        content: pdfBuffer.toString('base64'),
      }],
    },
    {
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
      timeout: 15000,
    }
  );
}

export default router;
