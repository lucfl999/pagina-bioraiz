import crypto from 'crypto';
import express from 'express';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { pool } from '../index.js';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

const PRODUCTS = {
  banderas: { nombre: 'Plaza de las Banderas', medida: '500 ml', precio: 4000 },
  'san-martin': { nombre: 'Monumento San Martín', medida: '500 ml', precio: 4000 },
  confluencia: { nombre: 'La Confluencia', medida: '500 ml', precio: 4000 },
};
const DISCOUNT_RATE = 0.15;
const MAX_QUANTITY = 20;
const ADMIN_EMAIL = process.env.STORE_ORDERS_EMAIL || 'hola@bioraiz.net';
const FRONTEND_URL = (process.env.FRONTEND_URL || 'https://bioraiz.net').replace(/\/$/, '');
const API_URL = (process.env.API_URL || 'https://pagina-bioraiz-production.up.railway.app').replace(/\/$/, '');

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]);

const formatPrice = (amount) => `$${Number(amount).toLocaleString('es-AR')}`;
const getMPClient = () => new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { timeout: 15000 },
});

function validateOrder(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  if (typeof data.nombre !== 'string' || data.nombre.trim().length < 2 || data.nombre.trim().length > 120) return null;
  if (typeof data.dni !== 'string' || !/^\d{7,8}$/.test(data.dni.trim())) return null;
  if (typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return null;
  if (typeof data.whatsapp !== 'string' || data.whatsapp.length > 40 || (data.whatsapp.match(/\d/g) || []).length < 8) return null;
  if (!Array.isArray(data.items) || data.items.length === 0 || data.items.length > Object.keys(PRODUCTS).length) return null;

  const seen = new Set();
  const items = [];
  for (const item of data.items) {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string'
      || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY
      || !PRODUCTS[item.id] || seen.has(item.id)) return null;
    seen.add(item.id);
    const product = PRODUCTS[item.id];
    const unitPrice = Math.round(product.precio * (1 - DISCOUNT_RATE));
    items.push({
      id: item.id,
      nombre: product.nombre,
      medida: product.medida,
      quantity: item.quantity,
      unit_price: unitPrice,
      total: unitPrice * item.quantity,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + PRODUCTS[item.id].precio * item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.total, 0);
  return {
    nombre: data.nombre.trim(),
    dni: data.dni.trim(),
    email: data.email.trim(),
    whatsapp: data.whatsapp.trim(),
    items,
    subtotal,
    descuento: subtotal - total,
    total,
  };
}

function buildOrderEmail(order, includeDni = false) {
  const rows = order.items.map((item) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #EDE4CF;">${escapeHtml(item.nombre)} (${escapeHtml(item.medida)})</td>
      <td style="padding:8px 12px;border-bottom:1px solid #EDE4CF;text-align:center;">${item.quantity}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #EDE4CF;text-align:right;">${formatPrice(item.total)}</td>
    </tr>`).join('');
  return `
    <div style="font-family:Arial,sans-serif;max-width:620px;color:#1A2012;">
      <h2 style="color:#2A3D24;">Pedido de tienda BIORAIZ · ${escapeHtml(order.order_code)}</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(order.nombre)}<br/>
      ${includeDni ? `<strong>DNI:</strong> ${escapeHtml(order.dni)}<br/>` : ''}
      <strong>Email:</strong> ${escapeHtml(order.email)}<br/>
      <strong>Teléfono / WhatsApp:</strong> ${escapeHtml(order.whatsapp)}</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr><th style="text-align:left;padding:8px 12px;">Producto</th><th>Cantidad</th><th style="text-align:right;">Importe</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="text-align:right;line-height:1.7;">
        Subtotal: ${formatPrice(order.subtotal)}<br/>
        Descuento web: −${formatPrice(order.descuento)}<br/>
        <strong>Total pagado: ${formatPrice(order.total)}</strong>
      </p>
      <p>Entrega: retiro en la feria.</p>
    </div>`;
}

function buildOrderText(order, includeDni = false) {
  return [
    `Pedido de tienda BIORAIZ: ${order.order_code}`,
    `Nombre: ${order.nombre}`,
    ...(includeDni ? [`DNI: ${order.dni}`] : []),
    `Email: ${order.email}`,
    `Teléfono / WhatsApp: ${order.whatsapp}`,
    ...order.items.map((item) => `${item.quantity} x ${item.nombre} (${item.medida}) — ${formatPrice(item.total)}`),
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Descuento web: -${formatPrice(order.descuento)}`,
    `Total pagado: ${formatPrice(order.total)}`,
    'Entrega: retiro en la feria.',
  ].join('\n');
}

async function sendOrderNotifications(order) {
  const notifications = [
    { column: 'admin_email_sent', email: ADMIN_EMAIL, subject: `Pedido pagado en tienda BIORAIZ · ${order.order_code}`, includeDni: true },
    { column: 'buyer_email_sent', email: order.email, subject: 'Confirmación de compra · Tienda BIORAIZ' },
  ];

  for (const notification of notifications) {
    if (order[notification.column]) continue;
    try {
      const { rows } = await pool.query(
        `UPDATE store_orders SET ${notification.column} = TRUE WHERE order_code = $1 AND ${notification.column} = FALSE RETURNING order_code`,
        [order.order_code]
      );
      if (!rows.length) continue;
      await sendEmail(
        notification.email,
        notification.subject,
        buildOrderEmail(order, notification.includeDni),
        buildOrderText(order, notification.includeDni)
      );
      order[notification.column] = true;
    } catch (error) {
      try {
        await pool.query(
          `UPDATE store_orders SET ${notification.column} = FALSE WHERE order_code = $1`,
          [order.order_code]
        );
      } catch (resetError) {
        console.error(`Store order email retry flag reset failed for ${order.order_code}:`, resetError.message);
      }
      console.error(`Store order ${notification.column} failed for ${order.order_code}:`, error.message);
    }
  }
}

router.post('/create-preference', async (req, res) => {
  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: 'La tienda todavía no tiene configuradas las credenciales de Mercado Pago.' });
  }

  const order = validateOrder(req.body);
  if (!order) return res.status(400).json({ error: 'Revisá los datos del pedido e intentá nuevamente.' });

  const orderCode = crypto.randomUUID();
  const testMode = process.env.MP_TEST_MODE === 'true';
  try {
    await pool.query(
      `INSERT INTO store_orders
        (order_code, nombre, dni, email, whatsapp, items, subtotal, descuento, total, estado)
       VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7,$8,$9,'pending')`,
      [orderCode, order.nombre, order.dni, order.email, order.whatsapp, JSON.stringify(order.items), order.subtotal, order.descuento, order.total]
    );

    const preference = new Preference(getMPClient());
    const result = await preference.create({
      body: {
        items: order.items.map((item) => ({
          title: `Vaso BIORAIZ · ${item.nombre}`,
          description: item.medida,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: 'ARS',
        })),
        payer: { name: order.nombre, email: order.email },
        external_reference: orderCode,
        ...(testMode ? {} : { notification_url: `${API_URL}/api/store/webhook` }),
        back_urls: {
          success: `${FRONTEND_URL}/?tienda_pago=approved&pedido=${orderCode}#tienda`,
          failure: `${FRONTEND_URL}/?tienda_pago=rejected&pedido=${orderCode}#tienda`,
          pending: `${FRONTEND_URL}/?tienda_pago=pending&pedido=${orderCode}#tienda`,
        },
        auto_return: 'approved',
      },
    });

    const checkoutUrl = testMode ? result.sandbox_init_point : result.init_point;
    if (!checkoutUrl || !result.id) throw new Error('Mercado Pago returned an incomplete preference');
    await pool.query(
      'UPDATE store_orders SET mp_preference_id = $1, updated_at = NOW() WHERE order_code = $2',
      [String(result.id), orderCode]
    );
    return res.json({ init_point: checkoutUrl, order_code: orderCode });
  } catch (error) {
    console.error(`Error creating Mercado Pago preference for store order ${orderCode}:`, error.message);
    await pool.query(
      "UPDATE store_orders SET estado = 'checkout_error', updated_at = NOW() WHERE order_code = $1",
      [orderCode]
    );
    return res.status(502).json({ error: 'No pudimos iniciar el pago. El pedido no fue cobrado; intentá nuevamente.' });
  }
});

router.get('/orders/:orderCode', async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.orderCode)) {
    return res.status(400).json({ error: 'Código de pedido inválido.' });
  }
  try {
    const { rows } = await pool.query(
      'SELECT order_code, estado, total FROM store_orders WHERE order_code = $1',
      [req.params.orderCode]
    );
    if (!rows.length) return res.status(404).json({ error: 'No encontramos ese pedido.' });
    return res.json(rows[0]);
  } catch (error) {
    console.error('Error checking store order status:', error.message);
    return res.status(500).json({ error: 'No pudimos consultar el estado del pedido.' });
  }
});

router.post('/webhook', async (req, res) => {
  const { type, topic, data, id } = req.body || {};
  if (type !== 'payment' && topic !== 'payment') return res.status(200).json({ received: true });

  const paymentId = data?.id || id;
  if (!paymentId) return res.status(400).json({ error: 'Falta el identificador de pago.' });
  if (!process.env.MP_ACCESS_TOKEN) return res.status(503).json({ error: 'Mercado Pago no está configurado.' });

  try {
    const paymentClient = new Payment(getMPClient());
    const payment = await paymentClient.get({ id: paymentId });
    const orderCode = payment.external_reference;
    if (!orderCode) return res.status(200).json({ received: true });

    const { rows } = await pool.query('SELECT * FROM store_orders WHERE order_code = $1', [orderCode]);
    if (!rows.length) return res.status(200).json({ received: true });
    const order = rows[0];

    if (payment.currency_id !== 'ARS' || Number(payment.transaction_amount) !== Number(order.total)) {
      console.error(`Store payment ${paymentId} does not match order ${orderCode}; manual review required.`);
      return res.status(200).json({ received: true });
    }

    const statusMap = {
      approved: 'approved',
      pending: 'pending',
      in_process: 'pending',
      rejected: 'rejected',
      cancelled: 'cancelled',
      refunded: 'refunded',
      charged_back: 'charged_back',
    };
    const orderStatus = statusMap[payment.status];
    if (!orderStatus) return res.status(200).json({ received: true });
    if (order.estado === 'approved' && ['pending', 'rejected', 'cancelled'].includes(orderStatus)) {
      return res.status(200).json({ received: true });
    }
    if (['refunded', 'charged_back'].includes(order.estado) && orderStatus === 'approved') {
      return res.status(200).json({ received: true });
    }

    const { rows: updatedRows } = await pool.query(
      `UPDATE store_orders
       SET estado = $1, mp_payment_id = $2, updated_at = NOW()
       WHERE order_code = $3
         AND (mp_payment_id IS NULL OR mp_payment_id = $2 OR estado IN ('rejected', 'cancelled'))
       RETURNING *`,
      [orderStatus, String(paymentId), orderCode]
    );
    if (!updatedRows.length) {
      console.error(`Store order ${orderCode} already references a different Mercado Pago payment.`);
      return res.status(200).json({ received: true });
    }

    if (orderStatus === 'approved') await sendOrderNotifications(updatedRows[0]);
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing store payment webhook:', error.message);
    return res.status(500).json({ error: 'No pudimos procesar la notificación de pago.' });
  }
});

export default router;
