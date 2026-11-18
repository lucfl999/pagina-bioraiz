import assert from 'node:assert/strict';
import test from 'node:test';
import axios from 'axios';
import {
  buildActivitySheetsPayload,
  buildParticipationSheetsPayload,
  sendToSheetsWebhook,
} from './sheetsWebhook.js';

test('maps gastronomic applications to exact sheet headings and omits control fields', () => {
  const payload = buildParticipationSheetsPayload({
    tipo_participacion: 'Expositor/a',
    rol: 'Expositor/a',
    tipo: 'gastronomico',
    nombre: 'Ana',
    whatsapp: '2991234567',
    email: 'ana@example.com',
    emprendimiento: 'La Huerta',
    rubro: 'Comidas',
    carro_medidas: '2 × 1 × 2',
  });

  assert.deepEqual(payload, {
    formulario: 'gastronomico',
    'Nombre y apellido': 'Ana',
    WhatsApp: '2991234567',
    Email: 'ana@example.com',
    'Nombre del emprendimiento': 'La Huerta',
    'Qué comidas o bebidas ofrecés': 'Comidas',
    'Medidas del carro (largo × ancho × alto, en metros)': '2 × 1 × 2',
  });
});

test('uses the public participation message heading', () => {
  const payload = buildParticipationSheetsPayload({
    tipo_participacion: 'Público',
    rol: 'Público',
    nombre: 'Ana',
    mensaje: 'Avisame la fecha',
  });

  assert.equal(payload.formulario, 'publico');
  assert.equal(payload['¿Algo que quieras contarnos?'], 'Avisame la fecha');
});

test('maps facilitator applications to their sheet form and visible field labels', () => {
  const payload = buildParticipationSheetsPayload({
    tipo_participacion: 'Facilitador/a',
    rol: 'Facilitador/a',
    nombre: 'Ana',
    disciplina: 'Yoga',
    disciplina_sesion: 'Yoga restaurativo',
    descripcion: 'Una práctica para principiantes.',
    duracion_sesion: '60 minutos',
    nivel: 'Apto para todos',
    formacion: 'Certificación de yoga',
    experiencia: '3 a 7 años',
    requerimientos_especiales: 'Mantas',
  });

  assert.deepEqual(payload, {
    formulario: 'facilitador',
    'Nombre y apellido': 'Ana',
    Disciplina: 'Yoga',
    'Tipo de sesión que proponés': 'Yoga restaurativo',
    'Descripción de la sesión': 'Una práctica para principiantes.',
    'Duración de la sesión': '60 minutos',
    'Nivel de la práctica': 'Apto para todos',
    'Formación y certificaciones': 'Certificación de yoga',
    'Experiencia facilitando grupos': '3 a 7 años',
    'Requerimientos especiales': 'Mantas',
  });
});

test('maps activity registrations and retains additional fields under their visible labels', () => {
  const payload = buildActivitySheetsPayload({
    nombre: 'Ana',
    tipo: 'Yoga',
    actividad: 'Yoga',
    personas: '2',
    _field_labels: { extra: 'Pregunta adicional visible' },
    extra: 'Respuesta',
  });

  assert.deepEqual(payload, {
    formulario: 'actividad',
    'Nombre y apellido': 'Ana',
    'Tipo de actividad': 'Yoga',
    Actividad: 'Yoga',
    '¿Cuántas personas?': '2',
    'Pregunta adicional visible': 'Respuesta',
  });
});

test('posts to the webhook without awaiting it and follows Apps Script redirects', async () => {
  const originalPost = axios.post;
  const originalUrl = process.env.SHEETS_WEBHOOK_URL;
  const originalToken = process.env.SHEETS_TOKEN;
  let request;

  try {
    process.env.SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/test/exec';
    process.env.SHEETS_TOKEN = 'test-token';
    axios.post = (...args) => {
      request = args;
      return Promise.resolve({ data: { ok: true } });
    };

    assert.equal(sendToSheetsWebhook({ formulario: 'publico', Email: 'ana@example.com' }), undefined);
    assert.equal(request[0], process.env.SHEETS_WEBHOOK_URL);
    assert.deepEqual(JSON.parse(request[1]), {
      formulario: 'publico',
      Email: 'ana@example.com',
      token: 'test-token',
    });
    assert.equal(request[2].headers['Content-Type'], 'text/plain;charset=utf-8');
    assert.equal(request[2].timeout, 10_000);
    assert.equal(request[2].maxRedirects, 5);
    assert.ok(request[2].signal instanceof AbortSignal);
  } finally {
    axios.post = originalPost;
    if (originalUrl === undefined) delete process.env.SHEETS_WEBHOOK_URL;
    else process.env.SHEETS_WEBHOOK_URL = originalUrl;
    if (originalToken === undefined) delete process.env.SHEETS_TOKEN;
    else process.env.SHEETS_TOKEN = originalToken;
  }
});

test('skips the webhook when either environment variable is missing', () => {
  const originalPost = axios.post;
  const originalUrl = process.env.SHEETS_WEBHOOK_URL;
  const originalToken = process.env.SHEETS_TOKEN;

  try {
    delete process.env.SHEETS_WEBHOOK_URL;
    process.env.SHEETS_TOKEN = 'test-token';
    axios.post = () => {
      throw new Error('Webhook should have been skipped');
    };
    assert.doesNotThrow(() => sendToSheetsWebhook({ formulario: 'publico' }));

    process.env.SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/test/exec';
    delete process.env.SHEETS_TOKEN;
    assert.doesNotThrow(() => sendToSheetsWebhook({ formulario: 'publico' }));
  } finally {
    axios.post = originalPost;
    if (originalUrl === undefined) delete process.env.SHEETS_WEBHOOK_URL;
    else process.env.SHEETS_WEBHOOK_URL = originalUrl;
    if (originalToken === undefined) delete process.env.SHEETS_TOKEN;
    else process.env.SHEETS_TOKEN = originalToken;
  }
});
