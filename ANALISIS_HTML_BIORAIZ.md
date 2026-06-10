# 📊 ANÁLISIS DETALLADO: BIORAIZ - completo.html

## 1. ESTRUCTURA GENERAL DEL PROYECTO

### Información Base
- **Evento**: BIORAIZ - La feria sustentable de la Patagonia
- **Fecha**: 13, 14, 15 de noviembre 2026
- **Lugar**: Las Cortaderas, Neuquén, Argentina
- **Asistentes estimados**: 15,000-17,000 personas/día
- **Stands disponibles**: 200+ feriantes

### Páginas Principales (6)
1. **HomePage** - Página de inicio con hero y presentación
2. **PageFeria** - Información sobre la feria, historia y valores
3. **PageExpositores** - Convocatoria para expositores
4. **PagePrograma** - Agenda y actividades por día
5. **PageEntradas** - Venta de tickets
6. **PageParticipa** - Formularios para participar (7 convocatorias)

### Arquitectura Técnica
- **Stack**: React 18.3.1 (inlineado via Babel)
- **Estilos**: CSS-in-JS + sistema de variables CSS (CSS Custom Properties)
- **Tipografía**: Playfair Display (display) + DM Sans (body) + DM Mono (mono)
- **Fuentes**: Cargadas desde Google Fonts
- **Email**: EmailJS SDK (envío de formularios desde frontend sin backend)
- **Componentes**: Todo como scripts type="text/babel" inlineados

---

## 2. COLORES Y ESTILOS CSS PRINCIPALES

### Paleta de Colores (Variables CSS)

#### Verdes (Naturaleza)
```css
--bz-verde-profundo:   #2A3D24  (Verde oscuro principal)
--bz-verde-bosque:     #3D5A3F  (Verde bosque)
--bz-verde-musgo:      #6E9050  (Verde musgo)
--bz-verde-claro:      #9DC99F  (Verde claro)
--bz-verde-pasto:      #EAF3DE  (Verde pasto muy claro)
```

#### Ocres (Tierra y Fuego)
```css
--bz-ocre-calido:      #E6CB7A  (Ocre cálido - botones destacados)
--bz-ocre-tostado:     #C8A647  (Ocre tostado)
--bz-tierra-rojo:      #A33A1E  (Rojo tierra - acentos)
--bz-tierra-claro:     #D87A55  (Tierra claro)
```

#### Neutros (Beige y Crema)
```css
--bz-beige-base:       #F2EBDC  (Beige base)
--bz-beige-hueso:      #FAF6ED  (Beige hueso - más claro)
--bz-crema-fondo:      #F8F2E2  (Crema para fondos)
--bz-crema-texto:      #F2EFE6  (Crema para texto)
```

#### Texto y Bordes
```css
--bz-texto-primario:   #1A2012  (Texto oscuro principal)
--bz-texto-secundario: #4A5C3A  (Texto gris-verde)
--bz-texto-terciario:  #7A8A6A  (Texto gris claro)
--bz-borde-suave:      #DDD3BD  (Borde gris)
--bz-borde-ligero:     #EDE4CF  (Borde muy claro)
```

#### Fondos
```css
--bz-fondo-base:       #FAF6ED  (Fondo claro principal)
--bz-fondo-alt:        #F2EBDC  (Fondo alternativo)
--bz-fondo-dark:       #1E3320  (Fondo oscuro)
```

### Tipografía (Familias)
```css
--bz-font-display:     'Playfair Display'  (Títulos, h1-h3, display)
--bz-font-body:        'DM Sans'           (Cuerpo de texto, párrafos)
--bz-font-mono:        'DM Mono'           (Eyebrows, labels, código)
```

### Espacios y Bordes
```css
--bz-radius-sm:        4px
--bz-radius-md:        8px
--bz-radius-lg:        14px
--bz-radius-xl:        24px
--bz-radius-pill:      9999px  (Bordes redondeados completos)
```

### Sombras
```css
--bz-shadow-sm:        0 1px 3px rgba(30,51,32,0.06)
--bz-shadow-md:        0 6px 18px rgba(30,51,32,0.08)
--bz-shadow-lg:        0 18px 42px rgba(30,51,32,0.12)
--bz-shadow-xl:        0 32px 72px rgba(30,51,32,0.18)
```

### Animaciones Clave
- `bz-fade-up`: Desvanecer + subir (entrada)
- `bz-fade-in`: Solo desvanecer
- `bz-slide-down`: Deslizar desde arriba
- `bz-grow`: Crecer horizontalmente
- `bz-pulse`: Parpadeo (opacidad)
- `bz-drift`: Flotación suave (movimiento orgánico)

### Clases Globales

#### Botones
- `.btn-primary`: Verde oscuro con texto beige
- `.btn-secondary`: Borde verde, fondo transparente
- `.btn-ocre`: Ocre con texto verde (destacado)
- `.btn-ghost`: Transparente, hover con flecha animada
- `.btn-on-dark`: Ocre sobre fondo oscuro

#### Tags/Pills
- `.tag`: Fondo verde pasto
- `.tag-ocre`: Fondo ocre con opacidad
- `.tag-tierra`: Fondo rojo tierra con opacidad
- `.tag-outline`: Solo borde

#### Textos
- `.display`: Playfair Display, sin serif, -0.01em letter-spacing
- `.eyebrow`: DM Mono, 11px, mayúsculas, 0.18em letter-spacing
- `.reveal`: Animación de entrada (fade-up con delays)

#### Placeholders
- `.ph`: Fondo rayado diagonal (patrón diagonal)
- `.ph-dark`: Versión oscura del placeholder
- `.ph-label`: Etiqueta pequeña en el placeholder

#### Patrón de Fondo
- `.trama`: Patrón orgánico radial con gradientes sutiles

---

## 3. CONTENIDO DE CADA SECCIÓN

### 3.1 HOME PAGE (PageHome)

#### HERO (Sección)
- **Fondo**: Degradado oscuro (135deg: #1A2812 → #2A3D24 → #3D5A3F → #4A6E4A)
- **CTA principal**: "BIORAIZ" con "RAIZ" en ocre
- **Tagline**: "Donde la tierra florece y la comunidad crece."
- **Elementos decorativos**: 
  - Hojas animadas (3 LeafShape con parallax al mouse)
  - Círculo decorativo en rojo tierra
  - Viñeta radial oscura (bottom)
  - Animación de scroll cue (pulsing line)

**Contenido**:
- Eyebrow: "Primera edición · noviembre 2026"
- Título: BIORAIZ (con "RAIZ" en ocre/rojo)
- Subtítulo italic: "Donde la tierra florece y la comunidad crece."
- Botones: 
  - "Quiero ir" (btn-ocre)
  - "Ver programa" (transparente)
- Info de fecha/lugar en card con borde ocre

**Layout**: Grid 2 columnas
- Izq: Texto y botones
- Der: Card con fecha y lugar (position: sticky)

---

#### SECTION: PURPOSE
- **Eyebrow**: "¿Qué es BIORAIZ?"
- **Título**: "Una feria de productores patagónicos donde la materia prima tiene origen, la cocina tiene tiempo y la comunidad tiene espacio para encontrarse."
- **Párrafos**: 2 párrafos explicando la feria

**Background**: `--bz-fondo-base` con `.trama`

---

#### SECTION: NÚMEROS (NumbersSection)
**Grid 4 columnas**:
1. `3` días de feria
2. `5` zonas experienciales
3. `200+` stands disponibles
4. `11h` de actividades por día

Cada número es un contador animado (Counter component con IntersectionObserver)

---

#### SECTION: EXPOSITORES HORIZONTAL (ExpositoresScroll)
- **Eyebrow**: "200+ stands disponibles"
- **Título**: "Cosas hechas con manos de la Patagonia."
- **Descripción**: "Seis categorías, un mismo criterio..."
- **Contenido**: Scroll horizontal de 6 cards de categoría + botón "Quiero un stand"

**Categorías mostradas**:
1. Alimentación - 43 stands
2. Cosmética - 32 stands
3. Diseño - 40 stands
4. Bienestar - 35 stands
5. Infantil - 28 stands
6. Gastronomía - 42 stands

Cada card muestra:
- Icono circular con símbolo
- Nombre de categoría
- Descripción
- Número de stands
- Tag "Convocatoria abierta"

---

#### SECTION: AGENDA PREVIEW (AgendaPreview)
**Grid 2 columnas**:
- **Izq**: Texto sobre los 3 días (sticky)
- **Der**: 3 bloques de días con tags

**Días**:
1. **13 Nov (Viernes)**: Apertura · Tags: Apertura, Mercado, Charla inaugural, Música
2. **14 Nov (Sábado)**: Día completo · Tags: Talleres, Cocina abierta, Zona Brotes, Conversatorio
3. **15 Nov (Domingo)**: Cierre y cosecha · Tags: Bienestar, Infantil, Mesa redonda, Cierre musical

---

#### SECTION: GALLERY (Gallery)
- Imagen de 1808×854 con caption
- Caption: "El predio de BIORAIZ al atardecer · Patagonia, nov 2026"

---

#### SECTION: NEWSLETTER (NewsletterBlock)
- **Eyebrow**: "Carta de Raíz"
- **Título**: "Una vez al mes, algo bueno en tu bandeja."
- **Descripción**: "Novedades del evento, historias de productores y notas eco..."
- **Form**: Email input + botón "Suscribirme"
- **Decoración**: Dos LeafShape superpuestas con opacidad

---

### 3.2 PAGE FERIA (PageFeria)

#### Header
- Eyebrow: "Sobre BIORAIZ"
- Título: "La Feria."
- Descripción: "Un proyecto que nació de una pregunta simple..."

---

#### HISTORY SECTION
**Grid 2 columnas**:
- **Izq**: Imagen ("Productores patagónicos")
- **Der**: Texto sobre por qué nace la feria

**Contenido**:
- "Una feria con raíces en la Patagonia"
- Párrafos sobre origen y propósito
- Quote: "Cuando lo que comprás tiene origen, todo cambia."
- Attribution: "Equipo BIORAIZ"

---

#### VALORES SECTION
**5 Valores en grid**:

1. **Origen** (icon: raíz)
   - "Cada expositor puede contar de dónde viene su materia prima..."

2. **Circularidad** (icon: círculo)
   - "Lo que entra al evento, sale o se transforma..."

3. **Pausa** (icon: ola)
   - "La feria no apura. Programa que respira..."

4. **Comunidad** (icon: trama)
   - "BIORAIZ es un espacio que se construye entre todos..."

5. **Crecimiento** (icon: brote)
   - "Cada edición intentamos algo nuevo, medimos qué funcionó..."

---

#### SUSTENTABILIDAD SECTION
**Grid 2 columnas**:
- **Izq**: Título + badge "Publicamos resultados"
- **Der**: 5 compromisos numerados

**Compromisos**:
1. Cero plásticos descartables
2. Reducción de huella de CO₂
3. Compost en proceso
4. Energía más limpia
5. Transparencia (con explicación)

---

#### EQUIPO
- Nota: "Producido por Zenzzo Productora de Experiencias"
- Localidad: "Neuquén, Patagonia"

---

### 3.3 PAGE EXPOSITORES (PageExpositores)

#### CRITERIOS
**3 criterios en grid**:
1. **Origen claro** - "Sabés de dónde viene tu materia prima..."
2. **Compromiso sustentable** - "Cuidás el impacto..."
3. **Coherencia** - "Lo que ofrecés y cómo lo ofrecés..."

---

#### CATEGORÍAS CON STANDS
**Grid auto-fill**:
Cada categoría muestra:
- Icono circular
- Nombre
- Descripción
- Número de stands
- Tag "Convocatoria abierta"

---

#### CTA - POSTULAR
- Fondo ocre
- "¿Querés exponer en BIORAIZ?"
- Descripción de la convocatoria
- Botón: "Quiero postularme"

---

### 3.4 PAGE PROGRAMA (PagePrograma)

#### DAY TABS
3 pestañas clickeables:
- Viernes 13 - Apertura
- Sábado 14 - Día completo
- Domingo 15 - Cierre y cosecha

#### ACTIVIDADES POR DÍA

**VIERNES 13**:
1. 15:00 - Apertura oficial
2. 16:00 - Inauguración del mercado
3. 17:00 - Charla: Agroecología y futuro (Valeria Soto) ⭐ Destacado
4. 18:00 - Taller: Pan de masa madre
5. 19:00 - Música en vivo: Pampa Trío
6. 20:00 - Cierre del día

**SÁBADO 14** (10 actividades):
1. 10:00 - Café y comunidad
2. 10:30 - Yoga al sol
3. 11:30 - Charla: Cocina sin desperdicio (Marina Ré) ⭐
4. 12:30 - Taller infantil: Pinturas
5. 13:00 - Almuerzo · Mercado
6. 15:00 - Conversatorio: Ser productor hoy
7. 16:00 - Cata de cervezas
8. 17:00 - Taller: Fermentos vivos (Raíz Fermentados) ⭐
9. 18:00 - Charla: Diseño y materia prima
10. 19:00 - Música: Las Hermanas
11. 20:30 - Fogón de cierre

**DOMINGO 15**:
1. 10:00 - Meditación + caminata
2. 11:00 - Cuentos para sembrar
3. 12:00 - Taller: Tinción natural
4. 13:00 - Almuerzo de cosecha (Cocina del Valle) ⭐
5. 15:00 - Charla: Comunidad y propósito (Diego Marín)
6. 16:30 - Mesa redonda: ¿Qué viene?
7. 18:00 - Música: Coro del Limay
8. 19:30 - Cierre: agradecimiento + brindis ⭐

---

### 3.5 PAGE ENTRADAS (PageEntradas)

#### TIPOS DE ENTRADA (3)

**1. RAÍCES (Early Bird)**
- Precio: $22.000 (regular $30.000)
- Descuento: −27%
- Badge: "Early Bird"
- Color: Ocre
- Incluye:
  - Acceso general 1 día
  - Ingreso desde apertura (12:00 hs)
  - Acceso a todos los escenarios
  - Zona wellness: acceso libre

**2. RAÍCES (General)** ⭐ MÁS ELEGIDA
- Precio: $30.000
- Badge: "General"
- Color: Verde (destacado)
- Mismos beneficios que Early Bird

**3. BOSQUE (VIP)**
- Precio: $80.000
- Badge: "VIP"
- Color: Tierra
- Incluye:
  - Acceso VIP 1 día
  - Kit de bienvenida (botella, snack, bandana)
  - Baños VIP exclusivos
  - Zona VIP con barra

#### MÉTODOS DE PAGO
- Visa, Mastercard, Amex
- Mercado Pago, Modo
- Transferencia

#### FAQ (5 preguntas)
1. ¿Puedo ir con mi mascota?
2. ¿Hay accesibilidad para sillas de ruedas?
3. ¿Puedo llevar mi propio termo o vajilla?
4. ¿Hay estacionamiento?
5. ¿Se devuelve el dinero si llueve?

---

### 3.6 PAGE PARTICIPA (PageParticipa)

7 convocatorias con formularios:

#### 1. FERIANTES / EMPOSITORES
**Sections**:
1. Datos del emprendimiento (nombre, responsable, email, tel, localidad, Instagram)
2. La propuesta (categoría, descripción, antigüedad, referencia)
3. Tamaño de stand (Micro $380, Estándar $560, Grande $780, Premium $1.300 - con early bird −15%)
4. Experiencia y logística
5. Sustentabilidad (prácticas, plástico, habilitaciones)
6. Motivación

**Categorías**:
- Alimentación
- Cosmética
- Diseño
- Bienestar
- Infantil
- Gastronomía

---

#### 2. GASTRONÓMICOS
**Sections**:
1. Datos del emprendimiento
2. Propuesta gastronómica (descripción, categoría, menú, % ingredientes locales, dietas especiales)
3. Tamaño y logística (Snackería 2×3m $450k, Estándar 3×5m $750k, Premium 4×6m $1.2M)
4. Sustentabilidad y documentación

**Categorías gastronómicas**:
- Comida saludable rápida
- Gastronomía bio
- 100% vegano
- Bebidas saludables
- Snacks naturales
- Repostería sin TACC
- Panadería artesanal
- Cocina regional patagónica

---

#### 3. ARTISTAS / MÚSICOS
**Sections**:
1. Datos del proyecto (nombre, representante, email, tel, ciudad, redes)
2. Propuesta artística (descripción, género, material para escuchar, encaje)
3. Escenario y rider (preferencia de escenario, duración, rider técnico)
4. Trayectoria y región

**Escenarios**:
- "El Claro" - 8.000 personas
- "El Monte" - 1.500 personas (íntimo)
- Domo Sonoro - 150 personas (inmersivo)

**Géneros**:
- Folk, Indie, Folk andino, Electrónica orgánica, Ambient, Pop consciente, Jazz, Música ceremonial, Fusión, DJ set

---

#### 4. SPEAKERS
**Sections**:
1. Datos del speaker
2. Propuesta de charla (título, descripción, temática, duración, componente práctico)
3. Trayectoria y credenciales (formación, experiencia, charlas previas)
4. Disponibilidad y cierre

**Temáticas**:
- Nutrición funcional
- Mindfulness
- Sustentabilidad
- Movimiento consciente
- Emprendimiento con propósito
- Crianza consciente
- Identidad patagónica
- Bienestar holístico

---

#### 5. FACILITADORES (Yoga, Meditación, Bienestar)
**Sections**:
1. Datos del facilitador
2. Práctica propuesta (disciplina, descripción, espacio, duración, nivel, materiales)
3. Formación y trayectoria
4. Disponibilidad y cierre

**Disciplinas**:
- Yoga (Hatha, Vinyasa, Yin, Nidra, Kundalini, infantil)
- Meditación, Mindfulness, Pranayama
- Soundbath, Movimiento consciente, Danza
- Tai Chi, Reiki, Terapia energética
- Activación funcional

**Espacios**:
- Domo de Meditación (cubierto, 150 pers)
- La Pradera (aire libre, 80-100 pers)
- Sala de Terapias (privado, 20 pers)

---

#### 6. SPONSORS / ALIANZAS
**Sections**:
1. Datos de la organización
2. Propuesta de alianza

*Nota*: Este form envía por mailto (no por EmailJS)

---

#### 7. PRENSA / MEDIA
**Sections**:
1. Datos del medio (nombre, tipo, link, alcance)
2. Datos del periodista (nombre, rol, email, tel, equipo)
3. Cobertura planificada (tipo, ángulo, entrevistas)
4. Días y accesos

**Tipos de cobertura**:
- Nota escrita
- Fotografía editorial
- Video / reels
- Transmisión en vivo
- Podcast / audio
- Stories

---

## 4. DATOS DE EXPOSITORES

**Total**: 22 expositores (ficticios pero coherentes)

### Por Categoría

#### ALIMENTACIÓN (7)
1. **Miel del Sur** - Villa La Angostura
   - "Apicultores patagónicos de tercera generación. Mieles puras y fermentos."

2. **Raíz Fermentados** - Neuquén
   - "Kimchi, kombuchas y pickles vivos. Ciencia y paciencia."

3. **Algarroba Norteña** - Neuquén
   - "Harinas, panes y dulces a base de algarroba y frutos nativos."

4. **Quinoa Andina** - Chos Malal
   - "Quinoa, kiwicha y semillas ancestrales del norte neuquino."

5. **Yerba Patagónica** - Neuquén
   - "Blends de hierbas patagónicas, yerba mate orgánica de proyectos justos."

6. **Pan de Piedra** - Villa La Angostura
   - "Panadería de masa madre, harinas de molino propio."

7. **Brotes y Hojas** - Plottier
   - "Microverdes, brotes y plantas comestibles cultivadas hidropónicamente."

#### COSMÉTICA (2)
1. **Cosmética Aroma** - San Martín de los Andes
   - "Jabones, aceites y bálsamos con botánicos del bosque andino."

2. **Aceites de Estepa** - Cipolletti
   - "Aceites prensados en frío: rosa mosqueta, almendra, lino."

#### DISEÑO (6)
1. **Telas Vivas Patagonia** - Bariloche
   - "Textiles teñidos con plantas nativas. Cada pieza, una temporada."

2. **Tintas Naturales** - El Bolsón
   - "Pinturas de cáscaras, raíces y minerales del valle."

3. **Casa Tierra** - Neuquén
   - "Cerámica utilitaria cocida a leña, esmaltes minerales."

4. **Madera Hablante** - Aluminé
   - "Mobiliario en madera caída. Cada mueble lleva el nombre de su árbol."

5. **Lana Tejedora** - Junín de los Andes
   - "Tejidos en telar con lana de oveja mapuche, técnicas heredadas."

6. **Hueco Cerámica** - Bariloche
   - "Vajilla en gres y porcelana. Formas que se adaptan a las manos."

#### BIENESTAR (2)
1. **Verde Quieto** - Bariloche
   - "Tisanas, aceites esenciales y prácticas para frenar."

2. **Sentidos Yoga** - Neuquén
   - "Clases abiertas, meditación al amanecer y trabajo corporal."

#### INFANTIL (3)
1. **Brote de Lana** - Junín de los Andes
   - "Juguetes blandos de lana orgánica y madera local."

2. **Pequeños Granos** - Centenario
   - "Cuentos, semilleros y juegos para sembrar curiosidad temprana."

3. **Pequeño Bosque** - El Chocón
   - "Talleres de bioconstrucción y juegos al aire libre para chicos."

#### GASTRONOMÍA (2)
1. **Cocina del Valle** - Plottier
   - "Conservas de la huerta, mermeladas raras, salsas con historia."

2. **Lúpulo Hermano** - El Bolsón
   - "Cerveza artesanal con lúpulo cultivado a 60 km de acá."

---

## 5. DATOS DE PROGRAMA / HORARIOS

### Actividades por Tipo
- **Mercado**: Recorrer los stands y conversar
- **Charlas**: Conversaciones sobre origen, oficio y futuro
- **Talleres**: Aprender haciendo (cocina, tierra, textil)
- **Música**: Música en vivo en el escenario principal
- **Bienestar**: Movimiento, respiración, pausa en la Pradera
- **Zona Brotes**: Talleres de tierra y semillas para chicos

### Speakers (6)
1. **Valeria Soto** - Ingeniera agrónoma · INTA Patagonia
2. **Marina Ré** - Cocinera · autora de 'Provincia'
3. **Diego Marín** - Antropólogo · UNCo
4. **Lara Pichún** - Tejedora · maestra mapuche
5. **Tomás Vega** - Chef · Cocina Abierta
6. **Ana Lemos** - Periodista de impacto · La Tinta

### Cinco Zonas Experienciales
1. **Mercado de Productores** - Conversar con quien hizo lo que comprás
2. **Cocina Abierta** - Fuego, fermentos y recetas
3. **Escenario Principal** - Música en vivo 3 días
4. **Zona Brotes** - Talleres de tierra para chicos
5. **Pradera** - Movimiento, bienestar y charlas (mediodía a atardecer)

---

## 6. FORMULARIOS

### Formularios Configurados (7)

Estructura general de formularios:
```
{
  pills: ["dato1", "dato2"],
  note: "Nota inicial con **negrita**",
  submitNote: "Nota de cierre",
  sections: [
    {
      num: "01",
      label: "Categoría",
      title: "Título de la sección",
      desc: "Descripción",
      items: [
        { name, label, type, required?, placeholder?, hint?, rows?, options? }
      ]
    }
  ]
}
```

### Tipos de Campos
- **text**: Entrada de texto simple
- **email**: Validación de email
- **tel**: Número telefónico
- **url**: URL
- **textarea**: Área de texto multilinea
- **select**: Dropdown selector
- **radio**: Botones de opción única
- **checkbox**: Checkboxes múltiples
- **row**: 2 campos en fila (layout)

### Validación y Envío
- **EmailJS**: Envío desde frontend (no backend)
- **Public Key**: Se reemplaza con valor real en EMAILJS_CONFIG
- **Service ID**: Se obtiene de EmailJS
- **Template ID**: Se asigna a cada tab en PARTICIPA_TABS

### Sponsors
- **Envío especial**: Mailto a hola@bioraiz.net
- No usa EmailJS, abre cliente de correo

---

## 7. LINKS Y NAVEGACIÓN

### NavBar (Fixed)
- Logo clickeable → Home
- 6 links de navegación:
  1. Inicio (home)
  2. La Feria (feria)
  3. Expositores (expositores)
  4. Programa (programa)
  5. Entradas (entradas)
  6. Participá (participa)
- Botón CTA: "Entradas"
- Menú burger (mobile)

### Footer (Dark)
**Secciones**:
1. Logo + tagline + fecha/lugar
2. Navegar (links internos)
3. Comunidad (postulación, voluntariado, sustentabilidad)
4. Contacto (email, WhatsApp, redes sociales)

**Redes Sociales**:
- Instagram: https://www.instagram.com/bioraiz.nqn/
- Facebook: https://www.facebook.com/people/Bioraiz/61590140866075/

**Contacto**:
- Email: hola@bioraiz.net
- WhatsApp: +54 9 2995781006
- Link WhatsApp: https://wa.me/5492995781006

**Frase de footer (random)**:
- "Esta página se carga con menos de 200 kb. La sustentabilidad también es digital."
- "Cada link visitado consume menos que un mate. Pero igual, andá despacio."
- "Tipografía cargada una sola vez. El resto, te lo regala el navegador."
- "Sin trackers, sin pop-ups, sin oscuridad. Solo BIORAIZ."

---

## 8. HEADER Y FOOTER

### HEADER (Fijo)

**Componente**: `Header({ page, setPage, transparent })`

**Propiedades**:
- Fixed position (top: 0, z-index: 50)
- Transparente al inicio, blanco con blur al scroll
- Transición suave (300ms)

**Contenido**:
- Logo BIORAIZ (izq)
- Navegación horizontal 6 links (centro, hidden en mobile)
- Botón "Entradas" (derecha, hidden en mobile)
- Burger menu (derecha, solo mobile)

**Estilos**:
- Background: rgba(250, 246, 237, 0.86) (blurred)
- BorderBottom: 0.5px solid --bz-borde-ligero
- Padding dinámico (20px → 12px al scroll)

**Mobile Drawer**:
- Animación bz-slide-down (240ms)
- Fondo beige hueso
- Links verticales con borde inferior

---

### FOOTER

**Componente**: `Footer({ setPage })`

**Layout**: Grid 4 columnas (responsive)

**Columna 1: Brand**
- Logo BIORAIZ
- Tagline italic: "Donde la tierra florece y la comunidad crece."
- Fecha/lugar en pequeño

**Columna 2: Navegar**
- Título en eyebrow ocre
- Links internos (excepto Home):
  - La Feria
  - Expositores
  - Programa
  - Entradas
  - Participá

**Columna 3: Comunidad**
- Postulate como expositor
- Voluntariado
- Sustentabilidad

**Columna 4: Contacto**
- Email: hola@bioraiz.net
- WhatsApp: +54 9 2995781006
- Redes: Instagram + Facebook (iconos animados)

**Bottom Bar**:
- Frase eco aleatoria (4 opciones)
- Copyright: © 2026 BIORAIZ · Neuquén, Argentina
- Tipografía: DM Mono, pequeño

**Estilos**:
- Background: --bz-fondo-dark (#1E3320)
- Color: --bz-crema-texto
- Borde top: 0.5px solid rgba(...)

---

## 9. COMPONENTES REUTILIZABLES

### Componentes Globales

#### BzLogo
- Props: `size` (default 28), `mono` (b/w), `color`
- Mostración: Imagen + "BIORAIZ" wordmark
- Responsive a color de fondo

#### Counter
- Props: `to` (número), `suffix`, `duration`
- IntersectionObserver para trigger de animación
- Easing cúbico

#### useReveal Hook
- Detecta elementos `.reveal` en viewport
- Añade clase `.in` para trigger de animación
- Fallback de safety (1200ms)

#### SectionHead
- Props: `eyebrow`, `title`, `sub`, `align`, `color`, `accent`
- Estructura: eyebrow + display title + subtítulo italic

#### Placeholder
- Props: `label`, `ratio` (aspect-ratio), `dark`, `style`, `children`, `decoration`
- Patrón diagonal rayado
- Para imágenes/videos placeholder

#### LeafShape, CircleShape
- SVGs decorativos
- Props: `size`, `color`, `rotate` (LeafShape), `style`

#### ExpositorCard, CategoriaCard
- Grid card con imagen placeholder
- Información del expositor/categoría
- Hover animation (translateY, shadow)

#### CategoriaIcon
- Iconos por categoría (12 categorías)
- SVG line icons, 30×30px

#### Tags
- `.tag` - Verde pasto
- `.tag-ocre` - Ocre
- `.tag-tierra` - Rojo tierra
- `.tag-outline` - Solo borde

---

## 10. DATOS TÉCNICOS

### Email & Formularios

**Configuración EmailJS**:
```javascript
const EMAILJS_CONFIG = {
  publicKey: "REEMPLAZAR_PUBLIC_KEY",
  serviceId: "REEMPLAZAR_SERVICE_ID",
};
```

**Templates necesarios**:
- REEMPLAZAR_TEMPLATE_feriantes
- REEMPLAZAR_TEMPLATE_gastronomicos
- REEMPLAZAR_TEMPLATE_artistas
- REEMPLAZAR_TEMPLATE_speakers
- REEMPLAZAR_TEMPLATE_facilitadores
- REEMPLAZAR_TEMPLATE_sponsors
- REEMPLAZAR_TEMPLATE_prensa

### Datos Globales Expuestos
- `BZ_DATE`, `BZ_DATE_FULL`, `BZ_LOCATION`
- `BZ_EMAIL`, `BZ_WHATSAPP_LABEL`, `BZ_WHATSAPP_LINK`
- `BZ_INSTAGRAM`, `BZ_FACEBOOK`
- `CATEGORIES`, `EXPOSITORES`, `CATEGORIAS_STANDS`
- `DIAS`, `ACTIVIDADES`, `SPEAKERS`
- `TICKETS`, `FAQ`, `VALORES`, `NUMEROS`, `COMPROMISOS`
- `FORM_SCHEMAS`, `PARTICIPA_TABS`

---

## 11. GUÍA PARA MIGRACIÓN A REACT

### Estructura Propuesta

```
src/
├── pages/
│   ├── Home.jsx
│   ├── Feria.jsx
│   ├── Expositores.jsx
│   ├── Programa.jsx
│   ├── Entradas.jsx
│   └── Participa.jsx
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── SectionHead.jsx
│   ├── Counter.jsx
│   ├── ExpositorCard.jsx
│   ├── CategoriaCard.jsx
│   ├── TicketCard.jsx
│   └── [otros]
├── hooks/
│   ├── useReveal.js
│   └── [otros]
├── data/
│   ├── constants.js (BZ_DATE, BZ_EMAIL, etc)
│   ├── expositores.js (EXPOSITORES)
│   ├── speakers.js (SPEAKERS)
│   ├── programa.js (DIAS, ACTIVIDADES)
│   ├── tickets.js (TICKETS)
│   ├── faq.js (FAQ)
│   └── forms.js (FORM_SCHEMAS)
├── styles/
│   ├── variables.css (custom properties)
│   ├── global.css
│   └── components.css
├── assets/
│   ├── [images]
│   └── [icons]
├── App.jsx
└── main.jsx
```

### Consideraciones Clave

1. **State Management**: 
   - Usar `useState` para page navigation
   - Context API para datos globales (opcional)

2. **Animations**:
   - React Spring o Framer Motion para animaciones
   - IntersectionObserver para reveal animations

3. **Forms**:
   - React Hook Form + Zod para validación
   - Mantener EmailJS para envío

4. **Images**:
   - Crear paths para assets/images
   - Usar componentes Image o Next Image (si es Next.js)

5. **SEO**:
   - Helmet para meta tags
   - Structured data para eventos

6. **Performance**:
   - Code splitting por páginas
   - Lazy loading de imágenes
   - Memoización de componentes pesados

---

## 12. RESUMEN EJECUTIVO

| Aspecto | Detalle |
|--------|---------|
| **Evento** | BIORAIZ - Feria Sustentable Patagonia |
| **Fechas** | 13-15 Nov 2026 |
| **Lugar** | Las Cortaderas, Neuquén |
| **Páginas** | 6 páginas principales + formularios |
| **Expositores** | 22 (ficticios coherentes) |
| **Actividades** | 30+ actividades por fin de semana |
| **Categorías** | 8 (Feriantes, Gastro, Artistas, Speakers, Facilitadores, Sponsors, Prensa) |
| **Colores** | Verde + Ocre + Beige (paleta warm) |
| **Tipografía** | Playfair Display + DM Sans + DM Mono |
| **Stack Tech** | React 18 + Babel (inlineado) + EmailJS |
| **Responsive** | Sí (mobile-first con media queries) |

---

**Archivo actualizado**: 2 Junio 2026
**Versión HTML analizada**: BIORAIZ - completo.html (versión inlineada single-file)
