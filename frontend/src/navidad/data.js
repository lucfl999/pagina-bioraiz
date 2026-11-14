import { SPONSOR_TIERS } from '../data.js';

// BIORAIZ — Datos para la edición navideña
// ─── BIORAIZ — Data ───────────────────────────────────────────────
// Expositores, agenda, speakers, FAQ, prensa. Todo ficticio coherente.

// Edición Navideña (fecha estimada, a confirmar)
const BZ_DATE = "Diciembre 2026";
const BZ_DATE_FULL = "Diciembre 2026 · día a confirmar";
const BZ_HORARIO = "16 a 23 h";
const BZ_LOCATION = "Isla 132 · Neuquén";
const BZ_NAV_TARGET = "2026-12-19T16:00:00-03:00"; // poner el día real
const BZ_NAV_CONFIRMADA = false; // en true muestra la cuenta regresiva
// Edición 1
const BZ_ED1_FECHA = "6, 7 y 8 de noviembre, 2026";
const BZ_ED1_ASISTENTES = 35000;
// Video principal del Inicio: poné la ruta del archivo (ej. "assets/video-bioraiz.mp4"). Vacío = muestra la foto.
const BZ_HERO_VIDEO = "";
const BZ_HERO_POSTER = "assets/ed1/DSC09695.jpg";
const ED1_FOTOS = [
  ["DSC09695", "Clase de yoga al atardecer"], ["DSC09646", "Cocina Antigua, mermeladas gourmet"], ["DSC00151", "Saltos en el pelotero"], ["DSC00187", "Ambar Accesorios"],
  ["DSC00183", "Paseando entre los stands"], ["DSC00191", "Hilvana y Si mi reina"], ["DSC09675", "Show infantil en el escenario"], ["DSC00194", "Aconquija, aceite de nuez"],
  ["DSC00157", "Familias recorriendo la feria"], ["DSC00001", "Taller de Mini Pasteleros"], ["DSC09717", "Chilca, envoltorios de cera"], ["DSC00022", "Sorteo de Sagrada Madre"],
  ["DSC00056", "Clase de movilidad"], ["DSC00176", "Greenery, frutas y licuados"], ["DSC09728", "Deco navideña en un stand"], ["DSC09658", "A-Mar, bolsos y mochilas"],
];
const BZ_ED1_EXPOSITORES = 42;
const BZ_ED1_GASTRO = 11;

// ── Actividades Edición Navideña ──
// BZ_ACT_DEFINIDAS: false = "programa en armado" · true = muestra NAV_ACTIVIDADES
const BZ_ACT_DEFINIDAS = false;
const ACT_TIPOS = [
  { id: "taller", label: "Talleres", desc: "Para aprender haciendo y llevarse algo hecho con nuestras propias manos." },
  { id: "clase", label: "Clases", desc: "Movimiento y práctica abierta para todos los niveles." },
  { id: "terapia", label: "Terapias", desc: "Sesiones de bienestar para hacer una pausa en medio de la feria." },
];
// EJEMPLO: reemplazar por las actividades reales. tipo: taller | clase | terapia · cupo (opcional): ej. 20
const NAV_ACTIVIDADES = [
  { tipo: "taller", nombre: "Nombre del taller", quien: "Tallerista", hora: "16:30", lugar: "Domo", cupo: 20 },
  { tipo: "clase", nombre: "Nombre de la clase", quien: "Docente", hora: "17:00", lugar: "Aire libre" },
  { tipo: "terapia", nombre: "Nombre de la terapia", quien: "Terapeuta", hora: "18:00", lugar: "Domo" },
  { tipo: "taller", nombre: "Nombre del taller", quien: "Tallerista", hora: "19:00", lugar: "Aire libre" },
  { tipo: "clase", nombre: "Nombre de la clase", quien: "Docente", hora: "20:00", lugar: "Aire libre" },
];

// ── Datos de contacto / redes ───────────────────────────────────
const BZ_EMAIL = "hola@bioraiz.net";
const BZ_WHATSAPP_LABEL = "+54 9 2995781006";
const BZ_WHATSAPP_LINK = "https://wa.me/5492995781006";
const BZ_INSTAGRAM = "https://www.instagram.com/bioraiz.nqn/";
const BZ_FACEBOOK = "https://www.facebook.com/people/Bioraiz/61590140866075/";


// ── Bloques por día (preview de programa) ───────────────────────
const DIA_BLOQUES = [
  { num: "6", dia: "Viernes", sub: "Apertura",     tags: ["Charlas", "Yoga & stretching"] },
  { num: "7", dia: "Sábado",  sub: "Día completo", tags: ["Charlas", "Terapias", "Yoga & stretching", "Biodanza", "Pilates", "Terapia de sonido", "Música"] },
  { num: "8", dia: "Domingo", sub: "Cierre",       tags: ["Charlas", "Oráculo Vivo", "Pilates", "Yoga & stretching", "Biodanza", "Jam", "Música"] },
];

// ── Tipos de actividad (programa completo) ──────────────────────
const TIPOS_ACTIVIDAD = [
  { tipo: "Mercado",     desc: "Recorrer los stands y conversar con quien hizo lo que comprás." },
  { tipo: "Charlas",     desc: "Conversaciones sobre origen, oficio y futuro, con tiempo para preguntar." },
  { tipo: "Talleres",    desc: "Aprender haciendo: cocina, tierra, textil y manos a la obra." },
  { tipo: "Música",      desc: "Música en vivo en el escenario principal, hasta el fogón de cierre." },
  { tipo: "Bienestar",   desc: "Movimiento, respiración y pausa en la Pradera, con respiro." },
  { tipo: "Zona Brotes", desc: "Talleres de tierra y semillas pensados para los más chicos." },
];

// ── Las 5 zonas experienciales ──────────────────────────────────
const ZONAS = [
  { name: "Mercado de Productores", desc: "Conversar con quien hizo lo que comprás." },
  { name: "Cocina Abierta",         desc: "Fuego, fermentos y recetas que no están en ningún libro." },
  { name: "Escenario Principal",    desc: "Música en vivo los tres días. Cierre con fogón." },
  { name: "Zona Brotes",            desc: "Talleres de tierra y semillas para los más chicos." },
  { name: "Pradera",                desc: "Movimiento, bienestar y charlas con respiro. De mediodía al atardecer." },
];

// ── Expositores ─────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",        label: "Todos",         color: "var(--bz-verde-profundo)" },
  { id: "alimentos",  label: "Alimentación",  color: "var(--bz-verde-bosque)" },
  { id: "cosmetica",  label: "Cosmética",     color: "var(--bz-tierra-rojo)" },
  { id: "diseno",     label: "Diseño",        color: "var(--bz-ocre-tostado)" },
  { id: "bienestar",  label: "Bienestar",     color: "var(--bz-verde-musgo)" },
  { id: "infantil",   label: "Infantil",      color: "var(--bz-tierra-claro)" },
  { id: "gastro",     label: "Gastronomía",   color: "var(--bz-verde-profundo)" },
];

const EXPOSITORES = [
  { id: 1, name: "La Copería", cat: "gastro", origen: "", desc: "Vinos servidos por copa.", foto: "assets/expositores/la-coperia.jpg", logo: "assets/expositores/la-coperia-logo.jpg" },
  { id: 2, name: "Bodega Moschini", cat: "gastro", origen: "", desc: "Bodega & viñedos. Vinos de la Patagonia argentina.", foto: "assets/expositores/moschini.jpg", logo: "assets/expositores/moschini-logo.jpg" },
  { id: 3, name: "Cocina Antigua", cat: "alimentos", origen: "", desc: "Conservas y dulces en frasco, como el strudel de manzana.", foto: "assets/expositores/cocina-antigua.jpg", logo: "assets/expositores/cocina-antigua-logo.jpg" },
  { id: 4, name: "Lily Maurizio", cat: "alimentos", origen: "", desc: "Chocolates artesanales.", foto: "assets/expositores/lily-maurizio.jpg", logo: "assets/expositores/lily-maurizio-logo.jpg" },
  { id: 5, name: "Aconquija", cat: "alimentos", origen: "", desc: "Aceite natural de nuez, hecho con nueces de Catamarca.", foto: "assets/expositores/aconquija.jpg", logo: "assets/expositores/aconquija-logo.jpg" },
  { id: 6, name: "La Despensa del Sur", cat: "alimentos", origen: "", desc: "Aceite de oliva virgen extra Aimoliva, de Finca Carbonell.", foto: "assets/expositores/despensa-del-sur.jpg", logo: "assets/expositores/despensa-del-sur-logo.jpg" },
  { id: 7, name: "Lina Natural", cat: "cosmetica", origen: "", desc: "Cosmética natural. Crema de rosa mosqueta.", foto: "assets/expositores/lina-natural.jpg", logo: "assets/expositores/lina-natural-logo.jpg" },
  { id: 8, name: "KIKA", cat: "bienestar", origen: "", desc: "Velas de ritual de cera de soja, 100% natural.", foto: "assets/expositores/kika.jpg", logo: null },
  { id: 9, name: "Aromas NM", cat: "bienestar", origen: "", desc: "Ramos de flores secas y aromas.", foto: "assets/expositores/aromas-nm.jpg", logo: "assets/expositores/aromas-nm-logo.jpg" },
  { id: 10, name: "Chilca", cat: "diseno", origen: "", desc: "Envoltorios ecológicos.", foto: "assets/expositores/chilca.jpg", logo: "assets/expositores/chilca-logo.jpg" },
  { id: 11, name: "Teionna Joyas", cat: "diseno", origen: "", desc: "Joyería artesanal.", foto: "assets/expositores/teionna.jpg", logo: "assets/expositores/teionna-logo.jpg" },
  { id: 12, name: "Pintura y Papel", cat: "diseno", origen: "", desc: "Cartapesta & bijouterie.", foto: "assets/expositores/pintura-y-papel.jpg", logo: "assets/expositores/pintura-y-papel-logo.jpg" },
  { id: 13, name: "Arte con Pasión", cat: "diseno", origen: "", desc: "Piezas de arte en resina.", foto: "assets/expositores/arte-con-pasion.jpg", logo: "assets/expositores/arte-con-pasion-logo.jpg" },
  { id: 14, name: "Lunaria Creative Studio", cat: "diseno", origen: "", desc: "Libretas y encuadernación artesanal.", foto: "assets/expositores/lunaria.jpg", logo: "assets/expositores/lunaria-logo.jpg" },
  { id: 15, name: "Luz del Alma", cat: "diseno", origen: "", desc: "Deco & estilo. Cestos de yute y cuerda.", foto: "assets/expositores/luz-del-alma.jpg", logo: "assets/expositores/luz-del-alma-logo.jpg" },
  { id: 16, name: "K", cat: "diseno", origen: "", desc: "Mobiliario de cartón.", foto: "assets/expositores/k-carton.jpg", logo: "assets/expositores/k-carton-logo.jpg" },
];

// ── Programa ─────────────────────────────────────────────────────
const DIAS = [
  { id: "viernes", label: "Viernes", num: "6", subtitulo: "Apertura", fecha: "6 nov" },
  { id: "sabado",  label: "Sábado",  num: "7", subtitulo: "Día completo", fecha: "7 nov" },
  { id: "domingo", label: "Domingo", num: "8", subtitulo: "Cierre", fecha: "8 nov" },
];

const ACTIVIDADES = {
  viernes: [
    { hora: "18:00", title: "Charla", lugar: "Domo", speaker: "Carolina Gastaldi", tipo: "Charla" },
    { hora: "18:30", title: "Charla", lugar: "Escenario principal", speaker: "Romina Cuadrillero", tipo: "Charla" },
    { hora: "19:00", title: "Yoga & stretching*", lugar: "Aire libre", speaker: "Paula", tipo: "Bienestar" },
  ],
  sabado: [
    { hora: "15:00", title: "Terapia: Puja de Tameana", lugar: "Domo", speaker: "Nati Keheler", tipo: "Bienestar" },
    { hora: "16:00", title: "Charla", lugar: "Escenario principal", speaker: "Francine Rostan", tipo: "Charla" },
    { hora: "16:00", title: "Yoga & stretching*", lugar: "Aire libre", speaker: "Paula", tipo: "Bienestar" },
    { hora: "16:30 a 17:30", title: "Biodanza", lugar: "Domo", speaker: "Romina Cuadrillero", tipo: "Bienestar" },
    { hora: "17:00", title: "Pilates", lugar: "Aire libre", speaker: "Nati Keheler", tipo: "Bienestar" },
    { hora: "18:00", title: "Charla", lugar: "Escenario principal", speaker: "Maya Tobares", tipo: "Charla" },
    { hora: "18:00", title: "Yoga & stretching*", lugar: "Aire libre", speaker: "Paula", tipo: "Bienestar" },
    { hora: "18:15", title: "Terapia de sonido", lugar: "Domo", speaker: "Franco Martínez (Nolugar)", tipo: "Bienestar" },
    { hora: "19:00", title: "Charla", lugar: "Escenario principal", speaker: "Hernán Libkind", tipo: "Charla" },
    { hora: "20:00", title: "Música: “Flores flores”", lugar: "A definir", speaker: "Florencia Cabaña", tipo: "Música" },
  ],
  domingo: [
    { hora: "14:00", title: "Charla", lugar: "Escenario principal", speaker: "Leticia Fattore", tipo: "Charla" },
    { hora: "15:00", title: "Oráculo Vivo* (+16 años)", lugar: "Domo", speaker: "Camila Cammarota", tipo: "Bienestar" },
    { hora: "15:00", title: "Pilates", lugar: "Aire libre", speaker: "Nati Keheler", tipo: "Bienestar" },
    { hora: "16:00", title: "Charla", lugar: "Escenario principal", speaker: "Bibiana Beatriz Sagripanti", tipo: "Charla" },
    { hora: "16:00", title: "Yoga & stretching*", lugar: "Aire libre", speaker: "Paula", tipo: "Bienestar" },
    { hora: "16:30 a 17:30", title: "Biodanza", lugar: "Domo", speaker: "Romina Cuadrillero", tipo: "Bienestar" },
    { hora: "17:00 a 18:00", title: "Experiencia práctica grupal", lugar: "Aire libre", speaker: "Leticia Fattore", tipo: "Taller" },
    { hora: "17:30", title: "Charla", lugar: "Escenario principal", speaker: "Carolina Gastaldi", tipo: "Charla" },
    { hora: "18:00", title: "Yoga & stretching*", lugar: "Aire libre", speaker: "Paula", tipo: "Bienestar" },
    { hora: "18:15", title: "Terapia de sonido", lugar: "Domo", speaker: "Franco Martínez (Nolugar)", tipo: "Bienestar" },
    { hora: "18:30", title: "Jam", lugar: "Aire libre", speaker: "Carolina Gastaldi", tipo: "Música" },
    { hora: "20:00", title: "Música", lugar: "Escenario principal", speaker: "María Julia", tipo: "Música" },
    { hora: "21:30 al cierre", title: "Música", lugar: "Escenario principal", speaker: "Magma", tipo: "Música" },
  ],
};

const SPEAKERS = [
  { id: 1, name: "Valeria Soto",  rol: "Ingeniera agrónoma · INTA Patagonia", topic: "Agroecología y futuro" },
  { id: 2, name: "Marina Ré",     rol: "Cocinera · autora de 'Provincia'",     topic: "Cocina sin desperdicio" },
  { id: 3, name: "Diego Marín",   rol: "Antropólogo · UNCo",                    topic: "Comunidad y propósito" },
  { id: 4, name: "Lara Pichún",   rol: "Tejedora · maestra mapuche",            topic: "Telares y memoria" },
  { id: 5, name: "Tomás Vega",    rol: "Chef · Cocina Abierta",                 topic: "Fuego, fermento, paciencia" },
  { id: 6, name: "Ana Lemos",     rol: "Periodista de impacto · La Tinta",      topic: "Comunicar lo esencial" },
];

// ── Entradas ─────────────────────────────────────────────────────
const TICKETS = [
  {
    id: "early",
    name: "Raíces",
    precio: "$ 22.000",
    precioOrig: "$ 30.000",
    unidad: "por día",
    badge: "Raíces · Early Bird",
    color: "ocre",
    incluye: [
      "Acceso general 1 día a elección (viernes, sábado o domingo)",
      "Ingreso desde apertura de puertas (12:00 hs)",
      "Acceso a todos los escenarios principales y feria de emprendimientos",
      "Zona wellness: acceso libre (sin sesiones reservadas)",
    ],
  },
  {
    id: "general",
    name: "Raíces",
    precio: "$ 30.000",
    unidad: "por día",
    badge: "Raíces · General",
    color: "verde",
    incluye: [
      "Acceso general 1 día a elección (viernes, sábado o domingo)",
      "Ingreso desde apertura de puertas (12:00 hs)",
      "Acceso a todos los escenarios principales y feria de emprendimientos",
      "Zona wellness: acceso libre (sin sesiones reservadas)",
    ],
    destacado: true,
  },
  {
    id: "vip",
    name: "Bosque",
    precio: "$ 80.000",
    unidad: "por día",
    badge: "Bosque · VIP",
    color: "tierra",
    incluye: [
      "Acceso VIP · 1 día",
      "Kit de bienvenida: botella de acero inoxidable + snack orgánico + bandana",
      "Baños VIP exclusivos (menor espera, mejor mantenimiento)",
      "Ingreso a Zona VIP con barra exclusiva",
    ],
  },
];

const FAQ = [
  { q: "¿Puedo ir con mi mascota?", a: "El evento no admite mascotas. Por el bienestar de los animales, la cantidad de público y la comida al aire libre, te pedimos dejarlas en casa. Gracias por entenderlo." },
  { q: "¿Hay accesibilidad para sillas de ruedas?", a: "Sí. Los caminos centrales están adaptados, hay baños accesibles y un punto de información con personal para acompañar. Si necesitás apoyo específico, escribinos antes." },
  { q: "¿Puedo llevar mi propio termo o vajilla?", a: "Por favor. Es parte de los compromisos de la edición: minimizar descartables. En el ingreso hay bebederos para recargar." },
  { q: "¿Hay estacionamiento?", a: "Limitado. Recomendamos transporte público, bicicleta o llegar caminando. Hay bicicletero señalizado en el ingreso y combis desde el centro de Neuquén." },
  { q: "¿Se devuelve el dinero si llueve?", a: "El evento se hace con lluvia. Solo se suspende por alerta meteorológica oficial — en ese caso, las entradas son válidas para una fecha de reposición o se reintegran." },
];

// ── Valores ─────────────────────────────────────────────────────
const VALORES = [
  { icon: "raíz",     title: "Origen",      desc: "Cada expositor puede contar de dónde viene su materia prima y cómo se produce. Ese es el corazón de la feria." },
  { icon: "círculo",  title: "Circularidad", desc: "Lo que entra al evento, sale o se transforma. Compost, vajilla reusable, materiales que vuelven a la tierra." },
  { icon: "ola",      title: "Pausa",       desc: "La feria no apura. Programa que respira, espacios para sentarse y aire entre cada actividad." },
  { icon: "trama",    title: "Comunidad",   desc: "BIORAIZ es un espacio que se construye entre todos: expositores, público y equipo somos parte." },
  { icon: "brote",    title: "Crecimiento", desc: "Cada edición intentamos algo nuevo, medimos qué funcionó y publicamos los datos. La transparencia es parte de la sustentabilidad." },
];

const NUMEROS = [
  { value: 3,   suffix: "",  label: "días de feria" },
  { value: 5,   suffix: "",  label: "zonas experienciales" },
  { value: 200, suffix: "+", label: "stands disponibles" },
  { value: 11,  suffix: "h", label: "de actividades por día" },
];

const COMPROMISOS = [
  { title: "Cero plásticos descartables", desc: "" },
  { title: "Reducción de huella de CO₂",  desc: "" },
  { title: "Compost en proceso",          desc: "" },
  { title: "Energía más limpia",          desc: "" },
  { title: "Transparencia",               desc: "Al cierre publicamos los datos reales de lo que logramos y lo que no." },
];

const EQUIPO = [
  { name: "Carla Reinoso",   rol: "Dirección general" },
  { name: "Mauro Pereyra",   rol: "Producción y operaciones" },
  { name: "Lucía Antún",     rol: "Curaduría de expositores" },
  { name: "Tomás Aguirre",   rol: "Programa y contenidos" },
  { name: "Inés Bermúdez",   rol: "Sustentabilidad" },
  { name: "Joaquín Páez",    rol: "Comunicación y prensa" },
];

// ── Instagram Reels ─────────────────────────────────────────────
// Forma EXACTA de la respuesta del endpoint (Worker de Cloudflare).
// Swap directo después: reemplazar este array por el fetch, sin tocar el componente.
const MOCK_REELS = [
  { id: "r1", thumbnail: "assets/placeholder", permalink: "https://www.instagram.com/bioraiz.nqn/", caption: "Atardecer en Las Cortaderas — el cierre del sábado." },
  { id: "r2", thumbnail: "assets/placeholder", permalink: "https://www.instagram.com/bioraiz.nqn/", caption: "Cocina abierta: fermentos en vivo con Raíz." },
  { id: "r3", thumbnail: "assets/placeholder", permalink: "https://www.instagram.com/bioraiz.nqn/", caption: "Música al aire libre, entre los stands." },
  { id: "r4", thumbnail: "assets/placeholder", permalink: "https://www.instagram.com/bioraiz.nqn/", caption: "Manos de feriantes: del telar a la mesa." },
  { id: "r5", thumbnail: "assets/placeholder", permalink: "https://www.instagram.com/bioraiz.nqn/", caption: "Zona brotes — los más chicos siembran." },
  { id: "r6", thumbnail: "assets/placeholder", permalink: "https://www.instagram.com/bioraiz.nqn/", caption: "Amanecer en el predio, antes de abrir." },
];


// ── Música en vivo ──
const ARTISTAS = [
  { nombre: "Magma", dia: "Domingo 8", hora: "21:30 al cierre", lugar: "Cerró la Edición 1", foto: "assets/artistas/magma.jpg", pos: "center", ratio: "1400/985" },
  { nombre: "María Julia", dia: "Domingo 8", hora: "20:00", lugar: "Escenario principal", foto: "assets/artistas/julia.jpg", pos: "center 40%" },
];

export {
  BZ_DATE, BZ_DATE_FULL, BZ_LOCATION, BZ_HORARIO, BZ_NAV_TARGET, BZ_NAV_CONFIRMADA, BZ_ED1_FECHA, BZ_ED1_ASISTENTES, BZ_ED1_EXPOSITORES, BZ_ED1_GASTRO, BZ_HERO_VIDEO, BZ_HERO_POSTER, ED1_FOTOS, BZ_ACT_DEFINIDAS, ACT_TIPOS, NAV_ACTIVIDADES,
  BZ_EMAIL, BZ_WHATSAPP_LABEL, BZ_WHATSAPP_LINK, BZ_INSTAGRAM, BZ_FACEBOOK,
  CATEGORIES, EXPOSITORES, DIA_BLOQUES, TIPOS_ACTIVIDAD, ZONAS,
  DIAS, ACTIVIDADES, SPEAKERS, ARTISTAS,
  TICKETS, FAQ, VALORES, NUMEROS, COMPROMISOS, MOCK_REELS, SPONSOR_TIERS,
};
