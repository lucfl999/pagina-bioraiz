// ─── BIORAIZ — Data ───────────────────────────────────────────────
// Expositores, agenda, speakers, FAQ, prensa. Todo ficticio coherente.

const BZ_DATE = "13 · 14 · 15 nov 2026";
const BZ_DATE_FULL = "13, 14 y 15 de noviembre, 2026";
const BZ_LOCATION = "Parque Centenario · Neuquén";

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
  { id: 1,  name: "Miel del Sur",            cat: "alimentos", origen: "Villa La Angostura", desc: "Apicultores patagónicos de tercera generación. Mieles puras y fermentos." },
  { id: 2,  name: "Telas Vivas Patagonia",   cat: "diseno",    origen: "Bariloche",          desc: "Textiles teñidos con plantas nativas. Cada pieza, una temporada." },
  { id: 3,  name: "Raíz Fermentados",        cat: "alimentos", origen: "Neuquén",             desc: "Kimchi, kombuchas y pickles vivos. Ciencia y paciencia." },
  { id: 4,  name: "Tintas Naturales",        cat: "diseno",    origen: "El Bolsón",          origen2: "Pinturas de cáscaras, raíces y minerales del valle." , desc: "Pinturas de cáscaras, raíces y minerales del valle." },
  { id: 5,  name: "Brote de Lana",           cat: "infantil",  origen: "Junín de los Andes", desc: "Juguetes blandos de lana orgánica y madera local." },
  { id: 6,  name: "Cosmética Aroma",         cat: "cosmetica", origen: "San Martín de los Andes", desc: "Jabones, aceites y bálsamos con botánicos del bosque andino." },
  { id: 7,  name: "Casa Tierra",             cat: "diseno",    origen: "Neuquén",             desc: "Cerámica utilitaria cocida a leña, esmaltes minerales." },
  { id: 8,  name: "Verde Quieto",            cat: "bienestar", origen: "Bariloche",          desc: "Tisanas, aceites esenciales y prácticas para frenar." },
  { id: 9,  name: "Cocina del Valle",        cat: "gastro",    origen: "Plottier",            desc: "Conservas de la huerta, mermeladas raras, salsas con historia." },
  { id: 10, name: "Pequeños Granos",         cat: "infantil",  origen: "Centenario",          desc: "Cuentos, semilleros y juegos para sembrar curiosidad temprana." },
  { id: 11, name: "Lúpulo Hermano",          cat: "gastro",    origen: "El Bolsón",          desc: "Cerveza artesanal con lúpulo cultivado a 60 km de acá." },
  { id: 12, name: "Madera Hablante",         cat: "diseno",    origen: "Aluminé",             desc: "Mobiliario en madera caída. Cada mueble lleva el nombre de su árbol." },
  { id: 13, name: "Algarroba Norteña",       cat: "alimentos", origen: "Neuquén",             desc: "Harinas, panes y dulces a base de algarroba y frutos nativos." },
  { id: 14, name: "Quinoa Andina",           cat: "alimentos", origen: "Chos Malal",          desc: "Quinoa, kiwicha y semillas ancestrales del norte neuquino." },
  { id: 15, name: "Lana Tejedora",           cat: "diseno",    origen: "Junín de los Andes", desc: "Tejidos en telar con lana de oveja mapuche, técnicas heredadas." },
  { id: 16, name: "Aceites de Estepa",       cat: "cosmetica", origen: "Cipolletti",          desc: "Aceites prensados en frío: rosa mosqueta, almendra, lino." },
  { id: 17, name: "Yerba Patagónica",        cat: "gastro",    origen: "Neuquén",             desc: "Blends de hierbas patagónicas, yerba mate orgánica de proyectos justos." },
  { id: 18, name: "Hueco Cerámica",          cat: "diseno",    origen: "Bariloche",          desc: "Vajilla en gres y porcelana. Formas que se adaptan a las manos." },
  { id: 19, name: "Pan de Piedra",           cat: "gastro",    origen: "Villa La Angostura", desc: "Panadería de masa madre, harinas de molino propio." },
  { id: 20, name: "Sentidos Yoga",           cat: "bienestar", origen: "Neuquén",             desc: "Clases abiertas, meditación al amanecer y trabajo corporal." },
  { id: 21, name: "Brotes y Hojas",          cat: "alimentos", origen: "Plottier",            desc: "Microverdes, brotes y plantas comestibles cultivadas hidropónicamente." },
  { id: 22, name: "Pequeño Bosque",          cat: "infantil",  origen: "El Chocón",           desc: "Talleres de bioconstrucción y juegos al aire libre para chicos." },
];

// ── Programa ─────────────────────────────────────────────────────
const DIAS = [
  { id: "viernes", label: "Viernes", num: "13", subtitulo: "Apertura", fecha: "13 nov" },
  { id: "sabado",  label: "Sábado",  num: "14", subtitulo: "Día completo", fecha: "14 nov" },
  { id: "domingo", label: "Domingo", num: "15", subtitulo: "Cierre y cosecha", fecha: "15 nov" },
];

const ACTIVIDADES = {
  viernes: [
    { hora: "15:00", title: "Apertura oficial",                lugar: "Escenario Principal",    speaker: "Equipo BIORAIZ",          tipo: "Ceremonia" },
    { hora: "16:00", title: "Inauguración del mercado",         lugar: "Pasillo Central",        speaker: "Todos los expositores",   tipo: "Mercado" },
    { hora: "17:00", title: "Charla: Agroecología y futuro",    lugar: "Carpa Sur",              speaker: "Valeria Soto",            tipo: "Charla", destacado: true },
    { hora: "18:00", title: "Taller: Pan de masa madre",        lugar: "Cocina Abierta",         speaker: "Pan de Piedra",           tipo: "Taller" },
    { hora: "19:00", title: "Música en vivo: Pampa Trío",       lugar: "Escenario Principal",    speaker: "Pampa Trío",              tipo: "Música" },
    { hora: "20:00", title: "Cierre del día — degustaciones",   lugar: "Patio de Comidas",       speaker: "Productores invitados",   tipo: "Encuentro" },
  ],
  sabado: [
    { hora: "10:00", title: "Apertura · Café y comunidad",      lugar: "Patio de Entrada",       speaker: "BIORAIZ",                 tipo: "Encuentro" },
    { hora: "10:30", title: "Yoga al sol",                      lugar: "Pradera Norte",          speaker: "Sentidos Yoga",           tipo: "Bienestar" },
    { hora: "11:30", title: "Charla: Cocina sin desperdicio",   lugar: "Cocina Abierta",         speaker: "Marina Ré",               tipo: "Charla", destacado: true },
    { hora: "12:30", title: "Taller infantil: Pinturas de la tierra", lugar: "Zona Brotes",     speaker: "Pequeños Granos",         tipo: "Infantil" },
    { hora: "13:00", title: "Almuerzo · Mercado abierto",       lugar: "Patio de Comidas",       speaker: "Expositores",             tipo: "Mercado" },
    { hora: "15:00", title: "Conversatorio: Ser productor hoy", lugar: "Carpa Sur",              speaker: "5 expositores",           tipo: "Charla" },
    { hora: "16:00", title: "Cata de cervezas patagónicas",     lugar: "Patio Lúpulo",           speaker: "Lúpulo Hermano",          tipo: "Cata" },
    { hora: "17:00", title: "Taller: Fermentos vivos",          lugar: "Cocina Abierta",         speaker: "Raíz Fermentados",        tipo: "Taller", destacado: true },
    { hora: "18:00", title: "Charla: Diseño y materia prima",   lugar: "Carpa Norte",            speaker: "Casa Tierra · Hueco",     tipo: "Charla" },
    { hora: "19:00", title: "Música en vivo: Las Hermanas",     lugar: "Escenario Principal",    speaker: "Las Hermanas",            tipo: "Música" },
    { hora: "20:30", title: "Fogón de cierre",                  lugar: "Pradera Norte",          speaker: "Comunidad BIORAIZ",       tipo: "Encuentro" },
  ],
  domingo: [
    { hora: "10:00", title: "Meditación + caminata",            lugar: "Pradera Norte",          speaker: "Verde Quieto",            tipo: "Bienestar" },
    { hora: "11:00", title: "Cuentos para sembrar",             lugar: "Zona Brotes",            speaker: "Pequeños Granos",         tipo: "Infantil" },
    { hora: "12:00", title: "Taller: Tinción natural de telas", lugar: "Carpa Oeste",            speaker: "Telas Vivas",             tipo: "Taller" },
    { hora: "13:00", title: "Almuerzo de cosecha",              lugar: "Patio de Comidas",       speaker: "Cocina del Valle",        tipo: "Mercado", destacado: true },
    { hora: "15:00", title: "Charla: Comunidad y propósito",    lugar: "Carpa Sur",              speaker: "Diego Marín",             tipo: "Charla" },
    { hora: "16:30", title: "Mesa redonda: ¿Qué viene?",        lugar: "Escenario Principal",    speaker: "Productores + público",   tipo: "Charla" },
    { hora: "18:00", title: "Música en vivo: Coro del Limay",   lugar: "Escenario Principal",    speaker: "Coro del Limay",          tipo: "Música" },
    { hora: "19:30", title: "Cierre: agradecimiento + brindis", lugar: "Pradera Norte",          speaker: "Equipo BIORAIZ",          tipo: "Ceremonia", destacado: true },
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
    name: "Early Bird",
    precio: "$ 4.800",
    precioOrig: "$ 7.200",
    badge: "Hasta el 30 de septiembre",
    color: "ocre",
    incluye: [
      "Entrada general los 3 días",
      "Bolsa de tela BIORAIZ",
      "Descuento en talleres",
      "Newsletter exclusiva con avances",
    ],
  },
  {
    id: "general",
    name: "General",
    precio: "$ 7.200",
    badge: "Acceso completo",
    color: "verde",
    incluye: [
      "Entrada general los 3 días",
      "Acceso libre a todas las charlas",
      "Mapa físico y programa impreso",
    ],
    destacado: true,
  },
  {
    id: "familia",
    name: "Familia",
    precio: "$ 14.400",
    badge: "2 adultos + 2 menores",
    color: "tierra",
    incluye: [
      "Entrada para 2 adultos los 3 días",
      "Entrada para 2 niños (hasta 12 años)",
      "Workshop infantil garantizado",
      "Snack ecológico de bienvenida",
    ],
  },
];

const FAQ = [
  { q: "¿Es apto para mascotas?", a: "Sí. Las mascotas son bienvenidas con correa y agua. El evento es al aire libre, hay sombra y bebederos. Pedimos cuidar el espacio común." },
  { q: "¿Hay accesibilidad para sillas de ruedas?", a: "Sí. Los caminos centrales están adaptados, hay baños accesibles y un punto de información con personal para acompañar. Si necesitás apoyo específico, escribinos antes." },
  { q: "¿Puedo llevar mi propio termo o vajilla?", a: "Por favor. Es parte de los compromisos de la edición: minimizar descartables. En el ingreso hay bebederos para recargar." },
  { q: "¿Hay estacionamiento?", a: "Limitado. Recomendamos transporte público, bicicleta o llegar caminando. Hay bicicletero señalizado en el ingreso y combis desde el centro de Neuquén." },
  { q: "¿Se devuelve el dinero si llueve?", a: "El evento se hace con lluvia. Solo se suspende por alerta meteorológica oficial — en ese caso, las entradas son válidas para una fecha de reposición o se reintegran." },
  { q: "¿Puedo pagar en cuotas?", a: "Sí, hasta 3 cuotas sin interés con tarjetas seleccionadas. También aceptamos transferencia y efectivo en puntos de venta físicos." },
];

// ── Prensa ─────────────────────────────────────────────────────
const PRENSA_NOTAS = [
  { medio: "La Tinta",       fecha: "Octubre 2025", title: "BIORAIZ: la feria que cambió el sur",                 url: "#" },
  { medio: "Río Negro",      fecha: "Octubre 2025", title: "Más de 20.000 personas en la cuarta edición",           url: "#" },
  { medio: "Revista Anfibia", fecha: "Sept 2025",   title: "Qué se cocina en BIORAIZ — y por qué importa",          url: "#" },
  { medio: "Página/12",      fecha: "Agosto 2025",  title: "Productores patagónicos arman comunidad en Neuquén",    url: "#" },
  { medio: "La Nación",      fecha: "Mayo 2025",    title: "Una feria sustentable que no es solo mercado",          url: "#" },
  { medio: "Clarín Rural",   fecha: "Marzo 2025",   title: "BIORAIZ planifica su edición más ambiciosa",            url: "#" },
];

// ── Valores ─────────────────────────────────────────────────────
const VALORES = [
  { icon: "raíz",     title: "Origen",      desc: "Cada expositor explica de dónde viene su materia prima y cómo se produce. Sin esto, no hay feria." },
  { icon: "círculo",  title: "Circularidad", desc: "Lo que entra al evento, sale o se transforma. Compost, vajilla reusable, materiales que vuelven a la tierra." },
  { icon: "ola",      title: "Pausa",       desc: "La feria no apura. Programa que respira, espacios para sentarse y aire entre cada actividad." },
  { icon: "trama",    title: "Comunidad",   desc: "BIORAIZ no es un evento que se 'consume', es un espacio que se construye. Los expositores, el público y el equipo son parte." },
  { icon: "brote",    title: "Crecimiento", desc: "Cada edición intentamos algo nuevo, medimos qué funcionó y publicamos los datos. La transparencia es parte de la sustentabilidad." },
];

const NUMEROS = [
  { value: 80,   suffix: "+", label: "expositores seleccionados" },
  { value: 24,   suffix: "k", label: "personas en la última edición" },
  { value: 4,    suffix: "",  label: "ediciones recorridas" },
  { value: 92,   suffix: "%", label: "residuos clasificados y procesados" },
];

const COMPROMISOS = [
  { title: "0 plásticos descartables",   desc: "Vajilla reutilizable o compostable. Reembolso por traer la tuya." },
  { title: "100% energía limpia",         desc: "Generación solar para el escenario principal y la cocina abierta." },
  { title: "Compost in situ",             desc: "Toda materia orgánica se procesa en el predio y vuelve a huertas escolares." },
  { title: "Transporte compartido",       desc: "Combis subsidiadas desde el centro de Neuquén durante los 3 días." },
  { title: "Materiales locales",          desc: "Toda señalética y mobiliario armado con maderas y telas regionales." },
];

const EQUIPO = [
  { name: "Carla Reinoso",   rol: "Dirección general" },
  { name: "Mauro Pereyra",   rol: "Producción y operaciones" },
  { name: "Lucía Antún",     rol: "Curaduría de expositores" },
  { name: "Tomás Aguirre",   rol: "Programa y contenidos" },
  { name: "Inés Bermúdez",   rol: "Sustentabilidad" },
  { name: "Joaquín Páez",    rol: "Comunicación y prensa" },
];

// Expose to window so other scripts can use it
Object.assign(window, {
  BZ_DATE, BZ_DATE_FULL, BZ_LOCATION,
  CATEGORIES, EXPOSITORES, DIAS, ACTIVIDADES, SPEAKERS,
  TICKETS, FAQ, PRENSA_NOTAS, VALORES, NUMEROS, COMPROMISOS, EQUIPO,
});
