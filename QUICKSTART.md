
## 🚀 Quick Start

### Local Development

```bash
# Con npm (sin Docker)
npm install --workspaces
npm run dev

# Con Docker
./quickstart.sh
# Luego en otra terminal:
npm run dev -w frontend
```

### Production Deployment

Sigue los pasos en [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📮 API Endpoints

### Formularios
- `POST /api/forms/contact` - Contacto general
- `POST /api/forms/participa` - Solicitud de participación
- `POST /api/forms/press-kit` - Kit de prensa

### Suscripciones
- `POST /api/subscribers` - Nueva suscripción
- `GET /api/subscribers/:id` - Obtener suscriptor
- `POST /api/subscribers/notify-all` - Notificar a todos

### Entradas
- `POST /api/tickets/create` - Crear checkout
- `POST /api/tickets/webhook` - Webhook de Stripe

---

## 🔐 Seguridad

- CORS habilitado solo para dominio configurado
- Rate limiting en Workers (100 req/min)
- JWT para autenticación (futuro)
- HTTPS obligatorio en production
- Variables sensitivas en .env (nunca en repo)

---

## 📊 Monitoreo

```bash
# Ver logs de API
railway logs

# Ver logs de Workers
wrangler tail workers

# Health check
curl http://localhost:3000/health
```

---

## 🤝 Contribuir

1. Crea rama: `git checkout -b feature/my-feature`
2. Commit: `git commit -m "Add feature"`
3. Push: `git push origin feature/my-feature`
4. PR: Abre Pull Request

---

**Creado**: Junio 2026  
**Última actualización**: Hoy  
**Stack**: React, Express, PostgreSQL, Cloudflare
