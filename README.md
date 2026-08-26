# BIORAIZ Website — Production Ready

Feria sustentable de la Patagonia | 13-15 nov 2026 | Neuquen Capital, Neuquén

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite → Cloudflare Pages
- **Backend**: Express.js → Railway
- **Database**: PostgreSQL → Railway
- **Email**: Resend/SendGrid
- **API Gateway**: Cloudflare Workers
- **CI/CD**: GitHub Actions
- **Domain**: bioraiz.net

## 📂 Estructura del Proyecto

```
.
├── frontend/              # React app (Cloudflare Pages)
│   ├── src/
│   │   ├── components/   # Header, Footer, etc.
│   │   ├── pages/        # Home, Feria, Expositores, Programa, Entradas, Participa, Prensa
│   │   ├── services/     # API client
│   │   └── styles/       # CSS
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
├── api/                   # Backend Express (Railway)
│   ├── src/
│   │   ├── routes/       # /api/forms, /api/subscribers, /api/tickets
│   │   ├── services/     # emailService, businessLogic
│   │   ├── middleware/   # CORS, auth, validation
│   │   └── index.js      # Server entry point
│   ├── tsconfig.json
│   └── package.json
├── workers/               # Cloudflare Workers (API Gateway)
│   ├── src/
│   │   └── index.ts      # Rate limiting, CORS, routing
│   ├── wrangler.toml
│   └── package.json
├── database/              # Database
│   └── schema.sql         # PostgreSQL schema
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD automation
├── .env.example           # Template de variables
├── .gitignore
├── DEPLOYMENT.md          # Guía completa de deployment
├── railway.json           # Config para Railway
├── package.json           # Root workspace
└── README.md

## 🎯 Funcionalidades

✅ **Páginas**
- Inicio (Home)
- La Feria
- Directorio de Expositores
- Programa (3 días)
- Venta de Entradas
- Formulario de Participación
- Kit de Prensa

✅ **Funcionalidad**
- Formularios con envío a hola@bioraiz.net
- Suscripción "Avisame cuando salga"
- Notificaciones por email
- Venta de entradas (Stripe ready)
- Base de datos de contactos
- Rate limiting y seguridad
- Responsive design

La estética es **orgánica, cálida y editorial**: paleta verde bosque + ocre + tierra sobre
fondos beige, tipografía serif display (Playfair Display) combinada con sans (DM Sans) y
mono (DM Mono), formas vegetales decorativas, y micro-animaciones de scroll-reveal.

---

## 2. Sobre los archivos de diseño

⚠️ **Importante:** los archivos de este bundle son **referencias de diseño hechas en HTML**
— prototipos que muestran el look & feel y el comportamiento esperado, **no código de
producción para copiar literalmente**.

La tarea es **recrear estos diseños en el entorno del código destino** (lo ideal aquí sería
**Next.js / React + CSS Modules o Tailwind**, ya que el prototipo ya está construido en React),
usando los patrones, librerías y convenciones del proyecto. Si todavía no existe un código
base, elegí el framework más apropiado (recomendado: **Next.js**) e implementá los diseños ahí.

El prototipo está escrito en **React vía Babel inline** (sin build step, sin bundler). En
producción NO se debe usar Babel en el navegador: hay que portar los componentes a un
proyecto React real con build (Vite o Next.js).

### Archivo canónico
- **`BIORAIZ - completo.html`** → ✅ **fuente de verdad.** Es la versión más actualizada
  (ubicación, precios de entradas, FAQ, datos de contacto y formularios EmailJS al día).
- `src/*.jsx` → los mismos componentes en **forma modular** (más fáciles de leer), pero
  algunos datos están **desactualizados** respecto del HTML (p. ej. ubicación "Parque
  Centenario" vs. la correcta "Neuquen Capital", y los planes de entrada viejos). Usalos
  para entender la estructura, **pero los valores correctos viven en el HTML**.
- `BIORAIZ - completo (standalone).html` → versión auto-contenida (todo inline, para abrir
  offline). No hace falta portarla; está incluida solo por completitud.

---

## 3. Fidelidad

**Alta fidelidad (hi-fi).** Estos son mockups pixel-perfect con colores, tipografía,
espaciados, estados e interacciones finales. El desarrollador debe **recrear la UI con
precisión** usando las librerías y patrones del código base. Todos los tokens de diseño
están definidos como variables CSS (ver §8) — conviene mapearlos 1:1.

---

## 4. Arquitectura general

| Aspecto | Detalle |
|---|---|
| Tipo | SPA de una sola página con router por **hash** (`#home`, `#feria`, …) |
| Stack del prototipo | React 18.3.1 + Babel standalone (inline, sin build) |
| Stack recomendado en prod | React real con build (Next.js o Vite). Si es Next, conviene rutas reales (`/feria`, `/entradas`…) en vez de hash |
| Router | `App()` mantiene `page` en estado, sincroniza con `window.location.hash`, escucha `hashchange`, y hace `scrollTo(top)` en cada cambio |
| Layout | `<Header>` fijo arriba + `<main key={page}>` (la `key` fuerza re-mount + animación de entrada) + `<Footer>` |
| Envío de formularios | **EmailJS** (frontend-only, sin backend). Ver §7 |
| Fuentes | Google Fonts: Playfair Display, DM Sans, DM Mono |

Páginas y componente que las renderiza:

| Hash | Componente | Vista |
|---|---|---|
| `#home` | `PageHome` | Inicio |
| `#feria` | `PageFeria` | La Feria |
| `#expositores` | `PageExpositores` | Expositores |
| `#programa` | `PagePrograma` | Programa |
| `#entradas` | `PageEntradas` | Entradas |
| `#participa` | `PageParticipa` | Participá (formularios) |
| `#prensa` | `PagePrensa` | Prensa |

---

## 5. Chrome global (Header / Footer)

### Header (`components.jsx` → `Header`)
- `position: fixed`, `z-index: 50`, ancho completo.
- **Transparente sobre el hero** del Home; pasa a fondo claro translúcido
  (`rgba(250,246,237,0.86)` + `backdrop-filter: blur(10px) saturate(140%)`) cuando
  `scrollY > 40` o cuando no estamos en Home.
- Padding vertical se contrae al hacer scroll: `20px 0` → `12px 0` (transición 300ms).
- Contenido: logo (botón → Home) · nav desktop · botón CTA "Entradas" (ocre) · botón
  hamburguesa (solo mobile).
- Nav links: `Inicio, La Feria, Expositores, Programa, Entradas, Participá, Prensa`.
  El link activo lleva un puntito (4×4px, circular) debajo — ocre sobre fondo oscuro,
  rojo tierra sobre claro.
- **Breakpoint 880px:** se ocultan nav desktop + CTA, aparece la hamburguesa que abre un
  drawer vertical (fondo `--bz-beige-hueso`, animación `bz-slide-down` 240ms).

### Footer (`components.jsx` → `Footer`)
- Fondo oscuro `--bz-fondo-dark` (#1E3320), texto crema.
- Grid de 4 columnas (`1.4fr 1fr 1fr 1fr`): marca + tagline, Navegar, Comunidad, Contacto.
- Tagline en Playfair italic: "Donde la tierra florece y la comunidad crece."
- Columna contacto: emails + redes sociales como círculos de 36px con label mono ("IG",
  "FB", "YT", "TW"); hover invierte a fondo ocre.
- Barra inferior: frase "eco" aleatoria (de un array de 4) + copyright, en tipografía mono.
- **Breakpoints:** 880px → 2 columnas; 520px → 1 columna.

### Logo (`BzLogo`)
- Símbolo SVG de un **brote** (sprout): tallo vertical + dos hojas (una verde profundo,
  otra ocre tostado) + semilla en la base.
- Wordmark "BIORAIZ" en Playfair, `font-weight: 600`, `letter-spacing: 0.16em`.
- Props: `size` (default 28), `mono`, `color`.

---

## 6. Vistas en detalle

### 6.1 Home (`PageHome`)
Secuencia de secciones (todas con scroll-reveal):

1. **Hero** — pantalla completa (`min-height: 100vh`), fondo oscuro con gradiente
   verde + placeholder de "video loop · mercado al aire libre". Hojas decorativas
   (`LeafShape`) y un círculo (`CircleShape`) con **parallax sutil siguiendo el mouse**
   (`translate` proporcional a la posición del cursor, transición 600ms). Título gigante
   "BIO<em>RAIZ</em>" (`clamp(56px, 11vw, 168px)`, line-height 0.92), subtítulo en Playfair
   italic, dos CTA ("Quiero ir" ocre → Entradas, "Ver programa" outline → Programa), y a la
   derecha una **tarjeta de fecha/lugar** con borde ocre y blur. Cue de scroll abajo ("Bajá"
   + línea que pulsa). Animaciones de entrada escalonadas (`bz-fade-up` con delays 100–500ms).
2. **Purpose** — bloque centrado y angosto (`container-narrow`), frase grande en display con
   palabra acentuada (`<em>encontrarse</em>` en rojo tierra). Fondo con patrón `.trama`.
3. **Numbers** — grid de 4 contadores animados (`Counter`, cuentan al entrar en viewport con
   ease-out cúbico). Métricas: `80+` expositores, `24k` personas, `4` ediciones, `92%`
   residuos clasificados. Grid 1px gap sobre borde (efecto líneas divisorias). 880px → 2 cols.
4. **ExpositoresScroll** — carrusel horizontal con scroll-snap de 10 `ExpositorCard` + tarjeta
   final "Ver todos" (dashed). Flechas prev/next (44px, circulares) que hacen `scrollBy(±360)`.
5. **AgendaPreview** — grid 2 col (`1fr 1.6fr`): a la izq texto "3 días, sin apuro." + CTA;
   a la der 3 actividades destacadas del sábado en filas (hora en display rojo · título ·
   lugar/speaker · tag tipo).
6. **Gallery** — mosaico asimétrico CSS Grid (12 columnas, `gridAutoRows: 120px`), 6
   placeholders con distintos `span`. 880px → 6 cols, todos full-width.
7. **NewsletterBlock** — tarjeta crema con hojas decorativas de fondo; form de email con
   validación mínima (`email.includes("@")`) y estado `sent` que muestra confirmación.

### 6.2 La Feria (`PageFeria`)
Storytelling de la experiencia: zonas (Mercado de Productores, Cocina Abierta, Escenario
Principal, Zona Brotes, Pradera), valores/manifiesto (Origen, Circularidad, Pausa,
Comunidad, Crecimiento), compromisos de sustentabilidad (0 plásticos, energía limpia,
compost in situ, transporte compartido, materiales locales) y el equipo. Reutiliza
`SectionHead`, `Placeholder`, `LeafShape`, tags. *(Ver `src/page-feria.jsx`.)*

### 6.3 Expositores (`PageExpositores`)
- **Filtro por categoría**: estado `activeCat` (default `"all"`). Chips de categoría
  (`CATEGORIES`): Todos, Alimentación, Cosmética, Diseño, Bienestar, Infantil, Gastronomía.
- Grid de `ExpositorCard` filtrado por `cat`. Cada card: placeholder de retrato + tag de
  categoría (color por categoría) + origen (mono) + nombre (Playfair) + descripción.
- Hover de card: `translateY(-4px)` + sombra media.

### 6.4 Programa (`PagePrograma`)
- **Tabs por día**: estado `activeDia` (`viernes` / `sabado` / `domingo`). Cada tab muestra
  número de día grande, subtítulo ("Apertura", "Día completo", "Cierre y cosecha") y la lista
  de `ACTIVIDADES[dia]`.
- Cada actividad: hora (display) · título · lugar · speaker · tag de tipo (Charla, Taller,
  Música, Mercado, Bienestar, Infantil, Cata, Encuentro, Ceremonia). Las `destacado: true`
  llevan énfasis visual.

### 6.5 Entradas (`PageEntradas`)
- **3 planes de entrada** (`TICKETS`, datos canónicos en el HTML):
  - **Raíces · Early Bird** — `$ 22.000`/día (precio original `$ 30.000` tachado), color ocre.
  - **Raíces · General** — `$ 30.000`/día, color verde, `destacado: true` (plan resaltado).
  - **Bosque · VIP** — `$ 80.000`/día, color tierra; incluye kit de bienvenida, baños VIP,
    barra exclusiva.
  - Cada card lista `incluye[]` con checks.
- **FAQ acordeón**: estado `openFaq` (índice abierto, default 0). Preguntas en `FAQ`
  (mascotas, accesibilidad, vajilla propia, etc.). Click alterna abierto/cerrado con
  transición de altura.

### 6.6 Participá (`PageParticipa`) — formularios
- **Tabs de tipo de postulación** (`PARTICIPA_TABS`): Feriantes/Emprendedores 🌿,
  Gastronómicos 🍽️, Artistas/Músicos 🎤, Speakers 🎙️, Facilitadores 🧘,
  Sponsors/Alianzas 📢, Prensa/Media 📰. Estado `active` selecciona el tab.
- Cada tab tiene un **schema de formulario** (`FORM_SCHEMAS[id]`) que define los campos.
  El formulario se renderiza dinámicamente desde ese schema.
- Estados de envío: `idle` → `sending` → `sent` / `error`.
- Envío vía **EmailJS** (`emailjs.sendForm`), un `templateId` distinto por tab. Ver §7.
- Inputs ocultos meta: `_subject`, `tipo_participacion`.

### 6.7 Prensa (`PagePrensa`)
- Kit de prensa descargable + datos de contacto de prensa + grilla de notas de medios
  (`PRENSA_NOTAS`: medio, fecha, título, link). Botón "copiar email de prensa" con estado
  `copied`. *(Ver `src/page-press.jsx`.)*

---

## 7. Formularios — EmailJS (sin backend)

Los formularios de **Participá** se envían con el SDK de EmailJS (cargado en el `<head>`:
`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`).

Flujo de configuración (documentado en el propio código):
1. Crear cuenta en emailjs.com y conectar el Gmail del evento → **SERVICE_ID**.
2. Crear una **template por cada tipo de formulario** → cada una da un **TEMPLATE_ID**.
   En el cuerpo se usan variables `{{nombre_del_campo}}` que coinciden con los `name` de
   los inputs.
3. Copiar la **Public Key** (Account → API Keys).
4. Pegar todo en `EMAILJS_CONFIG` y el `templateId` de cada tab en `PARTICIPA_TABS`.

```js
const EMAILJS_CONFIG = {
  publicKey: "REEMPLAZAR_PUBLIC_KEY",
  serviceId: "REEMPLAZAR_SERVICE_ID",
};
```

> ⚠️ En producción conviene mover estas credenciales a variables de entorno
> (`NEXT_PUBLIC_EMAILJS_*`) y, si el volumen lo amerita, considerar un endpoint backend
> propio en vez de EmailJS frontend-only.

**Datos de contacto del evento (en el HTML):**
- Email: `hola@bioraiz.net`
- WhatsApp: `+54 9 2995781006` (`https://wa.me/5492995781006`)
- Instagram: `https://www.instagram.com/bioraiz.nqn/`
- Facebook: `https://www.facebook.com/people/Bioraiz/61590140866075/`

---

## 8. Design tokens

Todos definidos como variables CSS en `:root` (en el `<head>` del HTML). Mapealos 1:1 al
sistema del código destino (Tailwind theme, CSS custom properties, etc.).

### Colores

| Token | Hex | Uso |
|---|---|---|
| `--bz-verde-profundo` | `#2A3D24` | Verde principal, textos display, botón primario |
| `--bz-verde-bosque` | `#3D5A3F` | Verde secundario |
| `--bz-verde-musgo` | `#6E9050` | Eyebrows, hojas decorativas |
| `--bz-verde-claro` | `#9DC99F` | Texto sobre oscuro, subtítulos hero |
| `--bz-verde-pasto` | `#EAF3DE` | Fondos de tag verdes |
| `--bz-ocre-calido` | `#E6CB7A` | **Acento principal** (CTA, detalles) |
| `--bz-ocre-tostado` | `#C8A647` | Ocre oscuro (hover, hojas) |
| `--bz-tierra-rojo` | `#A33A1E` | Acento rojo tierra (`<em>`, horas) |
| `--bz-tierra-claro` | `#D87A55` | Tierra claro |
| `--bz-beige-base` | `#F2EBDC` | Fondo alterno / placeholders |
| `--bz-beige-hueso` | `#FAF6ED` | Fondo base / cards |
| `--bz-crema-fondo` | `#F8F2E2` | Fondo crema (secciones) |
| `--bz-crema-texto` | `#F2EFE6` | Texto sobre footer oscuro |
| `--bz-texto-primario` | `#1A2012` | Texto principal |
| `--bz-texto-secundario` | `#4A5C3A` | Texto secundario |
| `--bz-texto-terciario` | `#7A8A6A` | Texto terciario / metadatos |
| `--bz-borde-suave` | `#DDD3BD` | Bordes |
| `--bz-borde-ligero` | `#EDE4CF` | Bordes sutiles |
| `--bz-fondo-base` | `#FAF6ED` | Fondo página |
| `--bz-fondo-alt` | `#F2EBDC` | Fondo secciones alternas |
| `--bz-fondo-dark` | `#1E3320` | Fondo oscuro (hero, footer) |

### Tipografía
- `--bz-font-display: 'Playfair Display', Georgia, serif` — títulos, números, marca.
  Usar `italic` para el énfasis editorial; `<em>` en display va en color tierra rojo.
- `--bz-font-body: 'DM Sans', system-ui, sans-serif` — cuerpo, UI.
- `--bz-font-mono: 'DM Mono', 'Courier New', monospace` — eyebrows, labels, metadatos.
- Eyebrow: 11px, `text-transform: uppercase`, `letter-spacing: 0.18em`, mono.
- Display escala con `clamp()` (ej. hero `clamp(56px, 11vw, 168px)`, headings de sección
  `clamp(32px, 5vw, 56px)`).

### Radios
`--bz-radius-sm: 4px` · `md: 8px` · `lg: 14px` · `xl: 24px` · `pill: 9999px`

### Sombras
- `--bz-shadow-sm: 0 1px 3px rgba(30,51,32,0.06)`
- `--bz-shadow-md: 0 6px 18px rgba(30,51,32,0.08)`
- `--bz-shadow-lg: 0 18px 42px rgba(30,51,32,0.12)`
- `--bz-shadow-xl: 0 32px 72px rgba(30,51,32,0.18)`

### Easing
- `--bz-ease: cubic-bezier(0.4, 0, 0.2, 1)`
- `--bz-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` (botones, micro-rebote)

### Layout
- `.container`: `max-width: 1280px`, padding lateral 32px (20px en ≤768px).
- `.container-narrow`: `max-width: 920px`.
- Breakpoint principal de navegación/grids: **880px**. Secundarios: 768px, 520px.

---

## 9. Interacciones & comportamiento

- **Scroll reveal** (`useReveal` + clase `.reveal`/`.in`): IntersectionObserver con
  `threshold 0.12`, `rootMargin 0px 0px -60px 0px`. Al entrar, `.reveal` pasa de
  `opacity:0; translateY(28px)` a visible (transición 800ms). Delays escalonados con
  `.reveal-delay-1..5` (80ms cada uno).
- **Contadores** (`Counter`): animan de 0 al valor con ease-out cúbico (1400ms) cuando
  entran al viewport (una sola vez).
- **Parallax de mouse** en el hero (hojas/círculos siguen el cursor, 600ms ease).
- **Header adaptativo** al scroll (transparencia, padding, blur).
- **Carrusel** de expositores con scroll-snap + flechas.
- **Tabs** (programa por día, participá por tipo) y **acordeón** (FAQ) por estado local.
- **Hover de cards**: `translateY(-4px)` + sombra.
- **Animaciones keyframe** disponibles: `bz-fade-up`, `bz-fade-in`, `bz-slide-down`,
  `bz-grow`, `bz-pulse`, `bz-drift`, `bz-scroll-x`.

### Estado (resumen)
| Estado | Dónde | Para qué |
|---|---|---|
| `page` | `App` | Vista actual (sync con hash) |
| `scrolled`, `mobileOpen` | `Header` | Estilo al scroll, drawer mobile |
| `mouse` | `Hero` | Parallax |
| `val` (counter) | `Counter` | Valor animado |
| `email`, `sent` | `NewsletterBlock` | Form newsletter |
| `activeCat` | `PageExpositores` | Filtro de categoría |
| `activeDia` | `PagePrograma` | Día seleccionado |
| `openFaq` | `PageEntradas` | Item de FAQ abierto |
| `active`, `status` | `PageParticipa` | Tab + estado de envío |
| `copied` | `PagePrensa` | Feedback "copiado" |

---

## 10. Assets

En la carpeta `assets/` del proyecto (incluidos en este bundle):

| Archivo | Qué es |
|---|---|
| `bioraiz-logo.jpg` | Logo / wordmark de referencia |
| `bioraiz-symbol.png` | Símbolo (brote) |
| `foto-bioraiz-verde.png` | Foto de marca |
| `foto-evento.png` | Foto de evento |

> El prototipo usa mayormente **placeholders rayados** (clase `.ph` con
> `repeating-linear-gradient` + label mono) en lugar de fotos finales. En producción hay que
> reemplazar cada placeholder por la imagen real correspondiente (ver el `label` de cada uno,
> ej. "video loop · mercado al aire libre", "hero · mercado al amanecer", "retrato · {nombre}").
> El logo en header/footer se dibuja como **SVG inline** (`BzLogo`), no como imagen.

---

## 11. Archivos en este bundle

```
design_handoff_bioraiz_website/
├── README.md                          ← este documento
├── BIORAIZ - completo.html            ← ✅ FUENTE DE VERDAD (todo inline, datos al día)
├── BIORAIZ - completo (standalone).html  ← versión offline auto-contenida (referencia)
├── assets/                            ← logo, símbolo y fotos de marca
└── src/                               ← componentes en forma modular (más legibles)
    ├── main.jsx                       ← App + router por hash
    ├── components.jsx                 ← Header, Footer, BzLogo, SectionHead, Placeholder,
    │                                     Counter, useReveal, ExpositorCard, formas decorativas
    ├── data.jsx                       ← datos (⚠ algunos desactualizados vs el HTML)
    ├── participa-forms.jsx            ← schemas de formularios + tabs + EmailJS
    ├── page-home.jsx
    ├── page-feria.jsx
    ├── page-expositores.jsx
    ├── page-programa.jsx
    ├── page-entradas.jsx
    ├── page-participa.jsx
    └── page-press.jsx
```

> Recordá: ante cualquier diferencia de **datos** (ubicación, precios, FAQ, contacto) entre
> `src/data.jsx` y `BIORAIZ - completo.html`, **gana el HTML**.

---

## 12. Recomendaciones para la implementación en producción

1. **Migrar a un build real** (Next.js recomendado). Quitar Babel-en-navegador.
2. **Rutas reales** (`/feria`, `/expositores`, …) en vez de hash, para SEO y compartir links.
   Mantener el scroll-to-top en cada navegación.
3. **Portar tokens** a `:root` / theme del framework (o Tailwind config).
4. **Reemplazar placeholders** por imágenes reales optimizadas (next/image si es Next).
5. **Fuentes**: self-host o `next/font` (Playfair Display, DM Sans, DM Mono).
6. **Formularios**: mover credenciales EmailJS a env vars; validación y manejo de errores
   accesible; estados de envío visibles.
7. **Accesibilidad**: foco visible, `aria-*` en tabs/acordeón/drawer, respetar
   `prefers-reduced-motion` para desactivar reveals/parallax.
8. **Performance**: el sitio se promociona como liviano ("menos de 200kb") — mantener esa
   filosofía: lazy-load de imágenes, sin trackers pesados.
