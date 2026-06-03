import express from 'express';
import { pool } from '../index.js';

const router = express.Router();

function checkAuth(req, res) {
  const { clave } = req.query;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    res.status(500).send('ADMIN_PASSWORD no configurada');
    return false;
  }
  if (clave !== ADMIN_PASSWORD) {
    res.status(401).send('Clave incorrecta');
    return false;
  }
  return true;
}

// ─── GET /admin/exportar-csv?clave=XXXX ───────────────────────────────────────
router.get('/exportar-csv', async (req, res) => {
  if (!checkAuth(req, res)) return;

  try {
    const { rows } = await pool.query(
      `SELECT id_qr, nombre, email, telefono, dni, tipo_entrada,
              dia_asistencia, foto_url, fecha_compra, monto
       FROM tickets
       WHERE estado = 'aprobado'
       ORDER BY fecha_compra DESC`
    );

    const headers = ['id_qr', 'nombre', 'email', 'telefono', 'dni',
                     'tipo_entrada', 'dia_asistencia', 'foto_url', 'fecha_compra', 'monto'];

    const escape = (val) => {
      if (val == null) return '';
      const s = String(val);
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };

    const lines = [
      headers.join(','),
      ...rows.map(r =>
        headers.map(h => escape(h === 'fecha_compra'
          ? new Date(r[h]).toLocaleString('es-AR')
          : r[h]
        )).join(',')
      ),
    ];

    const csv = lines.join('\r\n');
    const fecha = new Date().toISOString().slice(0, 10);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="bioraiz-compradores-${fecha}.csv"`);
    res.send('﻿' + csv); // BOM para Excel
  } catch (err) {
    console.error('Error exportando CSV:', err);
    res.status(500).send('Error generando CSV');
  }
});

// ─── GET /admin/dashboard?clave=XXXX ─────────────────────────────────────────
router.get('/dashboard', async (req, res) => {
  if (!checkAuth(req, res)) return;

  try {
    const { rows: totalesPorTipo } = await pool.query(
      `SELECT tipo_entrada, COUNT(*) AS cantidad, COALESCE(SUM(monto),0) AS ingresos
       FROM tickets WHERE estado = 'aprobado'
       GROUP BY tipo_entrada ORDER BY ingresos DESC`
    );

    const { rows: totales } = await pool.query(
      `SELECT COUNT(*) AS total_tickets, COALESCE(SUM(monto),0) AS total_ars
       FROM tickets WHERE estado = 'aprobado'`
    );

    const { rows: compradores } = await pool.query(
      `SELECT nombre, email, tipo_entrada, dia_asistencia, monto, fecha_compra
       FROM tickets WHERE estado = 'aprobado'
       ORDER BY fecha_compra DESC LIMIT 200`
    );

    const totalTickets = Number(totales[0]?.total_tickets || 0);
    const totalARS = Number(totales[0]?.total_ars || 0);
    const USD_RATE = parseFloat(process.env.USD_RATE || '1300');
    const totalUSD = (totalARS / USD_RATE).toFixed(2);

    const clave = req.query.clave;

    const tipoNombres = {
      'raices-early': 'Raíces Early Bird',
      'bosque-early': 'Bosque Early Bird',
      'raices':       'Raíces General',
      'bosque':       'Bosque VIP',
    };

    const filasTipos = totalesPorTipo.map(r => `
      <tr>
        <td>${tipoNombres[r.tipo_entrada] || r.tipo_entrada}</td>
        <td style="text-align:center;font-weight:600;">${r.cantidad}</td>
        <td style="text-align:right;">$ ${Number(r.ingresos).toLocaleString('es-AR')}</td>
      </tr>`).join('');

    const filasCompradores = compradores.map(r => `
      <tr>
        <td>${r.nombre}</td>
        <td style="color:#7A8A6A;font-size:13px;">${r.email}</td>
        <td>${tipoNombres[r.tipo_entrada] || r.tipo_entrada}</td>
        <td style="font-size:13px;">${r.dia_asistencia}</td>
        <td style="text-align:right;">$ ${Number(r.monto).toLocaleString('es-AR')}</td>
        <td style="color:#7A8A6A;font-size:12px;">${new Date(r.fecha_compra).toLocaleString('es-AR')}</td>
      </tr>`).join('');

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BIORAIZ · Dashboard Admin</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', system-ui, sans-serif; background: #F2EBDC; color: #1A2012; }
  header { background: #1E3320; padding: 24px 40px; display: flex; align-items: center; justify-content: space-between; }
  header h1 { color: #C8A647; font-size: 24px; font-weight: 400; font-family: Georgia, serif; }
  header p { color: #6E9050; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-family: monospace; }
  .container { max-width: 1100px; margin: 0 auto; padding: 40px 24px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 40px; }
  .stat-card { background: #FAF6ED; border: 1px solid #DDD3BD; border-radius: 12px; padding: 24px; }
  .stat-card .label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #7A8A6A; font-family: monospace; margin-bottom: 8px; }
  .stat-card .value { font-size: 32px; font-weight: 600; color: #2A3D24; line-height: 1; }
  .stat-card .sub { font-size: 12px; color: #7A8A6A; margin-top: 6px; }
  section { margin-bottom: 40px; }
  section h2 { font-size: 16px; font-weight: 600; color: #2A3D24; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #DDD3BD; }
  table { width: 100%; border-collapse: collapse; background: #FAF6ED; border-radius: 12px; overflow: hidden; border: 1px solid #DDD3BD; }
  th { background: #1E3320; color: #C8A647; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-family: monospace; padding: 12px 16px; text-align: left; }
  td { padding: 12px 16px; border-top: 1px solid #EDE4CF; font-size: 14px; vertical-align: middle; }
  tr:hover td { background: #F2EBDC; }
  .btn-csv { display: inline-block; background: #2A3D24; color: #FAF6ED; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; transition: opacity 200ms; }
  .btn-csv:hover { opacity: 0.85; }
  .empty { text-align: center; color: #7A8A6A; padding: 40px; font-size: 14px; }
</style>
</head>
<body>
<header>
  <div>
    <p>Panel de administración</p>
    <h1>BIORAIZ 2026</h1>
  </div>
  <a class="btn-csv" href="/admin/exportar-csv?clave=${clave}">⬇ Descargar CSV</a>
</header>

<div class="container">
  <div class="stats">
    <div class="stat-card">
      <div class="label">Total entradas vendidas</div>
      <div class="value">${totalTickets}</div>
      <div class="sub">pagos confirmados</div>
    </div>
    <div class="stat-card">
      <div class="label">Ingresos totales ARS</div>
      <div class="value">$ ${totalARS.toLocaleString('es-AR')}</div>
    </div>
    <div class="stat-card">
      <div class="label">Ingresos totales USD</div>
      <div class="value">U$D ${Number(totalUSD).toLocaleString('es-AR')}</div>
      <div class="sub">Tipo de cambio: $ ${USD_RATE.toLocaleString('es-AR')}</div>
    </div>
  </div>

  <section>
    <h2>Entradas por tipo</h2>
    ${totalesPorTipo.length === 0 ? '<p class="empty">Sin ventas aún</p>' : `
    <table>
      <thead><tr><th>Tipo</th><th style="text-align:center">Cantidad</th><th style="text-align:right">Ingresos ARS</th></tr></thead>
      <tbody>${filasTipos}</tbody>
    </table>`}
  </section>

  <section>
    <h2>Compradores (${totalTickets})</h2>
    ${compradores.length === 0 ? '<p class="empty">Sin compradores aún</p>' : `
    <table>
      <thead><tr><th>Nombre</th><th>Email</th><th>Entrada</th><th>Día</th><th style="text-align:right">Monto</th><th>Fecha</th></tr></thead>
      <tbody>${filasCompradores}</tbody>
    </table>`}
  </section>
</div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error dashboard:', err);
    res.status(500).send('Error cargando dashboard');
  }
});

export default router;
