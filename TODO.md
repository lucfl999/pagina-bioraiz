# TODO para BIORAIZ - Tareas Específicas

## 🎯 Tareas de Implementación (En Orden)

### Fase 1: Preparación GitHub (Hoy)
- [ ] Crear repositorio en GitHub: `bioraiz-website`
- [ ] Hacer primer push del código
- [ ] Verificar que sea privado o público según prefiera

### Fase 2: Railway (Mañana)
- [ ] Crear cuenta Railway (railroad.app)
- [ ] Crear proyecto
- [ ] Agregar PostgreSQL
- [ ] Copiar DATABASE_URL
- [ ] Conectar GitHub (rama main)
- [ ] Configurar variables de entorno:
  ```
  NODE_ENV=production
  RESEND_API_KEY=...
  JWT_SECRET=...
  ADMIN_EMAIL=hola@bioraiz.net
  STRIPE_SECRET_KEY=...
  ```
- [ ] Ejecutar init.sh para crear schema

### Fase 3: Cloudflare Pages (Frontend)
- [ ] Crear cuenta Cloudflare
- [ ] Pages → Connect Repository
- [ ] Seleccionar `bioraiz-website`
- [ ] Build command: `npm run build -w frontend`
- [ ] Publish: `frontend/dist`
- [ ] Agregar variable: `VITE_API_URL=https://api.bioraiz.net/api`
- [ ] Esperar primer deploy

### Fase 4: Cloudflare Workers (API Gateway)
- [ ] En Cloudflare: Workers & Pages
- [ ] Crear nuevo Worker
- [ ] Copiar código de `workers/src/index.ts`
- [ ] Configurar wrangler.toml
- [ ] Deploy

### Fase 5: Dominio bioraiz.net
- [ ] Si está con otro registrador:
  - Cambiar nameservers a:
    - nat.ns.cloudflare.com
    - noel.ns.cloudflare.com
  - Esperar 24-48h
- [ ] En Cloudflare DNS agregar:
  ```
  Nombre    Tipo   Contenido
  @         CNAME  bioraiz-website.pages.dev
  www       CNAME  bioraiz-website.pages.dev
  api       CNAME  workers.bioraiz.workers.dev
  ```

### Fase 6: Email (Resend)
- [ ] Crear cuenta en https://resend.com
- [ ] Copiar API Key
- [ ] En Resend dashboard → Emails → Agregar bioraiz.net
- [ ] Seguir instrucciones de verificación DNS
- [ ] Guardar key en Railway: `RESEND_API_KEY=...`

### Fase 7: Stripe (Venta de Entradas)
- [ ] Crear cuenta en stripe.com
- [ ] Obtener Secret Key
- [ ] Obtener Publishable Key
- [ ] Guardar en Railway: `STRIPE_SECRET_KEY=...`
- [ ] Configurar webhooks
- [ ] Implementar checkout en página Entradas

### Fase 8: GitHub Actions Secrets
- [ ] En repo Settings → Secrets:
  - [ ] CLOUDFLARE_API_TOKEN
  - [ ] CLOUDFLARE_ACCOUNT_ID
  - [ ] RAILWAY_TOKEN
  - [ ] RAILWAY_PROJECT_ID

---

## 📝 Formularios a Implementar

### 1️⃣ Formulario de Contacto General
**Ubicación**: Página Home o footer
**Campos**:
- Nombre (requerido)
- Email (requerido, válido)
- Mensaje (requerido, min 10 caracteres)

**Acción**:
```
POST /api/forms/contact
{
  "name": "Juan",
  "email": "juan@example.com",
  "message": "Hola, tengo una pregunta..."
}
→ Envía a: hola@bioraiz.net
→ Confirma a: juan@example.com
```

### 2️⃣ Formulario "Avisame cuando salga"
**Ubicación**: Home (hero section), todas las páginas (sticky)
**Campos**:
- Email (requerido, válido)

**Acción**:
```
POST /api/subscribers
{
  "email": "interesado@example.com"
}
→ Guarda en BD tabla subscribers
→ Envía bienvenida al email
```

### 3️⃣ Formulario de Participación
**Ubicación**: Página "Participá"
**Campos**:
- Nombre productor (requerido)
- Email (requerido, válido)
- Nombre del producto (requerido)
- Categoría (select: Alimentación, Cosmética, Diseño, etc.)
- Descripción (requerido, min 20 caracteres)

**Acción**:
```
POST /api/forms/participa
{
  "name": "María García",
  "email": "maria@example.com",
  "productName": "Mieles Puras",
  "category": "alimentos",
  "description": "Miel orgánica de Patagonia..."
}
→ Envía a: hola@bioraiz.net
→ Confirma a: maria@example.com
```

### 4️⃣ Formulario de Press Kit
**Ubicación**: Página "Prensa"
**Campos**:
- Nombre (requerido)
- Email (requerido, válido)
- Medio/Programa (requerido)
- Propósito (texto libre)

**Acción**:
```
POST /api/forms/press-kit
{
  "name": "Periodista",
  "email": "prensa@diario.com",
  "media": "Diario Río Negro",
  "purpose": "Nota sobre la feria"
}
→ Envía a: hola@bioraiz.net
→ Adjunta PDF con press kit
→ Confirma a: prensa@diario.com
```

### 5️⃣ Compra de Entradas
**Ubicación**: Página "Entradas"
**Campos**:
- Tipo entrada (Early Bird, Regular, VIP)
- Cantidad
- Email
- Datos personales (nombre, teléfono)

**Acción**:
```
POST /api/tickets/create
{
  "ticketType": "early",
  "quantity": 2,
  "email": "comprador@example.com"
}
→ Redirige a Stripe checkout
→ Guarda en BD tabla tickets
→ Envía confirmación por email
```

---

## 📊 Emails a Enviar

### 1. Email de Confirmación de Formulario
**A**: usuario@example.com
**Asunto**: "Recibimos tu solicitud - BIORAIZ"
**Contenido**: 
- Saludo personalizado
- Confirmación que recibimos el formulario
- Tiempo estimado de respuesta
- Logo BIORAIZ

### 2. Email de Bienvenida (Newsletter)
**A**: suscriptor@example.com
**Asunto**: "¡Bienvenido a BIORAIZ!"
**Contenido**:
- Bienvenida
- Información breve del evento
- Enlace a web
- Info para darse de baja

### 3. Email de Notificación (Cuando salgan entradas)
**A**: todos los suscriptores
**Asunto**: "¡Las entradas de BIORAIZ están disponibles!"
**Contenido**:
- Anuncio
- Link para comprar
- Datos de evento
- Early bird deadline

### 4. Email de Confirmación de Compra
**A**: comprador@example.com
**Asunto**: "Entrada confirmada - BIORAIZ"
**Contenido**:
- Resumen de compra
- Número de entrada
- Instrucciones para llegar
- Info del evento

### 5. Email a Admin (hola@bioraiz.net)
**Para**: formularios, participación, prensa
**Contenido**: Toda la info del formulario para revisión

---

## 🔧 Validaciones Requeridas

### Email
- ✅ Formato válido: `user@domain.com`
- ✅ No vacío
- ✅ Backend + Frontend

### Nombre
- ✅ Mínimo 2 caracteres
- ✅ No números
- ✅ No vacío

### Mensaje
- ✅ Mínimo 10 caracteres
- ✅ Máximo 1000 caracteres
- ✅ No vacío

### Entradas
- ✅ Cantidad > 0
- ✅ Cantidad <= 10 (por transacción)
- ✅ Tipo válido

---

## 🎨 Componentes de Formularios a Crear

### ContactForm.jsx
```jsx
<form onSubmit={handleSubmit}>
  <input name="name" placeholder="Tu nombre" required />
  <input name="email" type="email" placeholder="tu@email.com" required />
  <textarea name="message" placeholder="Tu mensaje" minLength="10" required />
  <button type="submit">Enviar</button>
  {status && <p>{status}</p>}
</form>
```

### NewsletterForm.jsx
```jsx
<form onSubmit={handleSubscribe}>
  <input name="email" type="email" placeholder="tu@email.com" required />
  <button type="submit">Suscribirse</button>
</form>
```

### ParticipationForm.jsx
```jsx
<form onSubmit={handleSubmit}>
  <input name="name" placeholder="Tu nombre" required />
  <input name="email" type="email" required />
  <input name="productName" placeholder="Nombre del producto" required />
  <select name="category" required>
    <option>Alimentación</option>
    <option>Cosmética</option>
    <option>Diseño</option>
    {/* etc */}
  </select>
  <textarea name="description" minLength="20" required />
  <button type="submit">Postularse</button>
</form>
```

---

## 📞 Info de Contacto a Actualizar

- **Email admin**: hola@bioraiz.net
- **Teléfono**: +54 9 299 XXXXXXX (completar)
- **Dominio**: bioraiz.net
- **Redes**:
  - Instagram: @bioraiz
  - Facebook: bioraiz.patagonia

---

## 🚀 Checklist Final

- [ ] Todos los formularios funcionando
- [ ] Emails recibidos en hola@bioraiz.net
- [ ] Newsletter suscriptores en BD
- [ ] HTTPS en todo (https://bioraiz.net)
- [ ] Responsive en móvil
- [ ] Performance: <3s load time
- [ ] Stripe payments funcionando
- [ ] Analytics configurado
- [ ] Backup DB automatizado
- [ ] Monitoring activo

---

**Estimado de tiempo**: 
- Setup inicial: 2-3 horas
- Implementar formularios: 4-6 horas
- Testing: 2-3 horas
- Deploy: 1 hora
- **Total**: 10-13 horas

**Próximo**: Leer DEPLOYMENT.md sección por sección 👇
