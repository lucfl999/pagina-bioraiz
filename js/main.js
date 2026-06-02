/**
 * BIORAIZ — React Main App
 * Punto de entrada de la aplicación
 */

const { useState, useEffect } = React;

// ══════════════════════════════════════════════════════════════
// COMPONENTES REUTILIZABLES
// ══════════════════════════════════════════════════════════════

function Header() {
    return (
        <header style={{
            backgroundColor: 'var(--bz-fondo-base)',
            borderBottom: '1px solid var(--bz-borde-ligero)',
            padding: '1.5rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div className="container flex-between">
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>🌿 BIORAIZ</h1>
                <nav style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#inicio" style={{ textDecoration: 'none', color: 'var(--bz-texto-primario)' }}>Inicio</a>
                    <a href="#expositores" style={{ textDecoration: 'none', color: 'var(--bz-texto-primario)' }}>Expositores</a>
                    <a href="#programa" style={{ textDecoration: 'none', color: 'var(--bz-texto-primario)' }}>Programa</a>
                    <a href="#entradas" style={{ textDecoration: 'none', color: 'var(--bz-texto-primario)' }}>Entradas</a>
                </nav>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section className="hero" id="inicio">
            <div className="hero-content">
                <h1 style={{ marginBottom: '1rem', color: 'var(--bz-verde-profundo)' }}>
                    BIORAIZ
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--bz-texto-secundario)', marginBottom: '2rem' }}>
                    La feria sustentable de la Patagonia
                </p>
                <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
                    13 · 14 · 15 de noviembre, 2026
                </p>
                <button className="btn btn-primary" onClick={() => alert('Más info en Entradas')}>
                    Obtener Entradas →
                </button>
            </div>
        </section>
    );
}

function Numeros() {
    return (
        <section className="section" style={{ backgroundColor: 'var(--bz-verde-pasto)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Los Números de BIORAIZ</h2>
                <div className="grid-4">
                    {BZ_DATA.numeros.map((item, idx) => (
                        <div key={idx} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--bz-verde-profundo)', marginBottom: '0.5rem' }}>
                                {item.numero}
                            </div>
                            <p style={{ color: 'var(--bz-texto-primario)' }}>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Categorias() {
    return (
        <section className="section">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Categorías</h2>
                <div className="grid-3">
                    {BZ_DATA.categorias.map((cat) => (
                        <div key={cat.id} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{cat.label}</h3>
                            <p style={{ color: 'var(--bz-texto-terciario)' }}>{cat.stands} stands</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Expositores() {
    const [filtro, setFiltro] = useState('');

    const expositoresFiltrados = filtro
        ? BZ_DATA.expositores.filter(e => e.categoria === filtro)
        : BZ_DATA.expositores;

    return (
        <section className="section" id="expositores">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Nuestros Expositores</h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <button
                        className={filtro === '' ? 'btn btn-primary' : 'btn btn-secondary'}
                        onClick={() => setFiltro('')}
                    >
                        Todos
                    </button>
                    {BZ_DATA.categorias.map(cat => (
                        <button
                            key={cat.id}
                            className={filtro === cat.id ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setFiltro(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="grid-3">
                    {expositoresFiltrados.map((exp) => (
                        <div key={exp.id} className="card">
                            <h4 style={{ marginBottom: '0.5rem' }}>{exp.nombre}</h4>
                            <p style={{ color: 'var(--bz-texto-terciario)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                                {BZ_DATA.categorias.find(c => c.id === exp.categoria)?.label}
                            </p>
                            <p>{exp.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Programa() {
    const [diaSeleccionado, setDiaSeleccionado] = useState(0);

    return (
        <section className="section" id="programa">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Programa</h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    {BZ_DATA.dias.map((dia, idx) => (
                        <button
                            key={idx}
                            className={idx === diaSeleccionado ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setDiaSeleccionado(idx)}
                        >
                            {dia}
                        </button>
                    ))}
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {BZ_DATA.actividades[BZ_DATA.dias[diaSeleccionado]]?.map((act, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                gap: '1.5rem',
                                padding: '1.5rem',
                                borderLeft: '3px solid var(--bz-verde-musgo)',
                                marginBottom: '1rem',
                                backgroundColor: 'var(--bz-crema-fondo)',
                                borderRadius: 'var(--bz-radius-md)',
                            }}
                        >
                            <div style={{ fontWeight: 'bold', color: 'var(--bz-verde-profundo)', minWidth: '70px' }}>
                                {act.hora}
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>{act.titulo}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--bz-texto-terciario)' }}>
                                    {act.tipo.charAt(0).toUpperCase() + act.tipo.slice(1)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Entradas() {
    return (
        <section className="section" id="entradas" style={{ backgroundColor: 'var(--bz-fondo-alt)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Entradas</h2>
                <div className="grid-3">
                    {BZ_DATA.tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="card"
                            style={{
                                position: 'relative',
                                padding: '2.5rem 1.5rem',
                                border: ticket.highlight ? '2px solid var(--bz-verde-musgo)' : '1px solid var(--bz-borde-ligero)',
                            }}
                        >
                            {ticket.highlight && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'var(--bz-verde-musgo)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--bz-radius-pill)',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                }}>
                                    MÁS POPULAR
                                </div>
                            )}

                            <h3 style={{ marginBottom: '0.5rem' }}>{ticket.nombre}</h3>
                            <p style={{ color: 'var(--bz-texto-terciario)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                {ticket.descripcion}
                            </p>

                            <div style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: 'var(--bz-verde-profundo)',
                                marginBottom: '1.5rem',
                            }}>
                                {ticket.precio}
                            </div>

                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                                {ticket.beneficios.map((beneficio, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                        ✓ {beneficio}
                                    </li>
                                ))}
                            </ul>

                            <button className="btn btn-primary" style={{ width: '100%' }}>
                                Comprar Entrada
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const [expandido, setExpandido] = useState(null);

    return (
        <section className="section">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Preguntas Frecuentes</h2>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {BZ_DATA.faq.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                marginBottom: '1rem',
                                border: '1px solid var(--bz-borde-ligero)',
                                borderRadius: 'var(--bz-radius-md)',
                                overflow: 'hidden',
                            }}
                        >
                            <button
                                onClick={() => setExpandido(expandido === idx ? null : idx)}
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    backgroundColor: expandido === idx ? 'var(--bz-verde-pasto)' : 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                }}
                            >
                                {item.pregunta} {expandido === idx ? '−' : '+'}
                            </button>
                            {expandido === idx && (
                                <div style={{
                                    padding: '0 1.5rem 1.5rem',
                                    backgroundColor: 'var(--bz-crema-fondo)',
                                    borderTop: '1px solid var(--bz-borde-ligero)',
                                }}>
                                    <p>{item.respuesta}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Newsletter() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const result = await ApiClient.subscribe(email);
            setMessage('¡Te has suscrito correctamente! 🎉');
            setEmail('');
        } catch (error) {
            setMessage('Error al suscribirse. Intenta de nuevo.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section" style={{ backgroundColor: 'var(--bz-verde-profundo)', color: 'var(--bz-beige-hueso)' }}>
            <div className="container" style={{ maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--bz-beige-hueso)' }}>
                    Mantente Conectado
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--bz-crema-fondo)' }}>
                    Recibe actualizaciones sobre BIORAIZ 2026
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            flex: 1,
                            padding: '0.875rem 1rem',
                            border: 'none',
                            borderRadius: 'var(--bz-radius-pill)',
                            fontSize: '0.875rem',
                        }}
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? '...' : 'Suscribirse'}
                    </button>
                </form>

                {message && (
                    <p style={{
                        textAlign: 'center',
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: message.includes('Error') ? '#C8524A' : '#6E9050',
                        borderRadius: 'var(--bz-radius-md)',
                        fontSize: '0.875rem',
                    }}>
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer style={{
            backgroundColor: 'var(--bz-texto-primario)',
            color: 'var(--bz-beige-hueso)',
            padding: '3rem 0 1.5rem',
        }}>
            <div className="container">
                <div className="grid-3" style={{ marginBottom: '2rem' }}>
                    <div>
                        <h4 style={{ marginBottom: '1rem' }}>BIORAIZ</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--bz-crema-fondo)' }}>
                            La feria sustentable de la Patagonia
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem' }}>Contacto</h4>
                        <a href={`mailto:${BZ_DATA.contact.email}`} style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--bz-crema-fondo)' }}>
                            {BZ_DATA.contact.email}
                        </a>
                        <a href={BZ_DATA.contact.whatsappLink} style={{ display: 'block', color: 'var(--bz-crema-fondo)' }}>
                            {BZ_DATA.contact.whatsapp}
                        </a>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem' }}>Redes</h4>
                        <a href={BZ_DATA.contact.instagram} style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--bz-crema-fondo)' }}>
                            Instagram
                        </a>
                        <a href={BZ_DATA.contact.facebook} style={{ display: 'block', color: 'var(--bz-crema-fondo)' }}>
                            Facebook
                        </a>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: 'var(--bz-crema-fondo)',
                }}>
                    <p>© 2026 BIORAIZ. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

// ══════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════

function App() {
    return (
        <>
            <Header />
            <Hero />
            <Numeros />
            <Categorias />
            <Expositores />
            <Programa />
            <Entradas />
            <FAQ />
            <Newsletter />
            <Footer />
        </>
    );
}

// ══════════════════════════════════════════════════════════════
// MONTAR APLICACIÓN
// ══════════════════════════════════════════════════════════════

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
