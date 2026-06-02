// ─── BIORAIZ — Participá · Schemas de formularios ─────────────────
// Transcripción fiel de los 5 formularios reales (Gastronómicos,
// Artistas, Speakers, Facilitadores, Prensa) + 2 placeholder
// (Feriantes y Sponsors, sin form real provisto todavía).
//
// Schema de un formulario:
//   { pills:[...], note:"… **negrita** …", submitNote:"…",
//     sections:[ { num, label, title, desc, items:[ item, … ] } ] }
// Un `item` es un campo, o { row:[campo, campo] } para fila de 2 cols.
// Campo: { name, label, type, required?, placeholder?, hint?, rows?, options? }
//   type: text | email | tel | url | textarea | select | radio | checkbox
//   options: ["texto", …]  ó  [{ t:"texto", s:"subtexto" }, …] (radio/checkbox)

const FORM_SCHEMAS = {

  // ── FERIANTES (placeholder — sin form real provisto) ───────────
  feriantes: {
    pills: ["~90 stands", "50.000 asistentes", "8 categorías", "Cierre 31 ago", "Early bird −15% hasta 31/07"],
    note: "**Antes de completar:** El cupo es limitado a 90 stands seleccionados por curaduría. Se prioriza origen patagónico o regional. Las postulaciones cierran el **31 de agosto de 2026** y los seleccionados son notificados el **15 de septiembre**. El pago confirma el lugar solo tras la notificación oficial.",
    submitNote: "**¿Qué pasa después?** Evaluamos todas las postulaciones con una matriz de puntuación y notificamos a los seleccionados antes del 15 de septiembre de 2026. Las postulaciones cierran el 31 de agosto. El pago confirma el lugar solo tras la notificación oficial — no antes.",
    sections: [
      {
        num: "01", label: "Datos del emprendimiento", title: "¿Quiénes son?",
        desc: "Información básica del emprendimiento que postula.",
        items: [
          { row: [
            { name: "emprendimiento", label: "Nombre del emprendimiento", type: "text", required: true, placeholder: "Ej: Brotes del Sur" },
            { name: "responsable", label: "Nombre del responsable", type: "text", required: true, placeholder: "Nombre y apellido" },
          ]},
          { row: [
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@correo.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 299 000-0000" },
          ]},
          { row: [
            { name: "localidad", label: "Localidad / ciudad", type: "text", required: true, placeholder: "Ej: Neuquén capital" },
            { name: "instagram", label: "Instagram o web", type: "text", placeholder: "@nombre o https://..." },
          ]},
        ],
      },
      {
        num: "02", label: "La propuesta", title: "¿Qué ofrecés?",
        desc: "La propuesta y la coherencia con el espíritu del festival son el criterio central de selección.",
        items: [
          { name: "categoria", label: "Categoría principal", type: "select", required: true, options: ["Bienestar y salud holística", "Cosmética natural y skincare eco", "Moda, indumentaria y accesorios sustentables", "Arte y artesanías de autor", "Hogar y jardín sustentable", "Tecnología verde y economía circular", "Editorial, libros y formación consciente", "Otra (describila en la siguiente pregunta)"] },
          { name: "descripcion", label: "Descripción del emprendimiento", type: "textarea", required: true, rows: 4, placeholder: "¿Qué ofrecés? ¿Cómo lo producís? ¿Qué lo hace diferente? En no más de 150 palabras, contanos la historia detrás de lo que hacés.", hint: "Máximo 150 palabras. Sé específico/a: esto es lo que lee el jurado para decidir si tu propuesta encaja." },
          { name: "antiguedad", label: "¿Hace cuánto tiempo existe el emprendimiento?", type: "text", required: true, placeholder: "Ej: Desde marzo 2022 — 4 años de actividad", hint: "Incluí un link a tu tienda online, Instagram o web como respaldo de trayectoria." },
          { name: "referencia", label: "Link de referencia (tienda, Instagram, web)", type: "text", placeholder: "https://... o @usuario" },
        ],
      },
      {
        num: "03", label: "Tamaño de stand", title: "¿Cuánto espacio necesitás?",
        desc: "Elegí el tamaño que mejor se adapta a tu propuesta. Early bird con 15% de descuento hasta el 31 de julio de 2026.",
        items: [
          { name: "stand", label: "Tamaño solicitado", type: "radio", required: true, options: [
            { t: "Micro · 6 m² — USD 380 (early bird USD 323)", s: "3×2 m · Ideal para cosmética, libros, accesorios o propuestas compactas." },
            { t: "Estándar · 9 m² — USD 560 (early bird USD 476) · + elegido", s: "3×3 m · El más elegido. Espacio para exhibir con comodidad y atender bien." },
            { t: "Grande · 12 m² — USD 780 (early bird USD 663)", s: "3×4 m · Para propuestas con mucho producto o que ofrecen experiencia en el stand." },
            { t: "Premium · 20 m² — USD 1.300 (early bird USD 1.105)", s: "4×5 m · Ubicación destacada en acceso o zona central. Cupo: 5 stands." },
          ], hint: "El stand incluye: espacio señalizado, acceso a electricidad (800W estándar), 2 acreditaciones de feriante por día, mención en redes y catálogo digital oficial." },
          { name: "electricos", label: "Requerimientos eléctricos especiales", type: "textarea", rows: 2, placeholder: "¿Qué equipos necesitás conectar? Indicá el consumo en watts si lo sabés. Ej: 1 iluminación LED (100W), 1 tablet para pagos (25W). El límite estándar es 800W.", hint: "Quienes necesiten más de 800W deben solicitarlo antes del 15 de octubre. Se abona por separado." },
        ],
      },
      {
        num: "04", label: "Experiencia y logística", title: "¿Podés operar a escala de festival masivo?",
        desc: "BIORAIZ espera 15.000–17.000 personas por día. Necesitamos saber que podés abastecer ese flujo.",
        items: [
          { name: "exp_feria", label: "¿Participaste de otros festivales o ferias de gran escala?", type: "radio", required: true, options: [
            { t: "Sí, en eventos masivos (más de 10.000 personas)", s: "Nombralos en el siguiente campo" },
            { t: "Sí, en ferias o mercados medianos (hasta 10.000 personas)" },
            { t: "Solo en mercados locales o eventos pequeños" },
            { t: "Es mi primera participación en un evento externo" },
          ] },
          { name: "eventos", label: "¿En qué eventos participaste? ¿Cómo fue la experiencia?", type: "textarea", rows: 3, placeholder: "Nombrá los eventos, contanos cómo fue en términos de logística, volumen de ventas y organización del stand." },
          { name: "experiencia_stand", label: "Propuesta de experiencia en el stand", type: "textarea", required: true, rows: 3, placeholder: "¿Cómo vas a presentar tu espacio? ¿Ofrecés degustaciones, demos, actividades o algo que genere experiencia más allá de la venta? Describí cómo imaginás tu stand.", hint: "Los stands que proponen experiencias (no solo venta) tienen mayor puntaje en el proceso de selección." },
        ],
      },
      {
        num: "05", label: "Sustentabilidad", title: "Requisitos del festival",
        desc: "BIORAIZ tiene estándares de sustentabilidad no negociables. Queremos saber qué prácticas reales tiene tu emprendimiento.",
        items: [
          { name: "practicas", label: "Prácticas sustentables concretas de tu emprendimiento", type: "textarea", required: true, rows: 3, placeholder: "Contanos al menos 2 prácticas reales: packaging reciclable o compostable, producción sin residuos, ingredientes agroecológicos, comercio justo, materiales recuperados, cero plástico, etc.", hint: "No basta con declararlo — describí acciones concretas que puedas demostrar." },
          { name: "plastico", label: "¿Confirmás que operarás sin plástico descartable de un solo uso?", type: "radio", required: true, options: ["Sí, ya trabajo sin plástico descartable", "Sí, puedo adecuarme para el festival", "Necesito más información sobre los requisitos"] },
          { name: "habilitaciones", label: "Habilitaciones vigentes", type: "checkbox", options: ["CUIT / CUIL activo en AFIP", "Habilitación municipal de emprendimiento o local", "SENASA (si vendés productos alimenticios elaborados)", "Certificación orgánica o agroecológica", "Registro de marca", "Seguro de responsabilidad civil"], hint: "Las habilitaciones se verifican en el check-in del día de armado. Sin documentación en regla, el stand no puede abrir." },
        ],
      },
      {
        num: "06", label: "Motivación", title: "¿Por qué BIORAIZ?",
        desc: "La última pregunta, y una de las más importantes para el jurado.",
        items: [
          { name: "motivacion", label: "¿Por qué querés estar en BIORAIZ?", type: "textarea", required: true, rows: 3, placeholder: "En no más de 100 palabras: ¿qué significa este festival para tu proyecto? ¿Qué esperás lograr participando?" },
          { name: "adicional", label: "Información adicional o preguntas", type: "textarea", rows: 2, placeholder: "Cualquier cosa que quieras contarnos o preguntarnos." },
        ],
      },
    ],
  },

  // ── GASTRONÓMICOS (real) ───────────────────────────────────────
  gastronomicos: {
    pills: ["38–45 puestos", "0% comisión", "50.000 asistentes", "Cierre 31 ago"],
    note: "**Antes de completar:** El cupo es limitado a 38–45 puestos seleccionados por curaduría. Se acepta máximo 1 puesto por sub-rubro. Las postulaciones cierran el **31 de agosto de 2026** y los seleccionados son notificados el 10 de septiembre.",
    submitNote: "**¿Qué pasa después?** Revisamos tu postulación y te avisamos antes del 10 de septiembre de 2026. Las postulaciones cierran el 31 de agosto.",
    sections: [
      {
        num: "01", label: "Datos del emprendimiento", title: "¿Quiénes son?",
        desc: "Información básica del emprendimiento o restaurante que postula.",
        items: [
          { row: [
            { name: "emprendimiento", label: "Nombre del emprendimiento / local", type: "text", required: true, placeholder: "Ej: La Raíz Cocina Natural" },
            { name: "responsable", label: "Nombre del responsable", type: "text", required: true, placeholder: "Nombre y apellido" },
          ]},
          { row: [
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@correo.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 299 000-0000" },
          ]},
          { row: [
            { name: "redes", label: "Instagram o web", type: "text", placeholder: "@nombre o https://..." },
            { name: "localidad", label: "Localidad / ciudad", type: "text", placeholder: "Ej: Neuquén capital" },
          ]},
        ],
      },
      {
        num: "02", label: "La propuesta gastronómica", title: "¿Qué ofrecés?",
        desc: "Contanos en detalle qué vas a ofrecer en el festival. La propuesta culinaria es el criterio central de selección.",
        items: [
          { name: "descripcion", label: "Descripción de tu propuesta gastronómica", type: "textarea", required: true, rows: 4, placeholder: "¿Qué cocinás? ¿Con qué ingredientes? ¿Cuál es tu diferencial? Contanos la historia detrás de lo que hacés." },
          { name: "categoria", label: "Categoría principal", type: "select", required: true, options: ["Comida saludable rápida (bowls, wraps, sándwiches)", "Gastronomía bio / plato elaborado", "100% vegano / vegetariano", "Bebidas saludables (jugos, smoothies, kombucha)", "Snacks y barras naturales", "Repostería sin TACC / raw food", "Panadería artesanal", "Cocina regional patagónica consciente"] },
          { name: "menu", label: "Menú tentativo con precios aproximados", type: "textarea", required: true, rows: 4, placeholder: "Listá los 4 a 8 ítems principales que ofrecerías con su precio orientativo en pesos (valores noviembre 2026).", hint: "No tiene que ser definitivo. Necesitamos entender el rango de precios y la diversidad del menú." },
          { name: "local_ing", label: "¿Qué porcentaje de tus ingredientes son de origen local o patagónico?", type: "radio", required: true, options: ["Más del 80% — casi todo es local o patagónico", "Entre 50% y 80% — la mayoría es local", "Entre 20% y 50% — algunos ingredientes locales", "Menos del 20% — principalmente ingredientes de otra procedencia"] },
          { name: "dietas", label: "Opciones para dietas especiales que ofrecés", type: "checkbox", options: ["Sin TACC (sin gluten)", "Sin lactosa", "100% vegano", "Sin azúcar añadida / apto diabéticos", "Keto / bajo en carbohidratos", "No ofrezco opciones especiales"] },
        ],
      },
      {
        num: "03", label: "Tamaño y logística", title: "Stand y operación",
        desc: "Necesitamos saber qué espacio necesitás y si podés operar a escala de festival masivo.",
        items: [
          { name: "tamano", label: "Tamaño de puesto solicitado", type: "radio", required: true, options: ["Snackería / bebidas — 2×3 m (6 m²) · $450.000", "Estándar — 3×5 m (15 m²) · $750.000", "Premium — 4×6 m (24 m²) · $1.200.000"] },
          { name: "exp", label: "¿Tenés experiencia operando en festivales o ferias de alta demanda?", type: "radio", options: ["Sí, operé en eventos masivos (más de 5.000 personas/día)", "Sí, en ferias o eventos medianos (hasta 5.000 personas)", "Solo en eventos pequeños o mercados locales", "Es mi primera participación en un evento externo"] },
          { name: "electricos", label: "Requerimientos eléctricos (equipos que necesitás conectar)", type: "textarea", rows: 2, placeholder: "Ej: 1 heladera comercial (300W), 1 plancha eléctrica (2kW), 1 licuadora (500W), iluminación (200W). Total estimado: 3kW", hint: "Incluí el consumo estimado en watts si lo sabés. El límite del puesto estándar es 15kW trifásico." },
        ],
      },
      {
        num: "04", label: "Sustentabilidad y documentación", title: "Requisitos del festival",
        desc: "BIORAIZ tiene estándares de sustentabilidad no negociables. Confirmá que podés cumplirlos.",
        items: [
          { name: "plastico", label: "¿Confirmás que operarás con packaging 100% libre de plástico de un solo uso?", type: "radio", required: true, options: ["Sí, ya trabajo con packaging compostable o reutilizable", "Sí, puedo adecuarme para el festival", "No estoy seguro/a — necesito más información"] },
          { name: "habilitaciones", label: "Habilitaciones que tenés vigentes", type: "checkbox", options: ["Habilitación municipal de local o emprendimiento gastronómico", "SENASA (para productos elaborados)", "Carnet sanitario de manipulación de alimentos (propio y equipo)", "CUIT / CUIL activo en AFIP", "Seguro de responsabilidad civil"], hint: "Las habilitaciones se verifican durante el check-in del día de armado. Sin documentación en regla, el puesto no abre." },
          { name: "adicional", label: "Información adicional o preguntas", type: "textarea", rows: 2, placeholder: "Cualquier cosa que quieras contarnos o preguntarnos antes de la llamada." },
        ],
      },
    ],
  },

  // ── ARTISTAS (real) ────────────────────────────────────────────
  artistas: {
    pills: ["3 escenarios", "Slots reservados", "Prioritario regional", "Cierre 31 ago"],
    note: "**Esta convocatoria es para artistas locales y emergentes patagónicos.** Los headliners y mid-level nacionales son contactados directamente por el equipo de booking. Si tu proyecto es de otra región de Argentina y creés que encajás, podés postularte igual — se evalúa caso a caso. Notificamos antes del **15 de septiembre**.",
    submitNote: "**¿Qué pasa después?** Evaluamos todas las postulaciones y avisamos antes del 15 de septiembre de 2026. La convocatoria cierra el 31 de agosto. Los slots son limitados y la selección es por coherencia artística con el festival.",
    sections: [
      {
        num: "01", label: "Datos del proyecto artístico", title: "¿Quiénes son?",
        desc: "Información del proyecto o artista que postula. Si es una banda o proyecto grupal, completá con los datos del representante.",
        items: [
          { row: [
            { name: "proyecto", label: "Nombre del proyecto / artista", type: "text", required: true, placeholder: "Nombre tal como aparecerá en la grilla" },
            { name: "representante", label: "Nombre del representante o contacto", type: "text", required: true, placeholder: "Nombre y apellido" },
          ]},
          { row: [
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@correo.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 000 000-0000" },
          ]},
          { row: [
            { name: "ciudad", label: "Ciudad / localidad", type: "text", required: true, placeholder: "Ej: Neuquén capital, Bariloche, Junín de los Andes" },
            { name: "redes", label: "Instagram o Spotify / Bandcamp", type: "text", placeholder: "@nombre o link a plataforma" },
          ]},
          { name: "integrantes", label: "¿Cuántos integrantes tiene el proyecto?", type: "select", options: ["Solista", "Dúo", "Trío", "4 a 6 integrantes", "Más de 6 integrantes", "DJ / proyecto electrónico"] },
        ],
      },
      {
        num: "02", label: "La propuesta artística", title: "¿Qué hacen?",
        desc: "La propuesta musical y su coherencia con el universo de BIORAIZ son el criterio central de selección.",
        items: [
          { name: "descripcion", label: "Descripción del proyecto en no más de 150 palabras", type: "textarea", required: true, rows: 4, placeholder: "¿Cómo suena? ¿Qué historia hay detrás? ¿De dónde viene la influencia musical? Contanos en tus palabras, sin texto de prensa." },
          { name: "genero", label: "Género / estilo principal", type: "select", required: true, options: ["Folk / cantautor/a", "Indie / rock alternativo", "Folk andino / world music patagónica", "Electrónica orgánica / downtempo", "Ambient / música experimental", "Pop consciente / pop alternativo", "Jazz / bossa nova / música de cámara", "Música de raíz latinoamericana", "Fusión / inclasificable", "DJ set (electrónica de baja-media intensidad)", "Música ceremonial / sagrada"] },
          { name: "material", label: "Link a material para escuchar — Spotify, YouTube, SoundCloud o similar", type: "url", required: true, placeholder: "https://open.spotify.com/... o https://youtu.be/...", hint: "Es el criterio más importante del proceso de selección. Si no tenés grabaciones, dejá un link a un video en vivo." },
          { name: "encaje", label: "¿Por qué tu propuesta encaja en BIORAIZ?", type: "textarea", rows: 3, placeholder: "¿Qué tienen en común tu música y el espíritu del festival? ¿Por qué este público es el que querés frente a vos?" },
        ],
      },
      {
        num: "03", label: "Escenario y rider", title: "Aspectos técnicos",
        desc: "Información técnica para evaluar la viabilidad del slot.",
        items: [
          { name: "escenario", label: "Escenario de preferencia", type: "radio", required: true, options: [
            { t: 'Escenario Principal "El Claro" — 8.000 personas, producción full', s: "Para propuestas con mayor convocatoria regional" },
            { t: 'Escenario "El Monte" — 1.500 personas, formato íntimo/folk', s: "Ideal para propuestas acústicas, folk, ambient o experimentales" },
            { t: "Domo Sonoro — 150 personas, experiencia inmersiva", s: "Para DJs ambient, downtempo, soundbath o propuestas sensoriales" },
            { t: "Sin preferencia — que el equipo asigne según la grilla" },
          ] },
          { row: [
            { name: "duracion", label: "Duración de set propuesta", type: "select", options: ["30 minutos", "45 minutos", "60 minutos", "75 minutos", "90 minutos o más"] },
            { name: "rider", label: "¿Tenés rider técnico propio?", type: "select", options: ["Sí, tengo rider formal escrito", "Sí, puedo armarlo para el festival", "No, adapto a lo que haya disponible"] },
          ]},
          { name: "tecnica", label: "Requerimientos técnicos básicos", type: "textarea", rows: 2, placeholder: "Ej: Batería completa, 2 amplificadores de guitarra, DI box para bajo, 4 monitores de piso, backline para teclado." },
        ],
      },
      {
        num: "04", label: "Trayectoria y región", title: "Tu contexto",
        desc: "Esta convocatoria prioriza artistas locales y regionales. La identidad patagónica del festival es irrenunciable.",
        items: [
          { name: "antiguedad", label: "¿Hace cuánto existe el proyecto?", type: "radio", required: true, options: ["Menos de 1 año", "1 a 3 años", "3 a 7 años", "Más de 7 años"] },
          { name: "shows", label: "¿Tocaron en vivo recientemente? ¿Dónde?", type: "textarea", rows: 2, placeholder: "Últimos 2 o 3 shows — venue, ciudad y año. Si tienen video de presentación en vivo, incluyan el link." },
          { name: "observaciones", label: "Observaciones o información adicional", type: "textarea", rows: 2, placeholder: "Condiciones de honorario, necesidades especiales de producción, o cualquier cosa que quieran contarnos." },
        ],
      },
    ],
  },

  // ── SPEAKERS (real) ────────────────────────────────────────────
  speakers: {
    pills: ["6–8 charlas/día", "400 personas/charla", "45–60 min/slot", "Cierre 31 ago"],
    note: "**Antes de completar:** BIORAIZ no convoca speakers con posiciones pseudocientíficas verificadas. El proceso de selección valora formación real, propuesta con base sólida y coherencia con el espíritu del festival. Notificamos antes del **15 de septiembre**.",
    submitNote: "**¿Qué pasa después?** Evaluamos la propuesta y te contactamos antes del 15 de septiembre. Las postulaciones cierran el 31 de agosto de 2026.",
    sections: [
      {
        num: "01", label: "Datos del speaker", title: "¿Quién sos?",
        desc: "Información básica de la persona que postula. Si tenés manager o representante, dejá sus datos en observaciones.",
        items: [
          { row: [
            { name: "nombre", label: "Nombre completo", type: "text", required: true, placeholder: "Tu nombre tal como aparecerá en la grilla" },
            { name: "disciplina", label: "Disciplina / área", type: "text", required: true, placeholder: "Ej: Nutricionista funcional, coach de mindfulness" },
          ]},
          { row: [
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@correo.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 000 000-0000" },
          ]},
          { row: [
            { name: "instagram", label: "Instagram principal", type: "text", placeholder: "@tu_perfil" },
            { name: "web", label: "Web o link a charlas previas", type: "url", placeholder: "https://..." },
          ]},
          { name: "seguidores", label: "¿Cuántos seguidores tenés en tu red principal?", type: "select", required: true, options: ["Menos de 5.000", "5.000 – 20.000", "20.000 – 50.000", "50.000 – 200.000", "Más de 200.000", "No tengo redes activas"] },
        ],
      },
      {
        num: "02", label: "La propuesta de charla", title: "¿Qué vas a contar?",
        desc: "La propuesta de contenido es el criterio central. Buscamos perspectivas con base real, lenguaje accesible y relevancia para el público de BIORAIZ.",
        items: [
          { name: "titulo", label: "Título de la charla propuesta", type: "text", required: true, placeholder: "Ej: Microbiota y bienestar mental: lo que tu intestino le dice a tu cerebro" },
          { name: "descripcion", label: "Descripción de la charla (máximo 200 palabras)", type: "textarea", required: true, rows: 5, placeholder: "¿De qué trata? ¿Qué aprende o se lleva el asistente? ¿Por qué este tema es relevante para el público de BIORAIZ?" },
          { name: "tematica", label: "Temática principal", type: "select", required: true, options: ["Nutrición funcional y alimentación consciente", "Mindfulness, meditación y salud mental", "Sustentabilidad y bioeconomía", "Movimiento y cuerpo consciente", "Emprendimiento con propósito", "Crianza consciente y educación activa", "Identidad patagónica y cultura local", "Bienestar holístico e integralidad", "Otra"] },
          { row: [
            { name: "duracion", label: "Duración propuesta", type: "select", options: ["45 minutos", "60 minutos", "90 minutos (taller + charla)"] },
            { name: "practico", label: "¿Tiene componente práctico o participativo?", type: "select", options: ["No, es una charla expositiva", "Sí, tiene dinámicas o ejercicios cortos", "Sí, es principalmente un taller práctico"] },
          ]},
          { name: "equipamiento", label: "¿Necesitás proyector, micrófono u otro equipamiento especial?", type: "textarea", rows: 2, placeholder: "Ej: Presentación en PowerPoint (HDMI), micrófono de solapa, mesa para materiales.", hint: "El escenario tiene sistema de proyección HD y micrófono incluidos. Indicá cualquier requerimiento adicional." },
        ],
      },
      {
        num: "03", label: "Trayectoria y credenciales", title: "Tu respaldo profesional",
        desc: "BIORAIZ no convoca speakers sin formación verificable. La credibilidad del festival depende de la seriedad de su programación.",
        items: [
          { name: "formacion", label: "Formación y credenciales relevantes", type: "textarea", required: true, rows: 3, placeholder: "Títulos, certificaciones, institución de formación y año. Ej: Licenciada en Nutrición (UBA, 2014), Posgrado en Psiconeuroinmunología (UNLaM, 2019)." },
          { name: "exp", label: "¿Diste charlas en eventos públicos anteriormente?", type: "radio", required: true, options: ["Sí, en festivales o eventos de más de 1.000 personas", "Sí, en eventos medianos (hasta 1.000 personas)", "Sí, en workshops, capacitaciones o eventos pequeños", "No, sería mi primera charla en un evento público"] },
          { name: "charla_previa", label: "Link a una charla previa (video, podcast o nota) — opcional", type: "url", placeholder: "https://youtube.com/... o https://spotify.com/...", hint: "Si tenés material de referencia, suma mucho al proceso de selección." },
        ],
      },
      {
        num: "04", label: "Disponibilidad y cierre", title: "Últimos detalles",
        items: [
          { name: "dias", label: "Días de disponibilidad", type: "checkbox", options: ["Jueves 13 de noviembre", "Viernes 14 de noviembre", "Sábado 15 de noviembre", "Cualquier día — sin preferencia"] },
          { name: "honorario", label: "¿Tenés alguna expectativa de honorario o condición particular?", type: "textarea", rows: 2, placeholder: "Opcional. Si tenés un rango en mente, contanos. Si preferís discutirlo en la llamada, dejalo en blanco." },
          { name: "observaciones", label: "Observaciones o información adicional", type: "textarea", rows: 2, placeholder: "Cualquier cosa que quieras agregar, preguntar o aclarar." },
        ],
      },
    ],
  },

  // ── FACILITADORES (real) ───────────────────────────────────────
  facilitadores: {
    pills: ["4–6 sesiones/día", "3 espacios", "150 personas/sesión", "Cierre 31 ago"],
    note: "**Antes de completar:** BIORAIZ exige formación acreditada y verificable en la disciplina propuesta. La credibilidad de la programación depende de la seriedad de sus facilitadores. Notificamos antes del **15 de septiembre**.",
    submitNote: "**¿Qué pasa después?** Revisamos tu postulación y te contactamos antes del 15 de septiembre. Las postulaciones cierran el 31 de agosto de 2026.",
    sections: [
      {
        num: "01", label: "Datos del facilitador/a", title: "¿Quién sos?",
        desc: "Información básica de la persona que postula.",
        items: [
          { row: [
            { name: "nombre", label: "Nombre completo", type: "text", required: true, placeholder: "Tu nombre tal como aparecerá en la grilla" },
            { name: "disciplina", label: "Disciplina", type: "text", required: true, placeholder: "Ej: Profesora de Yoga Vinyasa, Terapeuta de sonido" },
          ]},
          { row: [
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@correo.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 000 000-0000" },
          ]},
          { row: [
            { name: "instagram", label: "Instagram principal", type: "text", placeholder: "@tu_perfil" },
            { name: "web", label: "Web o link de referencia", type: "url", placeholder: "https://..." },
          ]},
        ],
      },
      {
        num: "02", label: "La práctica propuesta", title: "¿Qué vas a facilitar?",
        desc: "Contanos en detalle qué sesión proponés. La propuesta y el espacio tienen que encajar: hay 3 espacios diferenciados.",
        items: [
          { name: "disciplina_sesion", label: "Disciplina y tipo de sesión propuesta", type: "select", required: true, options: ["Yoga Hatha", "Yoga Vinyasa / Flow", "Yoga Yin / Restaurativo", "Yoga Nidra", "Yoga Kundalini", "Yoga para niños y familias", "Meditación guiada", "Mindfulness", "Pranayama / técnicas de respiración", "Respiración Wim Hof / Holotropic", "Soundbath / cuencos tibetanos / gong", "Movimiento consciente / somática", "Danza consciente / Biodanza / Contact", "Tai Chi / Qi Gong", "Reiki / terapia energética", "Activación y movimiento funcional", "Otra disciplina"] },
          { name: "descripcion", label: "Descripción de la sesión propuesta (máximo 150 palabras)", type: "textarea", required: true, rows: 4, placeholder: "¿Cómo es la sesión? ¿Qué nivel requiere? ¿Qué se lleva el participante? ¿Necesita traer algo?" },
          { name: "espacio", label: "Espacio que necesitás", type: "radio", required: true, options: ["Domo de Meditación — cubierto, 150 personas, ideal para prácticas contemplativas e inmersivas", "La Pradera — al aire libre, pasto natural, 80–100 personas, ideal para yoga y movimiento activo", "Sala de Terapias — privado, grupos de hasta 20 personas, ideal para terapias y sesiones individuales", "Cualquiera — sin preferencia, que el equipo asigne"] },
          { row: [
            { name: "duracion", label: "Duración de la sesión", type: "select", options: ["45 minutos", "60 minutos", "75 minutos", "90 minutos"] },
            { name: "nivel", label: "Nivel de la práctica", type: "select", options: ["Apto para todos — sin experiencia previa necesaria", "Principiantes y práctica regular", "Intermedio / practica regular", "Avanzado"] },
          ]},
          { name: "materiales", label: "¿Traés materiales o instrumentos propios?", type: "textarea", rows: 2, placeholder: "Ej: Cuencos tibetanos, gong, mat de yoga propio, aceites esenciales, etc. Si necesitás que el festival provea colchonetas, indicalo." },
        ],
      },
      {
        num: "03", label: "Formación y trayectoria", title: "Tu respaldo profesional",
        desc: "BIORAIZ exige formación verificable. Es la base de la credibilidad de la programación.",
        items: [
          { name: "formacion", label: "Formación acreditada en la disciplina que proponés", type: "textarea", required: true, rows: 3, placeholder: "Ej: Profesora de Yoga certificada 200hs (Yoga Alliance, 2019), formación en Yoga Terapéutico 100hs (Instituto Namaste, 2021)." },
          { name: "exp", label: "Años de experiencia facilitando grupos", type: "radio", required: true, options: ["Menos de 1 año", "1 a 3 años", "3 a 7 años", "Más de 7 años"] },
          { name: "exp_masivo", label: "¿Tenés experiencia facilitando en eventos o festivales con más de 50 personas?", type: "radio", options: ["Sí, en festivales o eventos masivos", "Sí, en retiros o eventos de mediana escala", "Solo clases o grupos pequeños (hasta 20 personas)", "No tengo experiencia en eventos externos aún"] },
          { name: "protocolo", label: "¿Tenés protocolo de seguridad propio para tu práctica?", type: "radio", options: ["Sí, tengo formulario de contraindicaciones y protocolo escrito", "Sí, verbal — lo comunico al inicio de cada sesión", "Mi disciplina no requiere protocolo especial de seguridad"], hint: "Obligatorio para respiración intensa, contacto físico o estados alterados. En esos casos debe presentarse por escrito." },
        ],
      },
      {
        num: "04", label: "Disponibilidad y cierre", title: "Últimos detalles",
        items: [
          { name: "dias", label: "Días de disponibilidad", type: "checkbox", options: ["Jueves 13 de noviembre", "Viernes 14 de noviembre", "Sábado 15 de noviembre", "Cualquier día — sin preferencia"] },
          { name: "observaciones", label: "Observaciones o información adicional", type: "textarea", rows: 2, placeholder: "Requerimientos especiales, condiciones de honorario, preguntas, o cualquier cosa relevante." },
        ],
      },
    ],
  },

  // ── SPONSORS (placeholder — sin form real provisto) ────────────
  sponsors: {
    pills: ["Sponsors", "Canjes", "Institucionales"],
    note: "**Sin formulario real todavía.** Esta es una versión base; cuando nos pases el formulario definitivo de Sponsors / Alianzas lo integramos igual que los demás.",
    submitNote: "**¿Qué pasa después?** Te contacta el equipo comercial para conversar la alianza.",
    sections: [
      {
        num: "01", label: "Tu organización", title: "Contanos quiénes son",
        desc: "Datos de la empresa u organización que quiere sumarse como aliada.",
        items: [
          { row: [
            { name: "organizacion", label: "Empresa / organización", type: "text", required: true, placeholder: "Nombre de la organización" },
            { name: "contacto", label: "Persona de contacto", type: "text", required: true, placeholder: "Nombre y apellido" },
          ]},
          { row: [
            { name: "cargo", label: "Cargo", type: "text", placeholder: "Ej: Marketing, Dirección" },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@empresa.com" },
          ]},
          { row: [
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", placeholder: "+54 9 000 000-0000" },
            { name: "tipo", label: "Tipo de alianza", type: "select", required: true, options: ["Sponsor principal", "Sponsor", "Canje", "Institucional / ONG"] },
          ]},
          { name: "web", label: "Sitio web", type: "url", placeholder: "https://..." },
          { name: "propuesta", label: "Propuesta de colaboración", type: "textarea", rows: 3, placeholder: "Cómo te imaginás la alianza con BIORAIZ…" },
        ],
      },
    ],
  },

  // ── PRENSA (real) ──────────────────────────────────────────────
  prensa: {
    pills: ["Acceso completo", "Zona de prensa", "Backstage coordinado", "Cierre 25 oct"],
    note: "**Antes de completar:** Las acreditaciones son nominales con foto. Se confirman por email antes del **31 de octubre de 2026**. El plazo máximo de solicitud es el 25 de octubre. El acceso a backstage es limitado y se coordina caso a caso con la dirección artística.",
    submitNote: "**¿Qué pasa después?** Confirmamos la acreditación por email antes del 31 de octubre de 2026. Las solicitudes cierran el 25 de octubre.",
    sections: [
      {
        num: "01", label: "Datos del medio", title: "¿Qué medio representás?",
        desc: "Información del medio o plataforma para la que vas a cubrir el festival.",
        items: [
          { row: [
            { name: "medio", label: "Nombre del medio / plataforma", type: "text", required: true, placeholder: "Ej: La Mañana de Neuquén, @miblog, Podcast XYZ" },
            { name: "tipo_medio", label: "Tipo de medio", type: "select", required: true, options: ["Diario o revista digital nacional", "Diario o revista digital regional / patagónica", "Medio impreso", "Portal de bienestar / lifestyle", "Podcast", "Canal de YouTube", "Cuenta de Instagram / TikTok (creador de contenido)", "Agencia de noticias", "Radio o TV", "Freelance (sin medio fijo)"] },
          ]},
          { row: [
            { name: "link_medio", label: "Link al medio o perfil principal", type: "url", placeholder: "https://... o @cuenta" },
            { name: "alcance", label: "Alcance / audiencia estimada", type: "select", options: ["Menos de 5.000 lectores/seguidores", "5.000 – 20.000", "20.000 – 100.000", "100.000 – 500.000", "Más de 500.000"] },
          ]},
        ],
      },
      {
        num: "02", label: "Datos personales del/la periodista", title: "¿Quién viene al festival?",
        desc: "Las acreditaciones son nominales. Completá los datos de cada persona que va a cubrir el evento.",
        items: [
          { row: [
            { name: "nombre", label: "Nombre y apellido", type: "text", required: true, placeholder: "Periodista / creador de contenido principal" },
            { name: "rol", label: "Rol en la cobertura", type: "text", required: true, placeholder: "Ej: Periodista, fotógrafa, videomaker" },
          ]},
          { row: [
            { name: "email", label: "Email de contacto", type: "email", required: true, placeholder: "nombre@medio.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 000 000-0000" },
          ]},
          { name: "equipo", label: "¿Venís con equipo de producción? (fotógrafo, camarógrafo, asistente)", type: "radio", options: ["No, vengo solo/a", "Sí, con 1 persona más", "Sí, con 2 personas más", "Sí, con más de 2 personas (aclarar en observaciones)"], hint: "Cada acreditación adicional debe justificarse. Se coordinan caso a caso." },
        ],
      },
      {
        num: "03", label: "La cobertura planificada", title: "¿Qué vas a publicar?",
        desc: "Necesitamos entender el tipo de cobertura para coordinar accesos y entrevistas con anticipación.",
        items: [
          { name: "tipo_cobertura", label: "Tipo de cobertura planificada", type: "checkbox", required: true, options: ["Nota de prensa escrita (digital o impresa)", "Fotografía editorial", "Video / reels para redes o YouTube", "Transmisión en vivo (streaming)", "Podcast o audio", "Stories / contenido efímero en Instagram o TikTok"] },
          { name: "angulo", label: "Ángulo editorial o enfoque de la cobertura", type: "textarea", rows: 3, placeholder: "Ej: 'Vamos a hacer una nota sobre el impacto económico del festival en la región' o 'Queremos contar la historia de los emprendedores patagónicos que participan'.", hint: "Cuanto más específico, mejor podemos preparar los accesos y facilitarte entrevistas relevantes." },
          { name: "entrevistas", label: "¿Necesitás coordinar entrevistas previas al evento?", type: "radio", options: ["Sí, con el equipo organizador (ZENZZO)", "Sí, con artistas del lineup", "Sí, con speakers o facilitadores", "No, cubro todo durante el evento"] },
        ],
      },
      {
        num: "04", label: "Días y accesos", title: "¿Cuándo venís?",
        items: [
          { name: "dias", label: "Días que vas a cubrir", type: "checkbox", required: true, options: ["Jueves 13 de noviembre", "Viernes 14 de noviembre", "Sábado 15 de noviembre"] },
          { name: "backstage", label: "¿Necesitás acceso a backstage o zona de artistas?", type: "radio", options: ["Sí, es fundamental para la cobertura planificada", "Sería ideal pero no imprescindible", "No, con acceso general de prensa es suficiente"], hint: "El acceso a backstage es limitado y se coordina con la dirección artística. No se garantiza en todos los casos." },
          { name: "observaciones", label: "Observaciones o requerimientos especiales", type: "textarea", rows: 2, placeholder: "Equipamiento especial, accesibilidad, condiciones particulares o cualquier pregunta." },
        ],
      },
    ],
  },

};

// ── Tabs (orden + metadata). El schema vive en FORM_SCHEMAS[id]. ──
const PARTICIPA_TABS = [
  { id: "feriantes",     emoji: "🌿", label: "Feriantes / Emprendedores", short: "Feriantes",     intro: "Contanos sobre tu emprendimiento y postulate para tener tu stand en la feria.", templateId: "REEMPLAZAR_TEMPLATE_feriantes",     subject: "Nueva solicitud Feriante — BIORAIZ" },
  { id: "gastronomicos", emoji: "🍽️", label: "Gastronómicos",             short: "Gastronómicos", intro: "Sumá tu propuesta gastronómica al patio de comidas del festival.",            templateId: "REEMPLAZAR_TEMPLATE_gastronomicos", subject: "Nueva solicitud Gastronómico — BIORAIZ" },
  { id: "artistas",      emoji: "🎤", label: "Artistas / Músicos",         short: "Artistas",      intro: "Convocatoria para artistas locales y emergentes de la Patagonia.",             templateId: "REEMPLAZAR_TEMPLATE_artistas",      subject: "Nueva solicitud Artista — BIORAIZ" },
  { id: "speakers",      emoji: "🎙️", label: "Speakers",                   short: "Speakers",      intro: "Proponé una charla para el ciclo de contenidos del festival.",                 templateId: "REEMPLAZAR_TEMPLATE_speakers",      subject: "Nueva solicitud Speaker — BIORAIZ" },
  { id: "facilitadores", emoji: "🧘", label: "Facilitadores",              short: "Facilitadores", intro: "Yoga, meditación, respiración, movimiento, sonido y terapias.",                templateId: "REEMPLAZAR_TEMPLATE_facilitadores", subject: "Nueva solicitud Facilitador/a — BIORAIZ" },
  { id: "sponsors",      emoji: "📢", label: "Sponsors / Alianzas",        short: "Sponsors",      intro: "Sumá tu marca u organización como aliada del festival.",                       templateId: "REEMPLAZAR_TEMPLATE_sponsors",      subject: "Nueva solicitud Sponsor — BIORAIZ" },
  { id: "prensa",        emoji: "📰", label: "Prensa / Media",             short: "Prensa",        intro: "Acreditate como prensa para cubrir el festival.",                              templateId: "REEMPLAZAR_TEMPLATE_prensa",        subject: "Nueva solicitud Prensa — BIORAIZ" },
];

window.FORM_SCHEMAS = FORM_SCHEMAS;
window.PARTICIPA_TABS = PARTICIPA_TABS;
