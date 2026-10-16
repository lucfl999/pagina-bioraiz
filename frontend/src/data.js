// Cambiá a true cuando las entradas estén disponibles para la venta
export const VENTA_ACTIVA = false;

export const BZ_DATE = "6 · 7 · 8 nov 2026";
export const BZ_DATE_FULL = "6, 7 y 8 de noviembre, 2026";
export const BZ_LOCATION = "Isla 132 · Neuquén Capital";
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
  { num: "6", dia: "Viernes", sub: "Apertura · 16 a 23 h", tags: ["Apertura", "Mercado", "Charla inaugural", "Música en vivo"] },
  { num: "7", dia: "Sábado",  sub: "12 a 23 h",           tags: ["Talleres", "Cocina abierta", "Zona Brotes", "Conversatorio", "Escenario Principal"] },
  { num: "8", dia: "Domingo", sub: "Cierre · 12 a 23 h",  tags: ["Bienestar", "Infantil", "Mesa redonda", "Cierre musical"] },
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

export const EXPOSITORES = [
  { id: 1, name: "La Copería", cat: "gastro", origen: "", desc: "Vinos servidos por copa.", foto: "/expositores/la-coperia.jpg", logo: "/expositores/la-coperia-logo.jpg" },
  { id: 2, name: "Bodega Moschini", cat: "gastro", origen: "", desc: "Bodega & viñedos. Vinos de la Patagonia argentina.", foto: "/expositores/moschini.jpg", logo: "/expositores/moschini-logo.jpg" },
  { id: 3, name: "Cocina Antigua", cat: "alimentos", origen: "", desc: "Conservas y dulces en frasco, como el strudel de manzana.", foto: "/expositores/cocina-antigua.jpg", logo: "/expositores/cocina-antigua-logo.jpg" },
  { id: 4, name: "Lily Maurizio", cat: "alimentos", origen: "", desc: "Chocolates artesanales.", foto: "/expositores/lily-maurizio.jpg", logo: "/expositores/lily-maurizio-logo.jpg" },
  { id: 5, name: "Aconquija", cat: "alimentos", origen: "", desc: "Aceite natural de nuez, hecho con nueces de Catamarca.", foto: "/expositores/aconquija.jpg", logo: "/expositores/aconquija-logo.jpg" },
  { id: 6, name: "La Despensa del Sur", cat: "alimentos", origen: "", desc: "Aceite de oliva virgen extra Aimoliva, de Finca Carbonell.", foto: "/expositores/despensa-del-sur.jpg", logo: "/expositores/despensa-del-sur-logo.jpg" },
  { id: 7, name: "Lina Natural", cat: "cosmetica", origen: "", desc: "Cosmética natural. Crema de rosa mosqueta.", foto: "/expositores/lina-natural.jpg", logo: "/expositores/lina-natural-logo.jpg" },
  { id: 8, name: "KIKA", cat: "bienestar", origen: "", desc: "Velas de ritual de cera de soja, 100% natural.", foto: "/expositores/kika.jpg", logo: null },
  { id: 9, name: "Aromas NM", cat: "bienestar", origen: "", desc: "Ramos de flores secas y aromas.", foto: "/expositores/aromas-nm.jpg", logo: "/expositores/aromas-nm-logo.jpg" },
  { id: 10, name: "Chilca", cat: "diseno", origen: "", desc: "Envoltorios ecológicos.", foto: "/expositores/chilca.jpg", logo: "/expositores/chilca-logo.jpg" },
  { id: 11, name: "Teionna Joyas", cat: "diseno", origen: "", desc: "Joyería artesanal.", foto: "/expositores/teionna.jpg", logo: "/expositores/teionna-logo.jpg" },
  { id: 12, name: "Pintura y Papel", cat: "diseno", origen: "", desc: "Cartapesta & bijouterie.", foto: "/expositores/pintura-y-papel.jpg", logo: "/expositores/pintura-y-papel-logo.jpg" },
  { id: 13, name: "Arte con Pasión", cat: "diseno", origen: "", desc: "Piezas de arte en resina.", foto: "/expositores/arte-con-pasion.jpg", logo: "/expositores/arte-con-pasion-logo.jpg" },
  { id: 14, name: "Lunaria Creative Studio", cat: "diseno", origen: "", desc: "Libretas y encuadernación artesanal.", foto: "/expositores/lunaria.jpg", logo: "/expositores/lunaria-logo.jpg" },
  { id: 15, name: "Luz del Alma", cat: "diseno", origen: "", desc: "Deco & estilo. Cestos de yute y cuerda.", foto: "/expositores/luz-del-alma.jpg", logo: "/expositores/luz-del-alma-logo.jpg" },
  { id: 16, name: "K", cat: "diseno", origen: "", desc: "Mobiliario de cartón.", foto: "/expositores/k-carton.jpg", logo: "/expositores/k-carton-logo.jpg" },
];

export const DIAS = [
  { id: "viernes", label: "Viernes", num: "6", subtitulo: "Apertura · 16 a 23 h", fecha: "6 nov" },
  { id: "sabado",  label: "Sábado",  num: "7", subtitulo: "12 a 23 h", fecha: "7 nov" },
  { id: "domingo", label: "Domingo", num: "8", subtitulo: "Cierre · 12 a 23 h", fecha: "8 nov" },
];

export const TICKETS = [
  {
    id: "raices-early",
    name: "Raíces",
    precio: "A Confirmar",
    unidad: "por día",
    badge: "Raíces · Early Bird",
    color: "ocre",
    earlyBird: true,
    incluye: [
      "Acceso general 1 día a elección (viernes, sábado o domingo)",
      "Ingreso el viernes desde las 16:00 hs; sábado y domingo desde las 12:00 hs",
      "Acceso a todos los escenarios principales y feria de emprendimientos",
      "Zona wellness: acceso libre",
    ],
  },
  {
    id: "bosque-early",
    name: "Bosque",
    precio: "A Confirmar",
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
    precio: "A Confirmar",
    unidad: "por día",
    badge: "Raíces · General",
    color: "verde",
    destacado: true,
    incluye: [
      "Acceso general 1 día a elección (viernes, sábado o domingo)",
      "Ingreso el viernes desde las 16:00 hs; sábado y domingo desde las 12:00 hs",
      "Acceso a todos los escenarios principales y feria de emprendimientos",
      "Zona wellness: acceso libre",
    ],
  },
  {
    id: "bosque",
    name: "Bosque",
    precio: "A Confirmar",
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

export const SPONSOR_TIERS = [
  {
    id: "raiz-eterna",
    nombre: "Raíz Eterna",
    verbo: "Co-crean BIORAIZ",
    sponsors: [
      { nombre: "Bosquear", logo: null },
      { nombre: "Nissan AIKA Neuquén - Río Negro", logo: "/sponsors/nissan.png" },
    ],
  },
  {
    id: "raiz",
    nombre: "Raíz",
    verbo: "Acompañan BIORAIZ",
    sponsors: [
      { nombre: "Gobierno de la Provincia del Neuquén", logo: "/sponsors/gobierno.png", filter: "brightness(0.32)" },
      { nombre: "Neuquén Capital", logo: "/sponsors/muni.png" },
      { nombre: "Ferracioli", logo: "/sponsors/ferracioli.png" },
      { nombre: "Sagrada Madre Incense", logo: "/sponsors/sagrada.png" },
      { nombre: "Deco Klart", logo: "/sponsors/decoklart.png" },
      { nombre: "Liberbox Logística", logo: "/sponsors/liberbox.png", full: true, bg: "#FF8A2B" },
    ],
  },
];
