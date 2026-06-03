// Cambiá a true cuando las entradas estén disponibles para la venta
export const VENTA_ACTIVA = false;

export const BZ_DATE = "13 · 14 · 15 nov 2026";
export const BZ_DATE_FULL = "13, 14 y 15 de noviembre, 2026";
export const BZ_LOCATION = "Las Cortaderas · Neuquén";
export const BZ_EMAIL = "hola@bioraiz.net";
export const BZ_WHATSAPP_LABEL = "+54 9 2995781006";
export const BZ_WHATSAPP_LINK = "https://wa.me/5492995781006";
export const BZ_INSTAGRAM = "https://www.instagram.com/bioraiz.nqn/";
export const BZ_FACEBOOK = "https://www.facebook.com/people/Bioraiz/61590140866075/";

export const NAV_LINKS = [
  { id: "home",        label: "Inicio" },
  { id: "feria",       label: "La Feria" },
  { id: "expositores", label: "Expositores" },
  { id: "programa",    label: "Programa" },
  { id: "entradas",    label: "Entradas" },
  { id: "participa",   label: "Participá" },
];

export const ECO_PHRASES = [
  "Esta página se carga con menos de 200 kb. La sustentabilidad también es digital.",
  "Cada link visitado consume menos que un mate. Pero igual, andá despacio.",
  "Tipografía cargada una sola vez. El resto, te lo regala el navegador.",
  "Sin trackers, sin pop-ups, sin oscuridad. Solo BIORAIZ.",
];

export const CATEGORIAS_STANDS = [
  { id: "alimentos", label: "Alimentación", stands: 43, desc: "Productores de alimentos con origen verificable." },
  { id: "cosmetica", label: "Cosmética",    stands: 32, desc: "Cosmética natural y cuidado consciente." },
  { id: "diseno",    label: "Diseño",       stands: 40, desc: "Objetos y textiles hechos a mano." },
  { id: "bienestar", label: "Bienestar",    stands: 35, desc: "Prácticas, tisanas y herramientas para frenar." },
  { id: "infantil",  label: "Infantil",     stands: 28, desc: "Juego, tierra y aprendizaje para los más chicos." },
  { id: "gastro",    label: "Gastronomía",  stands: 42, desc: "Cocina de estación, fermentos y dulces con historia." },
];

export const DIA_BLOQUES = [
  { num: "13", dia: "Viernes", sub: "Apertura",          tags: ["Apertura", "Mercado", "Charla inaugural", "Música en vivo"] },
  { num: "14", dia: "Sábado",  sub: "Día completo",      tags: ["Talleres", "Cocina abierta", "Zona Brotes", "Conversatorio", "Escenario Principal"] },
  { num: "15", dia: "Domingo", sub: "Cierre y cosecha",  tags: ["Bienestar", "Infantil", "Mesa redonda", "Cierre musical"] },
];

export const TIPOS_ACTIVIDAD = [
  { tipo: "Mercado",     desc: "Recorrer los stands y conversar con quien hizo lo que comprás." },
  { tipo: "Charlas",     desc: "Conversaciones sobre origen, oficio y futuro, con tiempo para preguntar." },
  { tipo: "Talleres",    desc: "Aprender haciendo: cocina, tierra, textil y manos a la obra." },
  { tipo: "Música",      desc: "Música en vivo en el escenario principal, hasta el fogón de cierre." },
  { tipo: "Bienestar",   desc: "Movimiento, respiración y pausa en la Pradera, con respiro." },
  { tipo: "Zona Brotes", desc: "Talleres de tierra y semillas pensados para los más chicos." },
];

export const ZONAS = [
  { name: "Mercado de Productores", desc: "Conversar con quien hizo lo que comprás." },
  { name: "Cocina Abierta",         desc: "Fuego, fermentos y recetas que no están en ningún libro." },
  { name: "Escenario Principal",    desc: "Música en vivo los tres días. Cierre con fogón." },
  { name: "Zona Brotes",            desc: "Talleres de tierra y semillas para los más chicos." },
  { name: "Pradera",                desc: "Movimiento, bienestar y charlas con respiro. De mediodía al atardecer." },
];

export const CATEGORIES = [
  { id: "all",        label: "Todos",         color: "var(--bz-verde-profundo)" },
  { id: "alimentos",  label: "Alimentación",  color: "var(--bz-verde-bosque)" },
  { id: "cosmetica",  label: "Cosmética",     color: "var(--bz-tierra-rojo)" },
  { id: "diseno",     label: "Diseño",        color: "var(--bz-ocre-tostado)" },
  { id: "bienestar",  label: "Bienestar",     color: "var(--bz-verde-musgo)" },
  { id: "infantil",   label: "Infantil",      color: "var(--bz-tierra-claro)" },
  { id: "gastro",     label: "Gastronomía",   color: "var(--bz-verde-profundo)" },
];

export const DIAS = [
  { id: "viernes", label: "Viernes", num: "13", subtitulo: "Apertura", fecha: "13 nov" },
  { id: "sabado",  label: "Sábado",  num: "14", subtitulo: "Día completo", fecha: "14 nov" },
  { id: "domingo", label: "Domingo", num: "15", subtitulo: "Cierre y cosecha", fecha: "15 nov" },
];

export const TICKETS = [
  {
    id: "raices-early",
    name: "Raíces",
    precio: "$ 18.250",
    precioOrig: "$ 25.000",
    precioNum: 18250,
    descuento: "−27%",
    unidad: "por día",
    badge: "Raíces · Early Bird",
    color: "ocre",
    earlyBird: true,
    incluye: [
      "Acceso general 1 día a elección (viernes, sábado o domingo)",
      "Ingreso desde apertura de puertas (12:00 hs)",
      "Acceso a todos los escenarios principales y feria de emprendimientos",
      "Zona wellness: acceso libre (sin sesiones reservadas)",
    ],
  },
  {
    id: "bosque-early",
    name: "Bosque",
    precio: "$ 58.400",
    precioOrig: "$ 80.000",
    precioNum: 58400,
    descuento: "−27%",
    unidad: "por día",
    badge: "Bosque · Early Bird",
    color: "tierra",
    earlyBird: true,
    incluye: [
      "Acceso VIP · 1 día a elección",
      "Kit de bienvenida: botella de acero inoxidable + snack orgánico + bandana",
      "Baños VIP exclusivos (menor espera, mejor mantenimiento)",
      "Incluye consumición",
    ],
  },
  {
    id: "raices",
    name: "Raíces",
    precio: "$ 25.000",
    precioNum: 25000,
    unidad: "por día",
    badge: "Raíces · General",
    color: "verde",
    destacado: true,
    incluye: [
      "Acceso general 1 día a elección (viernes, sábado o domingo)",
      "Ingreso desde apertura de puertas (12:00 hs)",
      "Acceso a todos los escenarios principales y feria de emprendimientos",
      "Zona wellness: acceso libre (sin sesiones reservadas)",
    ],
  },
  {
    id: "bosque",
    name: "Bosque",
    precio: "$ 80.000",
    precioNum: 80000,
    unidad: "por día",
    badge: "Bosque · VIP",
    color: "tierra",
    incluye: [
      "Acceso VIP · 1 día",
      "Kit de bienvenida: botella de acero inoxidable + snack orgánico + bandana",
      "Baños VIP exclusivos (menor espera, mejor mantenimiento)",
      "Incluye consumición",
    ],
  },
];

export const FAQ = [
  { q: "¿Puedo ir con mi mascota?", a: "El evento no admite mascotas. Por el bienestar de los animales, la cantidad de público y la comida al aire libre, te pedimos dejarlas en casa. Gracias por entenderlo." },
  { q: "¿Hay accesibilidad para sillas de ruedas?", a: "Sí. Los caminos centrales están adaptados, hay baños accesibles y un punto de información con personal para acompañar. Si necesitás apoyo específico, escribinos antes." },
  { q: "¿Puedo llevar mi propio termo o vajilla?", a: "Por favor. Es parte de los compromisos de la edición: minimizar descartables. En el ingreso hay bebederos para recargar." },
  { q: "¿Hay estacionamiento?", a: "Limitado. Recomendamos transporte público, bicicleta o llegar caminando. Hay bicicletero señalizado en el ingreso y combis desde el centro de Neuquén." },
  { q: "¿Se devuelve el dinero si llueve?", a: "El evento se hace con lluvia. Solo se suspende por alerta meteorológica oficial — en ese caso, las entradas son válidas para una fecha de reposición o se reintegran." },
];

export const VALORES = [
  { icon: "raíz",     title: "Origen",      desc: "Cada expositor puede contar de dónde viene su materia prima y cómo se produce. Ese es el corazón de la feria." },
  { icon: "círculo",  title: "Circularidad", desc: "Lo que entra al evento, sale o se transforma. Compost, vajilla reusable, materiales que vuelven a la tierra." },
  { icon: "ola",      title: "Pausa",       desc: "La feria no apura. Programa que respira, espacios para sentarse y aire entre cada actividad." },
  { icon: "trama",    title: "Comunidad",   desc: "BIORAIZ es un espacio que se construye entre todos: expositores, público y equipo somos parte." },
  { icon: "brote",    title: "Crecimiento", desc: "Cada edición intentamos algo nuevo, medimos qué funcionó y publicamos los datos. La transparencia es parte de la sustentabilidad." },
];

export const NUMEROS = [
  { value: 3,   suffix: "",  label: "días de feria" },
  { value: 5,   suffix: "",  label: "zonas experienciales" },
  { value: 200, suffix: "+", label: "stands disponibles" },
  { value: 11,  suffix: "h", label: "de actividades por día" },
];

export const COMPROMISOS = [
  { title: "Cero plásticos descartables",  desc: "" },
  { title: "Reducción de huella de CO₂",   desc: "" },
  { title: "Compost en proceso",           desc: "" },
  { title: "Energía más limpia",           desc: "" },
  { title: "Transparencia",               desc: "Al cierre publicamos los datos reales de lo que logramos y lo que no." },
];

export const PRENSA_NOTAS = [
  { medio: "La Tinta",       fecha: "Octubre 2025", title: "BIORAIZ: la feria que cambió el sur",                 url: "#" },
  { medio: "Río Negro",      fecha: "Octubre 2025", title: "Más de 20.000 personas en la cuarta edición",           url: "#" },
  { medio: "Revista Anfibia", fecha: "Sept 2025",   title: "Qué se cocina en BIORAIZ — y por qué importa",          url: "#" },
  { medio: "Página/12",      fecha: "Agosto 2025",  title: "Productores patagónicos arman comunidad en Neuquén",    url: "#" },
  { medio: "La Nación",      fecha: "Mayo 2025",    title: "Una feria sustentable que no es solo mercado",          url: "#" },
  { medio: "Clarín Rural",   fecha: "Marzo 2025",   title: "BIORAIZ planifica su edición más ambiciosa",            url: "#" },
];
