export const FORM_SCHEMAS = {

  feriantes: {
    pills: ["200–220 stands disponibles", "50.000 asistentes", "8 categorías", "Cierre 31 ago", "Early bird −15% hasta 31/07"],
    note: "**Antes de completar:** Hay entre 200 y 220 stands disponibles, seleccionados por curaduría. Se prioriza origen patagónico o regional. Las postulaciones cierran el **31 de agosto de 2026** y los seleccionados son notificados el **15 de septiembre**. El pago confirma el lugar solo tras la notificación oficial.",
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
          { name: "descripcion", label: "Descripción del emprendimiento", type: "textarea", required: true, rows: 4, placeholder: "¿Qué ofrecés? ¿Cómo lo producís? ¿Qué lo hace diferente?", hint: "Máximo 150 palabras. Sé específico/a: esto es lo que lee el jurado para decidir si tu propuesta encaja." },
          { name: "antiguedad", label: "¿Hace cuánto tiempo existe el emprendimiento?", type: "text", required: true, placeholder: "Ej: Desde marzo 2022 — 4 años de actividad" },
          { name: "referencia", label: "Link de referencia (tienda, Instagram, web)", type: "text", placeholder: "https://... o @usuario" },
        ],
      },
      {
        num: "03", label: "Tamaño de stand", title: "¿Cuánto espacio necesitás?",
        items: [
          { name: "stand", label: "Tamaño solicitado", type: "radio", required: true, options: [
            { t: "Micro · 6 m² — USD 380 (early bird USD 323)", s: "3×2 m · Ideal para cosmética, libros, accesorios o propuestas compactas." },
            { t: "Estándar · 9 m² — USD 560 (early bird USD 476) · + elegido", s: "3×3 m · El más elegido. Espacio para exhibir con comodidad y atender bien." },
            { t: "Grande · 12 m² — USD 780 (early bird USD 663)", s: "3×4 m · Para propuestas con mucho producto o que ofrecen experiencia en el stand." },
            { t: "Premium · 20 m² — USD 1.300 (early bird USD 1.105)", s: "4×5 m · Ubicación destacada en acceso o zona central. Cupo: 5 stands." },
          ], hint: "El stand incluye: espacio señalizado, acceso a electricidad (800W estándar), 2 acreditaciones de feriante por día, mención en redes y catálogo digital oficial." },
          { name: "electricos", label: "Requerimientos eléctricos especiales", type: "textarea", rows: 2, placeholder: "¿Qué equipos necesitás conectar? Indicá el consumo en watts si lo sabés." },
        ],
      },
      {
        num: "04", label: "Sustentabilidad", title: "Requisitos del festival",
        items: [
          { name: "practicas", label: "Prácticas sustentables concretas de tu emprendimiento", type: "textarea", required: true, rows: 3, placeholder: "Contanos al menos 2 prácticas reales: packaging reciclable, cero plástico, ingredientes agroecológicos, etc." },
          { name: "plastico", label: "¿Confirmás que operarás sin plástico descartable de un solo uso?", type: "radio", required: true, options: ["Sí, ya trabajo sin plástico descartable", "Sí, puedo adecuarme para el festival", "Necesito más información sobre los requisitos"] },
        ],
      },
      {
        num: "05", label: "Motivación", title: "¿Por qué BIORAIZ?",
        items: [
          { name: "motivacion", label: "¿Por qué querés estar en BIORAIZ?", type: "textarea", required: true, rows: 3, placeholder: "En no más de 100 palabras: ¿qué significa este festival para tu proyecto?" },
          { name: "adicional", label: "Información adicional o preguntas", type: "textarea", rows: 2, placeholder: "Cualquier cosa que quieras contarnos o preguntarnos." },
        ],
      },
    ],
  },

  gastronomicos: {
    pills: ["38–45 puestos", "0% comisión", "50.000 asistentes", "Cierre 31 ago"],
    note: "**Antes de completar:** El cupo es limitado a 38–45 puestos seleccionados por curaduría. Se acepta máximo 1 puesto por sub-rubro. Las postulaciones cierran el **31 de agosto de 2026** y los seleccionados son notificados el 10 de septiembre.",
    submitNote: "**¿Qué pasa después?** Revisamos tu postulación y te avisamos antes del 10 de septiembre de 2026. Las postulaciones cierran el 31 de agosto.",
    sections: [
      {
        num: "01", label: "Datos del emprendimiento", title: "¿Quiénes son?",
        items: [
          { row: [
            { name: "emprendimiento", label: "Nombre del emprendimiento / local", type: "text", required: true, placeholder: "Ej: La Raíz Cocina Natural" },
            { name: "responsable", label: "Nombre del responsable", type: "text", required: true, placeholder: "Nombre y apellido" },
          ]},
          { row: [
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@correo.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 299 000-0000" },
          ]},
        ],
      },
      {
        num: "02", label: "La propuesta gastronómica", title: "¿Qué ofrecés?",
        items: [
          { name: "descripcion", label: "Descripción de tu propuesta gastronómica", type: "textarea", required: true, rows: 4, placeholder: "¿Qué cocinás? ¿Con qué ingredientes? ¿Cuál es tu diferencial?" },
          { name: "categoria", label: "Categoría principal", type: "select", required: true, options: ["Comida saludable rápida (bowls, wraps, sándwiches)", "Gastronomía bio / plato elaborado", "100% vegano / vegetariano", "Bebidas saludables (jugos, smoothies, kombucha)", "Snacks y barras naturales", "Repostería sin TACC / raw food", "Panadería artesanal", "Cocina regional patagónica consciente"] },
          { name: "menu", label: "Menú tentativo con precios aproximados", type: "textarea", required: true, rows: 4, placeholder: "Listá los 4 a 8 ítems principales que ofrecerías con su precio orientativo." },
          { name: "local_ing", label: "¿Qué porcentaje de tus ingredientes son de origen local o patagónico?", type: "radio", required: true, options: ["Más del 80% — casi todo es local o patagónico", "Entre 50% y 80% — la mayoría es local", "Entre 20% y 50% — algunos ingredientes locales", "Menos del 20% — principalmente ingredientes de otra procedencia"] },
        ],
      },
      {
        num: "03", label: "Stand y logística", title: "Tamaño y operación",
        items: [
          { name: "tamano", label: "Tamaño de puesto solicitado", type: "radio", required: true, options: ["Snackería / bebidas — 2×3 m (6 m²) · $450.000", "Estándar — 3×5 m (15 m²) · $750.000", "Premium — 4×6 m (24 m²) · $1.200.000"] },
          { name: "adicional", label: "Observaciones o requerimientos especiales", type: "textarea", rows: 2, placeholder: "Cualquier pregunta o requerimiento." },
        ],
      },
    ],
  },

  artistas: {
    pills: ["3 escenarios", "Slots reservados", "Prioritario regional", "Cierre 31 ago"],
    note: "**Esta convocatoria prioriza artistas locales y emergentes patagónicos.** Si tu proyecto es de otra región de Argentina y creés que encajás, podés postularte igual — se evalúa caso a caso. Notificamos antes del **15 de septiembre**.",
    submitNote: "**¿Qué pasa después?** Evaluamos todas las postulaciones y avisamos antes del 15 de septiembre de 2026.",
    sections: [
      {
        num: "01", label: "Datos del proyecto artístico", title: "¿Quiénes son?",
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
        ],
      },
      {
        num: "02", label: "La propuesta artística", title: "¿Qué hacen?",
        items: [
          { name: "descripcion", label: "Descripción del proyecto en no más de 150 palabras", type: "textarea", required: true, rows: 4, placeholder: "¿Cómo suena? ¿Qué historia hay detrás? Contanos en tus palabras, sin texto de prensa." },
          { name: "genero", label: "Género / estilo principal", type: "select", required: true, options: ["Folk / cantautor/a", "Indie / rock alternativo", "Folk andino / world music patagónica", "Electrónica orgánica / downtempo", "Ambient / música experimental", "Pop consciente / pop alternativo", "Jazz / bossa nova / música de cámara", "Música de raíz latinoamericana", "Fusión / inclasificable", "DJ set (electrónica de baja-media intensidad)", "Música ceremonial / sagrada"] },
          { name: "material", label: "Link a material para escuchar — Spotify, YouTube, SoundCloud o similar", type: "url", required: true, placeholder: "https://open.spotify.com/... o https://youtu.be/..." },
          { name: "encaje", label: "¿Por qué tu propuesta encaja en BIORAIZ?", type: "textarea", rows: 3, placeholder: "¿Qué tienen en común tu música y el espíritu del festival?" },
        ],
      },
      {
        num: "03", label: "Escenario y rider", title: "Aspectos técnicos",
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
          { name: "observaciones", label: "Observaciones o información adicional", type: "textarea", rows: 2, placeholder: "Condiciones de honorario, necesidades especiales, etc." },
        ],
      },
    ],
  },

  speakers: {
    pills: ["6–8 charlas/día", "400 personas/charla", "45–60 min/slot", "Cierre 31 ago"],
    note: "**Antes de completar:** BIORAIZ no convoca speakers con posiciones pseudocientíficas verificadas. El proceso de selección valora formación real, propuesta con base sólida y coherencia con el espíritu del festival. Notificamos antes del **15 de septiembre**.",
    submitNote: "**¿Qué pasa después?** Evaluamos la propuesta y te contactamos antes del 15 de septiembre.",
    sections: [
      {
        num: "01", label: "Datos del speaker", title: "¿Quién sos?",
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
        ],
      },
      {
        num: "02", label: "La propuesta de charla", title: "¿Qué vas a contar?",
        items: [
          { name: "titulo", label: "Título de la charla propuesta", type: "text", required: true, placeholder: "Ej: Microbiota y bienestar mental: lo que tu intestino le dice a tu cerebro" },
          { name: "descripcion", label: "Descripción de la charla (máximo 200 palabras)", type: "textarea", required: true, rows: 5, placeholder: "¿De qué trata? ¿Qué aprende o se lleva el asistente?" },
          { name: "tematica", label: "Temática principal", type: "select", required: true, options: ["Nutrición funcional y alimentación consciente", "Mindfulness, meditación y salud mental", "Sustentabilidad y bioeconomía", "Movimiento y cuerpo consciente", "Emprendimiento con propósito", "Crianza consciente y educación activa", "Identidad patagónica y cultura local", "Bienestar holístico e integralidad", "Otra"] },
          { row: [
            { name: "duracion", label: "Duración propuesta", type: "select", options: ["45 minutos", "60 minutos", "90 minutos (taller + charla)"] },
            { name: "practico", label: "¿Tiene componente práctico o participativo?", type: "select", options: ["No, es una charla expositiva", "Sí, tiene dinámicas o ejercicios cortos", "Sí, es principalmente un taller práctico"] },
          ]},
        ],
      },
      {
        num: "03", label: "Trayectoria y credenciales", title: "Tu respaldo profesional",
        items: [
          { name: "formacion", label: "Formación y credenciales relevantes", type: "textarea", required: true, rows: 3, placeholder: "Títulos, certificaciones, institución de formación y año." },
          { name: "exp", label: "¿Diste charlas en eventos públicos anteriormente?", type: "radio", required: true, options: ["Sí, en festivales o eventos de más de 1.000 personas", "Sí, en eventos medianos (hasta 1.000 personas)", "Sí, en workshops, capacitaciones o eventos pequeños", "No, sería mi primera charla en un evento público"] },
          { name: "observaciones", label: "Observaciones o información adicional", type: "textarea", rows: 2, placeholder: "Condiciones de honorario, preguntas, etc." },
        ],
      },
    ],
  },

  facilitadores: {
    pills: ["4–6 sesiones/día", "3 espacios", "150 personas/sesión", "Cierre 31 ago"],
    note: "**Antes de completar:** BIORAIZ exige formación acreditada y verificable en la disciplina propuesta. Notificamos antes del **15 de septiembre**.",
    submitNote: "**¿Qué pasa después?** Revisamos tu postulación y te contactamos antes del 15 de septiembre.",
    sections: [
      {
        num: "01", label: "Datos del facilitador/a", title: "¿Quién sos?",
        items: [
          { row: [
            { name: "nombre", label: "Nombre completo", type: "text", required: true, placeholder: "Tu nombre tal como aparecerá en la grilla" },
            { name: "disciplina", label: "Disciplina", type: "text", required: true, placeholder: "Ej: Profesora de Yoga Vinyasa, Terapeuta de sonido" },
          ]},
          { row: [
            { name: "email", label: "Email", type: "email", required: true, placeholder: "nombre@correo.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 000 000-0000" },
          ]},
        ],
      },
      {
        num: "02", label: "La práctica propuesta", title: "¿Qué vas a facilitar?",
        items: [
          { name: "disciplina_sesion", label: "Disciplina y tipo de sesión propuesta", type: "select", required: true, options: ["Yoga Hatha", "Yoga Vinyasa / Flow", "Yoga Yin / Restaurativo", "Yoga Nidra", "Meditación guiada", "Mindfulness", "Pranayama / técnicas de respiración", "Soundbath / cuencos tibetanos / gong", "Movimiento consciente / somática", "Danza consciente / Biodanza / Contact", "Tai Chi / Qi Gong", "Otra disciplina"] },
          { name: "descripcion", label: "Descripción de la sesión propuesta (máximo 150 palabras)", type: "textarea", required: true, rows: 4, placeholder: "¿Cómo es la sesión? ¿Qué nivel requiere? ¿Qué se lleva el participante?" },
          { name: "espacio", label: "Espacio que necesitás", type: "radio", required: true, options: ["Domo de Meditación — cubierto, 150 personas, ideal para prácticas contemplativas e inmersivas", "La Pradera — al aire libre, pasto natural, 80–100 personas, ideal para yoga y movimiento activo", "Sala de Terapias — privado, grupos de hasta 20 personas, ideal para terapias y sesiones individuales", "Cualquiera — sin preferencia, que el equipo asigne"] },
          { row: [
            { name: "duracion", label: "Duración de la sesión", type: "select", options: ["45 minutos", "60 minutos", "75 minutos", "90 minutos"] },
            { name: "nivel", label: "Nivel de la práctica", type: "select", options: ["Apto para todos — sin experiencia previa necesaria", "Principiantes y práctica regular", "Intermedio / practica regular", "Avanzado"] },
          ]},
        ],
      },
      {
        num: "03", label: "Formación y trayectoria", title: "Tu respaldo profesional",
        items: [
          { name: "formacion", label: "Formación acreditada en la disciplina que proponés", type: "textarea", required: true, rows: 3, placeholder: "Ej: Profesora de Yoga certificada 200hs (Yoga Alliance, 2019)." },
          { name: "exp", label: "Años de experiencia facilitando grupos", type: "radio", required: true, options: ["Menos de 1 año", "1 a 3 años", "3 a 7 años", "Más de 7 años"] },
          { name: "observaciones", label: "Observaciones o información adicional", type: "textarea", rows: 2, placeholder: "Requerimientos especiales, condiciones de honorario, etc." },
        ],
      },
    ],
  },

  sponsors: {
    pills: ["Sponsors", "Canjes", "Institucionales"],
    note: "**Contanos sobre tu propuesta de alianza.** Te contactamos en los próximos días para conversar los detalles.",
    submitNote: "**¿Qué pasa después?** Te contacta el equipo comercial para conversar la alianza.",
    sections: [
      {
        num: "01", label: "Tu organización", title: "Contanos quiénes son",
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
          { name: "propuesta", label: "Propuesta de colaboración", type: "textarea", rows: 3, placeholder: "Cómo te imaginás la alianza con BIORAIZ…" },
        ],
      },
    ],
  },

  prensa: {
    pills: ["Acceso completo", "Zona de prensa", "Backstage coordinado", "Cierre 25 oct"],
    note: "**Antes de completar:** Las acreditaciones son nominales con foto. Se confirman por email antes del **31 de octubre de 2026**. El plazo máximo de solicitud es el 25 de octubre.",
    submitNote: "**¿Qué pasa después?** Confirmamos la acreditación por email antes del 31 de octubre de 2026.",
    sections: [
      {
        num: "01", label: "Datos del medio", title: "¿Qué medio representás?",
        items: [
          { row: [
            { name: "medio", label: "Nombre del medio / plataforma", type: "text", required: true, placeholder: "Ej: La Mañana de Neuquén, @miblog, Podcast XYZ" },
            { name: "tipo_medio", label: "Tipo de medio", type: "select", required: true, options: ["Diario o revista digital nacional", "Diario o revista digital regional / patagónica", "Medio impreso", "Portal de bienestar / lifestyle", "Podcast", "Canal de YouTube", "Cuenta de Instagram / TikTok (creador de contenido)", "Agencia de noticias", "Radio o TV", "Freelance (sin medio fijo)"] },
          ]},
        ],
      },
      {
        num: "02", label: "Datos personales del/la periodista", title: "¿Quién viene al festival?",
        items: [
          { row: [
            { name: "nombre", label: "Nombre y apellido", type: "text", required: true, placeholder: "Periodista / creador de contenido principal" },
            { name: "rol", label: "Rol en la cobertura", type: "text", required: true, placeholder: "Ej: Periodista, fotógrafa, videomaker" },
          ]},
          { row: [
            { name: "email", label: "Email de contacto", type: "email", required: true, placeholder: "nombre@medio.com" },
            { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true, placeholder: "+54 9 000 000-0000" },
          ]},
        ],
      },
      {
        num: "03", label: "La cobertura planificada", title: "¿Qué vas a publicar?",
        items: [
          { name: "tipo_cobertura", label: "Tipo de cobertura planificada", type: "checkbox", required: true, options: ["Nota de prensa escrita (digital o impresa)", "Fotografía editorial", "Video / reels para redes o YouTube", "Transmisión en vivo (streaming)", "Podcast o audio", "Stories / contenido efímero en Instagram o TikTok"] },
          { name: "angulo", label: "Ángulo editorial o enfoque de la cobertura", type: "textarea", rows: 3, placeholder: "Ej: 'Vamos a hacer una nota sobre el impacto económico del festival en la región'.", hint: "Cuanto más específico, mejor podemos preparar los accesos y facilitarte entrevistas relevantes." },
          { name: "dias", label: "Días que vas a cubrir", type: "checkbox", required: true, options: ["Viernes 13 de noviembre", "Sábado 14 de noviembre", "Domingo 15 de noviembre"] },
        ],
      },
    ],
  },

};

export const PARTICIPA_TABS = [
  { id: "feriantes",     emoji: "🌿", label: "Feriantes / Emprendedores", short: "Feriantes",     intro: "Contanos sobre tu emprendimiento y postulate para tener tu stand en la feria.", templateId: "REEMPLAZAR_TEMPLATE_feriantes",     subject: "Nueva solicitud Feriante — BIORAIZ" },
  { id: "gastronomicos", emoji: "🍽️", label: "Gastronómicos",             short: "Gastronómicos", intro: "Sumá tu propuesta gastronómica al patio de comidas del festival.",            templateId: "REEMPLAZAR_TEMPLATE_gastronomicos", subject: "Nueva solicitud Gastronómico — BIORAIZ" },
  { id: "artistas",      emoji: "🎤", label: "Artistas / Músicos",         short: "Artistas",      intro: "Convocatoria para artistas locales y emergentes de la Patagonia.",             templateId: "REEMPLAZAR_TEMPLATE_artistas",      subject: "Nueva solicitud Artista — BIORAIZ" },
  { id: "speakers",      emoji: "🎙️", label: "Speakers",                   short: "Speakers",      intro: "Proponé una charla para el ciclo de contenidos del festival.",                 templateId: "REEMPLAZAR_TEMPLATE_speakers",      subject: "Nueva solicitud Speaker — BIORAIZ" },
  { id: "facilitadores", emoji: "🧘", label: "Facilitadores",              short: "Facilitadores", intro: "Yoga, meditación, respiración, movimiento, sonido y terapias.",                templateId: "REEMPLAZAR_TEMPLATE_facilitadores", subject: "Nueva solicitud Facilitador/a — BIORAIZ" },
  { id: "sponsors",      emoji: "📢", label: "Sponsors / Alianzas",        short: "Sponsors",      intro: "Sumá tu marca u organización como aliada del festival.",                       templateId: "REEMPLAZAR_TEMPLATE_sponsors",      subject: "Nueva solicitud Sponsor — BIORAIZ" },
  { id: "prensa",        emoji: "📰", label: "Prensa / Media",             short: "Prensa",        intro: "Acreditate como prensa para cubrir el festival.",                              templateId: "REEMPLAZAR_TEMPLATE_prensa",        subject: "Nueva solicitud Prensa — BIORAIZ" },
];
