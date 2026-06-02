import Middleware from '../middleware/index.js';
import { subscribeNewsletter } from '../services/emailService.js';

const router = (req, res) => {
  // Middleware de autenticación
  Middleware.validateEmail(req.body.email);
  
  // Lógica de suscripción
  subscribeNewsletter(req.body.email)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(400).json({ error: err.message }));
};

export default router;
