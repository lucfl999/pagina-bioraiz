# BIORAIZ — Guía Completa de Deployment Production-Ready

## 🎯 Resumen

Este es un proyecto production-ready con arquitectura moderna:

- **Frontend**: React + Vite → Cloudflare Pages
- **API Backend**: Node.js/Express → Railway
- **Base de datos**: PostgreSQL → Railway
- **API Gateway**: Cloudflare Workers
- **Email**: Resend or SendGrid
- **Dominios**: bioraiz.net
- **CI/CD**: GitHub Actions

## 📋 Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      bioraiz.net                              │
│              (Cloudflare Pages + Workers)                     │
└──────────────┬──────────────────────────────┬────────────────┘
               │                              │
         ┌─────▼─────────┐           ┌───────▼──────────┐
         │ Frontend       │           │ Cloudflare       │
         │ (React/Vite)   │           │ Workers          │
         │                │           │ (Rate limit)     │
         └─────┬─────────┘           └───────┬──────────┘
               │                              │
               └──────────────┬───────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Railway Backend   │
                    │  (Express.js)      │
                    │  (Node.js 20.x)    │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Railway Database  │
                    │  (PostgreSQL)      │
                    │                    │
                    └────────────────────┘
```

## 🚀 Pasos de Deployment

### 1. Preparación Inicial

#### 1.1 Crear repositorio en GitHub

```bash
git init
git remote add origin https://github.com/tu-usuario/bioraiz-website.git
git add .
git commit -m "Initial commit: production-ready setup"
git push -u origin main
```

#### 1.2 Crear .env local

```bash
cp .env.example .env
```

Completar con variables reales:
```
DATABASE_URL=postgresql://user:pass@host:5432/bioraiz_dev
RESEND_API_KEY=re_xxxxx
JWT_SECRET=tu_secret_muy_largo_aqui
CLOUDFLARE_API_TOKEN=xxx
STRIPE_SECRET_KEY=sk_xxx
CORS_ORIGIN=http://localhost:5173
```

#### 1.3 Instalar dependencias

```bash
npm install
# Esto instala todas las dependencias en todos los workspaces
```

---

### 2. Configurar Railway

#### 2.1 Crear cuenta y proyecto

1. Ir a https://railway.app
2. Sign up (puedes usar GitHub)
3. Crear nuevo proyecto
4. Seleccionar "PostgreSQL"

#### 2.2 Obtener DATABASE_URL

```bash
# Railway muestra la URL de la DB en el dashboard
# Copiarla a .env: DATABASE_URL=postgresql://...
```

#### 2.3 Configurar variables de entorno en Railway

En el dashboard de Railway:
- Project Settings → Variables
- Agregar todas las variables del .env

Copiar exactamente:
```
NODE_ENV=production
RESEND_API_KEY=...
JWT_SECRET=...
STRIPE_SECRET_KEY=...
ADMIN_EMAIL=hola@bioraiz.net
CORS_ORIGIN=https://bioraiz.net
```

#### 2.4 Configurar railway.json

El archivo `railway.json` ya está configurado. Asegúrate de que la sección `build` apunta correctamente:

```json
{
  "build": {
    "builder": "nixpacks",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

#### 2.5 Conectar GitHub

En Railway:
1. Click en "Connect Repo"
2. Autorizar tu cuenta de GitHub
3. Seleccionar el repositorio bioraiz-website
4. Configurar auto-deploy en branch `main`

---

### 3. Configurar Cloudflare Pages (Frontend)

#### 3.1 Crear cuenta Cloudflare

1. Ir a https://dash.cloudflare.com
2. Sign up (gratis)
3. En sidebar → Pages
4. Click "Connect to Git"

#### 3.2 Conectar repositorio

1. Autorizar GitHub
2. Seleccionar `bioraiz-website`
3. Configurar:
   - **Build command**: `npm run build -w frontend`
   - **Build output directory**: `frontend/dist`
   - **Root directory**: `frontend`

#### 3.3 Configurar variables de entorno

En Cloudflare Pages → Settings → Environment variables:

```
VITE_API_URL=https://api.railway-project.up.railway.app/api
```

**IMPORTANTE**: Cambiar la URL al dominio real de tu Railway deployment.

---

### 4. Configurar Cloudflare Workers (API Gateway)

#### 4.1 Crear Worker

```bash
npm run deploy -w workers
```

O manualmente:
1. Cloudflare Dashboard → Workers & Pages → Create
2. Crear nuevo Worker
3. Copiar el código de `workers/src/index.ts`

#### 4.2 Configurar rutas

En el wrangler.toml:

```toml
route = "api.bioraiz.net/*"
zone_id = "tu_zone_id"
```

---

### 5. Configurar dominio bioraiz.net

#### 5.1 Si el dominio está en Cloudflare

1. Cloudflare Dashboard → DNS
2. Crear registros CNAME:
   ```
   @  CNAME  bioraiz-website.pages.dev
   www CNAME bioraiz-website.pages.dev
   api CNAME workers.bioraiz.workers.dev
   ```

#### 5.2 Si el dominio está en otro registrar

1. Cambiar nameservers a Cloudflare:
   - `nat.ns.cloudflare.com`
   - `noel.ns.cloudflare.com`
2. Esperar 24-48 horas para propagación
3. Luego hacer lo del punto 5.1

---

### 6. Configurar Email

#### 6.1 Con Resend (Recomendado)

1. Ir a https://resend.com
2. Sign up (gratis para primeros 100 emails)
3. Dashboard → API Keys
4. Crear key y copiar a `RESEND_API_KEY`
5. Verificar dominio: https://resend.com/emails (agregar bioraiz.net)

#### 6.2 Con SendGrid (Alternativa)

1. Ir a https://sendgrid.com
2. Sign up (gratis)
3. Settings → API Keys
4. Crear nueva key
5. Copiar a `SENDGRID_API_KEY`

---

### 7. Configurar Stripe (para venta de entradas)

#### 7.1 Crear cuenta

1. Ir a https://stripe.com
2. Sign up
3. Dashboard → API keys
4. Copiar Secret key a `STRIPE_SECRET_KEY`
5. Copiar Publishable key a `.env`

#### 7.2 Configurar webhooks

```bash
# Railway proporciona una URL pública
# Ejemplo: https://api-xxx.up.railway.app/api/tickets/webhook

# En Stripe Dashboard → Webhooks
# Agregar endpoint y seleccionar eventos:
# - charge.succeeded
# - charge.failed
# - payment_intent.succeeded
```

---

### 8. Configurar GitHub Actions (CI/CD)

El archivo `.github/workflows/deploy.yml` ya está configurado.

#### 8.1 Agregar Secrets a GitHub

En tu repo → Settings → Secrets and variables → Actions:

```
CLOUDFLARE_API_TOKEN=xxx
CLOUDFLARE_ACCOUNT_ID=xxx
RAILWAY_TOKEN=xxx
RAILWAY_PROJECT_ID=xxx
```

#### 8.2 Obtener estos valores

**Cloudflare:**
```bash
# Dashboard → Account
# API Tokens → Create token (Cloudflare Pages)
# Account ID: visible en URL o Settings
```

**Railway:**
```bash
# Dashboard → Project → Settings
# Token: Account → Tokens (crear nuevo)
```

---

## 📊 Testing antes de production

### Test Local

```bash
# Terminal 1: Frontend
npm run dev -w frontend

# Terminal 2: API
npm run dev -w api

# Visitar http://localhost:5173
```

### Test Staging

```bash
git add .
git commit -m "Test en staging"
git push origin develop  # Si existe rama develop
```

GitHub Actions ejecutará automáticamente los tests.

---

## 📈 Monitoreo

### Railway

- Dashboard → Monitoring
- Ver logs, memoria, CPU

### Cloudflare

- Pages → Analytics
- Ver requests, cache status

### Errores

```bash
# Ver logs de Railway
railway logs -w api

# Ver logs de Cloudflare Workers
wrangler tail workers
```

---

## 🔐 Seguridad

- [ ] JWT_SECRET: Cambiar a valor seguro (mínimo 32 caracteres)
- [ ] CORS_ORIGIN: Usar solo https://bioraiz.net en production
- [ ] Habilitar HTTPS everywhere
- [ ] Rate limiting activado en Workers
- [ ] Database: Backup automático configurado
- [ ] Secrets: Nunca commitear .env

---

## 📮 Emails Transaccionales

Rutas implementadas:

```
POST /api/forms/contact
  → Envía a hola@bioraiz.net y confirma al usuario

POST /api/forms/participa  
  → Envía solicitud a hola@bioraiz.net

POST /api/subscribers
  → Suscripción y envío de bienvenida

POST /api/subscribers/notify-all
  → Envía mail a todos los suscriptores
```

---

## 🐛 Troubleshooting

### Error: "Database connection failed"
- Verificar DATABASE_URL en Railway
- Crear schema: `psql $DATABASE_URL < database/schema.sql`

### Error: "CORS error"
- Verificar CORS_ORIGIN en variables
- Debe coincidir con el dominio del frontend

### Mails no se envían
- Verificar API key de Resend/SendGrid
- Revisar logs en Railway
- Verificar email en spam

### Cloudflare Pages no actualiza
- Esperar 1-2 minutos
- Limpiar caché: Caching → Purge Cache

---

## 🚢 Próximos pasos

1. ✅ Migrar componentes del HTML al React modular
2. ✅ Completar todas las páginas
3. ✅ Integrar Stripe checkout
4. ✅ Configurar envío de grilla de programa
5. ✅ Agregar administrador panel para gestionar suscriptores
6. ✅ Analytics (Google Analytics o Plausible)

---

## 📞 Support

Para issues:
1. Ver logs: `railway logs`
2. Verificar status en GitHub Actions
3. Revisar Cloudflare Analytics

---

**Version**: 1.0.0  
**Última actualización**: 2 de junio, 2026  
**Mantenedor**: BIORAIZ Team
