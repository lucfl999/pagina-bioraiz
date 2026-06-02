# BIORAIZ - Backend Seguro

## 🔒 Configuración Segura de API Key

La API key de Sendinblue ahora está **protegida en el servidor**, no expuesta en el frontend.

### 📋 Estructura

```
PaginaBioraiz/
├── index.html              # Frontend (sin secrets)
├── server.js              # Backend que maneja Sendinblue
├── package.json           # Dependencias Node.js
├── .env                   # Variables de entorno (gitignored)
└── .gitignore             # Ignora .env para no subir secretos
```

### 🚀 Instalación Local

1. **Instalar dependencias:**
   ```bash
   cd PaginaBioraiz
   npm install
   ```

2. **Verificar `.env` (ya está configurado):**
   ```bash
   # Debe contener:
   # SENDINBLUE_API_KEY=xkeysib-...
   # PORT=3001
   ```

3. **Iniciar servidor:**
   ```bash
   npm start
   ```

   El servidor se ejecutará en `http://localhost:3001`

### 📞 Endpoints Disponibles

#### 1. Enviar Email
```javascript
POST /api/send-email
Content-Type: application/json

{
  "to": "usuario@example.com",
  "subject": "Asunto del email",
  "html": "<h1>Contenido HTML</h1>",
  "text": "Contenido en texto plano"
}
```

**Respuesta:**
```json
{
  "success": true,
  "messageId": "12345"
}
```

#### 2. Suscribirse
```javascript
POST /api/subscribe
Content-Type: application/json

{
  "email": "usuario@example.com",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Respuesta:**
```json
{
  "success": true,
  "contactId": "xyz123"
}
```

### 🔐 Seguridad

✅ **API Key protegida:**
- Solo existe en el `.env` del servidor
- Nunca se sube a GitHub (está en `.gitignore`)
- No expuesta en el código frontend

✅ **CORS configurado:**
- Solo acepta requests de dominios autorizados

✅ **Validación:**
- Los requests deben incluir datos válidos

### 📱 Cómo usar desde el Frontend

**Ejemplo en JavaScript:**
```javascript
// Enviar suscripción
fetch('http://localhost:3001/api/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'usuario@example.com',
    firstName: 'Juan'
  })
})
.then(res => res.json())
.then(data => console.log('Suscrito:', data))
.catch(err => console.error('Error:', err));
```

### 🌐 Desplegar en Producción

**Con Heroku, Railway, Vercel, etc:**

1. Crear variable de entorno `SENDINBLUE_API_KEY` en el panel de la plataforma
2. Deployer el código (no incluirá el `.env` local)
3. El servidor leerá la variable de entorno automáticamente

**Ejemplo con Railway:**
```bash
railway link
railway up
```

### ⚠️ IMPORTANTE

**NUNCA:**
- ❌ Commits con `.env` en GitHub
- ❌ Compartir la API key por chat/email
- ❌ Usar la API key en el código frontend

**SIEMPRE:**
- ✅ Usar variables de entorno
- ✅ Dejar `.env` en `.gitignore`
- ✅ Cambiar la API key si se expone

### 📚 Referencias

- [Sendinblue API Docs](https://developers.brevo.com/)
- [Express.js](https://expressjs.com/)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Estado:** ✅ API Key Segura | Backend Activo | Frontend Sin Secrets
