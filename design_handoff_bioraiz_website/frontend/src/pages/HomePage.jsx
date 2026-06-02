import { useState } from 'react';
import { subscribeNewsletter } from '../services/api';

export const HomePage = ({ onPageChange }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await subscribeNewsletter(email);
      setMessage('¡Suscripción exitosa! Te avisaremos cuando salga todo.');
      setEmail('');
    } catch (error) {
      setMessage('Error en la suscripción. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page home-page">
      <section className="hero">
        <h1>BIORAIZ</h1>
        <p>Feria sustentable de la Patagonia</p>
        <p className="subtitle">13 · 14 · 15 de noviembre, 2026 · Las Cortaderas, Neuquén</p>
      </section>

      <section className="cta">
        <h2>¿Avisame cuando salgan las entradas?</h2>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Suscribiendo...' : 'Suscribirse'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>

      <section className="featured">
        <div className="grid">
          <div className="card" onClick={() => onPageChange('feria')}>
            <h3>La Feria</h3>
            <p>Descubre la experiencia BIORAIZ</p>
          </div>
          <div className="card" onClick={() => onPageChange('expositores')}>
            <h3>Expositores</h3>
            <p>Conoce a nuestros productores</p>
          </div>
          <div className="card" onClick={() => onPageChange('programa')}>
            <h3>Programa</h3>
            <p>Charlas, talleres y música en vivo</p>
          </div>
          <div className="card" onClick={() => onPageChange('entradas')}>
            <h3>Entradas</h3>
            <p>Compra tu acceso</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
