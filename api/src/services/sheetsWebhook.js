import axios from 'axios';

const FIELD_LABELS = {
  nombre: 'Nombre y apellido',
  nombrecompleto: 'Nombre y apellido',
  whatsapp: 'WhatsApp',
  telefono: 'WhatsApp',
  celular: 'WhatsApp',
  email: 'Email',
  mail: 'Email',
  correo: 'Email',
  emprendimiento: 'Nombre del emprendimiento',
  rubro: 'Rubro · qué vendés',
  tipostand: 'Tipo de stand',
  personasstand: '¿Cuántas personas atienden el stand?',
  tipopuestogastronomico: 'Tipo de puesto gastronómico',
  cafebebidascalientes: '¿Vendés café o bebidas calientes?',
  aceptacioncondiciones: 'Leí y acepto las condiciones de vasos, vajilla y menú del evento.',
  instagram: 'Instagram o web',
  electricidad: '¿Qué elementos usan electricidad?',
  carromedidas: 'Medidas del carro (largo × ancho × alto, en metros)',
  vasos: 'Vasos que usás (tamaños, en cc o ml)',
  platos: 'Platos y utensilios que usás (material y tipo)',
  actividad: 'Actividad',
  tipo: 'Tipo de actividad',
  horario: 'Horario',
  lugar: 'Lugar',
  disciplina: 'Disciplina',
  disciplinasesion: 'Tipo de sesión que proponés',
  descripcion: 'Descripción de la sesión',
  duracionsesion: 'Duración de la sesión',
  nivel: 'Nivel de la práctica',
  formacion: 'Formación y certificaciones',
  experiencia: 'Experiencia facilitando grupos',
  requerimientosespeciales: 'Requerimientos especiales',
  responsable: 'Responsable',
  personas: '¿Cuántas personas?',
  duracion: 'Duración aproximada',
  requerimientos: 'Qué necesitás (espacio, sonido, materiales)',
  empresa: 'Empresa o marca',
  cargo: 'Tu cargo',
  disponibilidad: 'Días en los que podrías colaborar',
  area: 'Área que te interesa',
  mensaje: 'Contanos un poco más',
  actividades: '¿A qué actividades te querés anotar?',
  salud: '¿Tenés alguna lesión, embarazo o condición que el instructor deba saber?',
  canal: '¿Cómo te enteraste de BIORAIZ?',
  consentimiento: 'Participo bajo mi responsabilidad y acepto recibir información de BIORAIZ por WhatsApp o email.',
};

const RESERVED_FIELDS = new Set([
  'formulario',
  'token',
  'tipo_participacion',
  'type',
  'rol',
  '_subject',
  '_field_labels',
]);

const normalize = (value) => String(value)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]/g, '');

const getFields = (data, formulario) => {
  const labels = data._field_labels && typeof data._field_labels === 'object'
    ? data._field_labels
    : {};
  const fields = {};

  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = normalize(key);
    if (RESERVED_FIELDS.has(key) || key === 'tipo_participacion') continue;
    if ((formulario === 'feriante' || formulario === 'gastronomico') && normalizedKey === 'tipo') continue;

    const label = labels[key]
      || (formulario === 'gastronomico' && normalizedKey === 'rubro'
        ? 'Tu menú'
        : FIELD_LABELS[normalizedKey] || key);
    if (normalizedKey === 'mensaje' && formulario === 'publico') {
      fields['¿Algo que quieras contarnos?'] = value;
    } else {
      fields[label] = value;
    }
  }

  return fields;
};

export const buildParticipationSheetsPayload = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

  const participationType = String(data.tipo_participacion || data.type || '');
  const role = normalize(data.rol || participationType);
  let formulario;

  if (normalize(participationType).startsWith('inscripcionaactividad')) {
    formulario = 'actividad';
  } else if (role === 'expositor' || role === 'expositora') {
    formulario = normalize(data.tipo) === 'gastronomico' ? 'gastronomico' : 'feriante';
  } else {
    formulario = {
      tallerista: 'tallerista',
      facilitadora: 'facilitador',
      sponsor: 'sponsor',
      voluntario: 'voluntario',
      voluntarioa: 'voluntario',
      publico: 'publico',
    }[role];
  }

  if (!formulario) return null;
  return { formulario, ...getFields(data, formulario) };
};

export const buildActivitySheetsPayload = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  return { formulario: 'actividad', ...getFields(data, 'actividad') };
};

export const sendToSheetsWebhook = (record) => {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const token = process.env.SHEETS_TOKEN;
  if (!url || !token || !record) return;

  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, 10_000);
  let request;

  try {
    request = axios.post(url, JSON.stringify({ ...record, token }), {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      maxRedirects: 5,
      timeout: 10_000,
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Google Sheets webhook failed:', error.message);
    return;
  }

  request.then(({ data }) => {
    if (data && typeof data === 'object' && data.ok === false) {
      console.error('Google Sheets webhook rejected the submission:', data.error || 'Unknown Apps Script error');
    }
  }).catch((error) => {
    const message = timedOut ? 'Timed out after 10 seconds' : error.message;
    console.error('Google Sheets webhook failed:', error.code ? `${error.code}: ${message}` : message);
  }).finally(() => {
    clearTimeout(timeoutId);
  });
};
