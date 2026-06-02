# 🌱 BIORAIZ — La feria sustentable de la Patagonia

Website oficial de BIORAIZ, una feria de emprendimientos sustentables en Neuquén.

**Evento:** 13, 14 y 15 de noviembre, 2026 | **Lugar:** Las Cortaderas, Neuquén

---

## 🏗️ Arquitectura del Proyecto

### Frontend
- **HTML puro** (29 líneas de código)
- **React 18** vía CDN (unpkg) - sin build step
- **Babel standalone** para compilar JSX en cliente
- **CSS modular** con sistema de variables custom

### Backend
- **Express.js** API REST
- **Brevo (Sendinblue)** para envío de emails
- **CORS habilitado** para múltiples dominios
- **Deployment en Railway** ✅

### Hosting
- **Frontend:** Cloudflare Static Site Hosting
- **Backend:** Railway.app
- **Repositorio:** GitHub

---

## 🚀 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/lucfl999/pagina-bioraiz.git
cd pagina-bioraiz
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
- **SENDINBLUE_API_KEY**: [Obtener en app.brevo.com](https://app.brevo.com/settings/keys/api)
- **PORT**: 3001 (o tu puerto preferido)
- **FRONTEND_URL**: http://localhost:3000

### 3. Instalar dependencias (backend)
```bash
npm install
```

### 4. Ejecutar el servidor
```bash
npm start       # Modo producción
npm run dev     # Modo desarrollo con watch
```

El backend estará disponible en `http://localhost:3001`

### 5. Servir el frontend
Usa cualquier servidor HTTP local:
```bash
# Con Python
python -m http.server 3000

# Con Node (http-server)
npx http-server -p 3000

# Con Live Server (VS Code Extension)
# Click en "Go Live"
```

El frontend estará disponible en `http://localhost:3000`

---

## 📁 Estructura de Archivos

```
PaginaBioraiz/
├── index.html              # Punto de entrada (29 líneas)
├── server.js               # Backend Express
├── package.json            # Dependencias
├── .env                    # Variables de entorno (NO subir a Git)
├── .env.example            # Plantilla de variables
├── .gitignore              # Archivos ignorados por Git
├── SEGURIDAD.md            # Documentación de seguridad
│
├── css/
│   └── styles.css          # Sistema de diseño (330+ líneas)
│
├── js/
│   ├── data.js             # Datos globales (expositores, agenda, tickets)
│   ├── api.js              # Cliente API
│   └── main.js             # Componentes React (700+ líneas)
│
└── images/
    └── [activos visuales]
```

---

## 🔌 API Endpoints

### Enviados por el backend en Railway

**Base URL:** `https://pagina-bioraiz-production.up.railway.app`

#### 1. Health Check
```
GET /health
Response: { status: "ok" }
```

#### 2. Enviar Email
```
POST /api/send-email
Content-Type: application/json

Body: {
  "to": "destinatario@example.com",
  "subject": "Asunto",
  "html": "<p>Contenido HTML</p>",
  "text": "Contenido texto plano"
}
```

#### 3. Newsletter Subscription
```
POST /api/subscribe
Content-Type: application/json

Body: {
  "email": "usuario@example.com",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

---

## 🛠️ Configuración de Producción

### Railway (Backend)
Las variables de entorno se configuran en el dashboard de Railway:
- `SENDINBLUE_API_KEY` - Clave API de Brevo
- `PORT` - Puerto del servidor
- `FRONTEND_URL` - URL del frontend en Cloudflare

### Cloudflare (Frontend)
- Conectado a este repositorio GitHub
- Despliega automáticamente en cada push
- URL: `https://bioraiz.net` (o dominio configurado)

---

## 📝 Requisitos de Entrada en Producción

- ✅ Backend funcionando en Railway
- ✅ Frontend renderiza correctamente React
- ✅ API communication verificada
- ✅ Form submissions testeados
- ✅ CORS habilitado para dominio
- ✅ Variables de entorno configuradas en Railway

---

## 🚢 Hacer Deploy

### Actualizar Frontend (Cloudflare)
```bash
git add .
git commit -m "Actualizacion: [descripcion]"
git push origin main
# Cloudflare despliega automáticamente
```

### Actualizar Backend (Railway)
El backend se actualiza automáticamente al hacer push a GitHub (si está configurado en Railway).

---

## 🐛 Troubleshooting

### "No funciona CORS"
→ Verificar que el dominio esté en la whitelist de CORS en `server.js`

### "Error en email"
→ Verificar que `SENDINBLUE_API_KEY` sea válida en `.env`
→ Verificar logs en Railway dashboard

### "React no renderiza"
→ Abrir DevTools (F12) y revisar console
→ Verificar que `js/data.js`, `js/api.js`, `js/main.js` carguen correctamente

### "API returns 404"
→ Verificar que Railway backend esté corriendo
→ Verificar URL en `js/api.js` vs URL real de Railway

---

## 📞 Contacto y Soporte

- **Email:** hola@bioraiz.net
- **WhatsApp:** +54 9 2995781006
- **Instagram:** [@bioraiz.nqn](https://www.instagram.com/bioraiz.nqn/)

---

**BIORAIZ © 2026 | Donde la tierra florece y la comunidad crece** 🌱
