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
    tipo_puesto_gastronomico: 'Comida y bebidas',
    cafe_bebidas_calientes: 'Sí',
    aceptacion_condiciones: 'Sí',
    carro_medidas: '2 × 1 × 2',
  });

  assert.deepEqual(payload, {
    formulario: 'gastronomico',
    'Nombre y apellido': 'Ana',
    WhatsApp: '2991234567',
    Email: 'ana@example.com',
    'Nombre del emprendimiento': 'La Huerta',
    'Tu menú': 'Comidas',
    'Tipo de puesto gastronómico': 'Comida y bebidas',
    '¿Vendés café o bebidas calientes?': 'Sí',
    'Leí y acepto las condiciones de vasos, vajilla y menú del evento.': 'Sí',
    'Medidas del carro (largo × ancho × alto, en metros)': '2 × 1 × 2',
  });
});

test('maps feriante stand selection and staffing fields to their visible labels', () => {
  const payload = buildParticipationSheetsPayload({
    tipo_participacion: 'Expositor/a',
    rol: 'Expositor/a',
    tipo: 'feriante',
    nombre: 'Ana',
    emprendimiento: 'La Huerta',
    rubro: 'Productos orgánicos',
    tipo_stand: 'Stand 3x3',
    personas_stand: '3',
  });

  assert.deepEqual(payload, {
    formulario: 'feriante',
    'Nombre y apellido': 'Ana',
    'Nombre del emprendimiento': 'La Huerta',
    'Rubro · qué vendés': 'Productos orgánicos',
    'Tipo de stand': 'Stand 3x3',
    '¿Cuántas personas atienden el stand?': '3',
  });
});

test('uses the public participation message heading', () => {
  const payload = buildParticipationSheetsPayload({
    tipo_participacion: 'Público',
    rol: 'Público',
    nombre: 'Ana',
    mensaje: 'Avisame la fecha',
    canal: 'Instagram',
    consentimiento_datos: 'Sí',
  });

  assert.equal(payload.formulario, 'publico');
  assert.equal(payload['¿Algo que quieras contarnos?'], 'Avisame la fecha');
  assert.equal(payload['¿Cómo te enteraste?'], 'Instagram');
  assert.equal(payload['Acepto que BIORAIZ use mis datos para contactarme por esta convocatoria.'], 'Sí');
});

test('maps workshop audience, schedule, capacity and contact fields', () => {
  const payload = buildParticipationSheetsPayload({
    tipo_participacion: 'Tallerista',
    rol: 'Tallerista',
    publico_objetivo: 'Todo público',
    edad_minima: '8',
    cupo_maximo: '20',
    dias_disponibles: 'Sábado 12, Domingo 13',
    franja_horaria: '17 a 19 h',
    instagram: '@taller',
    consentimiento_datos: 'Sí',
  });

  assert.deepEqual(payload, {
    formulario: 'tallerista',
    '¿Para quién es?': 'Todo público',
    'Edad mínima': '8',
    'Cupo máximo de personas': '20',
    '¿Qué día podés?': 'Sábado 12, Domingo 13',
    'Franja horaria preferida': '17 a 19 h',
    'Instagram o web': '@taller',
    'Acepto que BIORAIZ use mis datos para contactarme por esta convocatoria.': 'Sí',
  });
});

test('maps volunteer availability, shirt size and age confirmation', () => {
  const payload = buildParticipationSheetsPayload({
    tipo_participacion: 'Voluntario/a',
    rol: 'Voluntario/a',
    disponibilidad: 'Armado, Domingo 13',
    area: 'Puntos verdes',
    talle_remera: 'M',
    mayor_18: 'Sí',
    consentimiento_datos: 'Sí',
  });

  assert.deepEqual(payload, {
    formulario: 'voluntario',
    '¿Qué días podés?': 'Armado, Domingo 13',
    'Área que te interesa': 'Puntos verdes',
    'Talle de remera': 'M',
    'Soy mayor de 18 años': 'Sí',
    'Acepto que BIORAIZ use mis datos para contactarme por esta convocatoria.': 'Sí',
  });
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
    requerimientos_especiales: 'Mats, sonido, sombra',
    dias_disponibles: 'Sábado 12',
    franja_horaria: '16 a 18 h',
    cupo_maximo: '15',
    instagram: '@facilitadora',
    consentimiento_datos: 'Sí',
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
    '¿Qué día podés?': 'Sábado 12',
    'Franja horaria preferida': '16 a 18 h',
    'Cupo máximo de personas': '15',
    '¿Qué traés y qué necesitás de la organización?': 'Mats, sonido, sombra',
    'Instagram o web': '@facilitadora',
    'Acepto que BIORAIZ use mis datos para contactarme por esta convocatoria.': 'Sí',
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
