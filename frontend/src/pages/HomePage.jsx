import { useState, useEffect, useRef } from 'react';
import { useReveal, Counter, SectionHead, Placeholder, LeafShape, CircleShape, CategoriaCard } from '../components/shared.jsx';
import { NUMEROS, CATEGORIAS_STANDS, DIA_BLOQUES } from '../data.js';

export default function HomePage({ setPage }) {
  useReveal();
  return (
    <div className="page-enter">
      <Hero setPage={setPage} />
      <Purpose />
      <NumbersSection />
      <ExpositoresScroll setPage={setPage} />
      <AgendaPreview setPage={setPage} />
      <Gallery />
      <NewsletterBlock />
    </div>
  );
}

function Hero({ setPage }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", background: "var(--bz-fondo-dark)", color: "var(--bz-beige-hueso)", overflow: "hidden", paddingTop: 120 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(135deg, #1A2812 0%, #2A3D24 35%, #3D5A3F 70%, #4A6E4A 100%)" }}>
        <div className="ph ph-dark" style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
          <span className="ph-label" style={{ position: "absolute", top: 24, right: 24 }}>video loop · mercado al aire libre</span>
        </div>
        <div style={{ position: "absolute", top: "12%", left: "-4%", opacity: 0.55, transform: `translate(${mouse.x * 10}px, ${mouse.y * 8}px) rotate(-12deg)`, transition: "transform 600ms var(--bz-ease)" }}>
          <LeafShape size={280} color="var(--bz-verde-musgo)" />
        </div>
        <div style={{ position: "absolute", bottom: "-5%", right: "-2%", opacity: 0.5, transform: `translate(${mouse.x * -12}px, ${mouse.y * -10}px) rotate(160deg)`, transition: "transform 600ms var(--bz-ease)" }}>
          <LeafShape size={340} color="var(--bz-ocre-tostado)" />
        </div>
        <div style={{ position: "absolute", top: "40%", right: "18%", opacity: 0.7, transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`, transition: "transform 600ms var(--bz-ease)" }}>
          <CircleShape size={120} color="var(--bz-tierra-rojo)" style={{ opacity: 0.32 }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 60%, transparent 0%, rgba(26, 32, 18, 0.45) 80%)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 100 }}>
        <div className="bz-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 40 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 24, animation: "bz-fade-up 800ms var(--bz-ease) both" }}>
              Primera edición · noviembre 2026
            </div>
            <h1 className="display" style={{ fontSize: "clamp(56px, 11vw, 168px)", color: "var(--bz-beige-hueso)", lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: 32, animation: "bz-fade-up 1000ms var(--bz-ease) 100ms both" }}>
              BIO<em style={{ color: "var(--bz-ocre-calido)" }}>RAIZ</em>
            </h1>
            <p style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: "clamp(22px, 2.8vw, 32px)", color: "var(--bz-verde-claro)", maxWidth: 580, lineHeight: 1.35, marginBottom: 44, animation: "bz-fade-up 1000ms var(--bz-ease) 300ms both" }}>
              Donde la tierra florece <br /> y la comunidad crece.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "bz-fade-up 1000ms var(--bz-ease) 500ms both" }}>
              <button onClick={() => setPage("entradas")} className="btn btn-ocre">Quiero ir</button>
              <button onClick={() => setPage("programa")} className="btn" style={{ background: "rgba(250, 246, 237, 0.1)", color: "var(--bz-beige-hueso)", border: "1.5px solid rgba(250, 246, 237, 0.3)" }}>Ver programa</button>
            </div>
          </div>

          <div style={{ animation: "bz-fade-up 1000ms var(--bz-ease) 400ms both" }} className="bz-hero-date">
            <div style={{ border: "1px solid rgba(230, 203, 122, 0.4)", borderRadius: "var(--bz-radius-lg)", padding: "20px 24px", background: "rgba(42, 61, 36, 0.4)", backdropFilter: "blur(8px)", minWidth: 240 }}>
              <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 12 }}>fecha · lugar</div>
              <div style={{ fontFamily: "var(--bz-font-display)", fontSize: 32, color: "var(--bz-beige-hueso)", lineHeight: 1.1, marginBottom: 8 }}>
                13 · 14 · 15<br />nov 2026
              </div>
              <div style={{ fontSize: 13, color: "var(--bz-verde-claro)", lineHeight: 1.5, marginTop: 12, paddingTop: 12, borderTop: "0.5px solid rgba(230, 203, 122, 0.2)" }}>
                Las Cortaderas<br />Neuquén · Patagonia
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bz-fade-in 1500ms var(--bz-ease) 1500ms both" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--bz-verde-claro)", fontFamily: "var(--bz-font-mono)", textTransform: "uppercase" }}>Bajá</span>
          <div style={{ width: 1, height: 32, background: "rgba(230, 203, 122, 0.4)", animation: "bz-pulse 2s ease infinite" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bz-hero-grid { grid-template-columns: 1fr !important; }
          .bz-hero-date { order: -1; }
        }
      `}</style>
    </section>
  );
}

function Purpose() {
  return (
    <section style={{ padding: "120px 0 80px", background: "var(--bz-fondo-base)" }} className="trama">
      <div className="container-narrow" style={{ textAlign: "center" }}>
        <div className="eyebrow reveal" style={{ marginBottom: 32 }}>¿Qué es BIORAIZ?</div>
        <p className="display reveal reveal-delay-1" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--bz-texto-primario)", lineHeight: 1.25, marginBottom: 32 }}>
          Una feria de productores patagónicos donde la materia prima tiene origen, la cocina tiene tiempo y la comunidad tiene espacio para <em>encontrarse</em>.
        </p>
        <p className="reveal reveal-delay-2" style={{ fontSize: 17, color: "var(--bz-texto-secundario)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
          Es un lugar para detenerse, probar, conversar y volver a casa con algo más que una bolsa. Tres días para encontrarse con la tierra, con los oficios y con la gente que los sostiene.
        </p>
      </div>
    </section>
  );
}

function NumbersSection() {
  return (
    <section style={{ padding: "60px 0 100px", background: "var(--bz-fondo-base)" }}>
      <div className="container">
        <div className="bz-numbers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--bz-borde-suave)", border: "0.5px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-lg)", overflow: "hidden" }}>
          {NUMEROS.map((n, i) => (
            <div key={i} className="reveal" style={{ background: "var(--bz-beige-hueso)", padding: "44px 32px", textAlign: "center", transitionDelay: `${i * 80}ms` }}>
              <div className="display" style={{ fontSize: "clamp(48px, 7vw, 84px)", color: "var(--bz-verde-profundo)", lineHeight: 1, marginBottom: 12 }}>
                <Counter to={n.value} suffix={n.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "var(--bz-texto-secundario)", lineHeight: 1.5, maxWidth: 180, margin: "0 auto" }}>{n.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .bz-numbers-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

const arrowBtn = {
  width: 44, height: 44, borderRadius: "50%",
  border: "1px solid var(--bz-borde-suave)",
  background: "var(--bz-beige-hueso)",
  color: "var(--bz-verde-profundo)",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 200ms var(--bz-ease)",
};

function ExpositoresScroll({ setPage }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "100px 0 120px", background: "var(--bz-fondo-alt)", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <SectionHead
            eyebrow="200+ stands disponibles"
            title={<>Cosas hechas <em>con manos</em> de la Patagonia.</>}
            sub="Seis categorías, un mismo criterio: origen verificable, proceso consciente, producto con historia."
          />
          <div style={{ display: "flex", gap: 8 }} className="reveal">
            <button onClick={() => scroll(-1)} aria-label="Anterior" style={arrowBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6"/></svg>
            </button>
            <button onClick={() => scroll(1)} aria-label="Siguiente" style={arrowBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} style={{
        display: "flex", gap: 20, overflowX: "auto", padding: "8px 0 24px",
        paddingLeft: "max(32px, calc((100vw - 1280px) / 2 + 32px))", paddingRight: 32,
        scrollSnapType: "x mandatory", scrollbarWidth: "thin",
      }}>
        {CATEGORIAS_STANDS.map((cat, i) => (
          <div key={cat.id} className="reveal" style={{ minWidth: 300, maxWidth: 300, scrollSnapAlign: "start", transitionDelay: `${(i % 4) * 80}ms` }}>
            <CategoriaCard cat={cat} />
          </div>
        ))}
        <div style={{ minWidth: 300, maxWidth: 300, scrollSnapAlign: "start", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setPage("participa")} className="btn btn-secondary" style={{ flexDirection: "column", padding: "40px 30px", height: "100%", width: "100%", borderRadius: "var(--bz-radius-lg)", borderStyle: "dashed" }}>
            <span style={{ fontFamily: "var(--bz-font-display)", fontSize: 28, marginBottom: 8 }}>Quiero un stand</span>
            <span style={{ fontSize: 13, color: "var(--bz-texto-secundario)" }}>Convocatoria 2026 abierta →</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function AgendaPreview({ setPage }) {
  return (
    <section style={{ padding: "120px 0", background: "var(--bz-fondo-base)" }}>
      <div className="container bz-agenda-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
        <div className="reveal">
          <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 18 }}>Programa</div>
          <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--bz-texto-primario)", marginBottom: 24, lineHeight: 1.1 }}>
            3 días, <br />sin apuro.
          </h2>
          <p style={{ fontSize: 16, color: "var(--bz-texto-secundario)", lineHeight: 1.7, marginBottom: 32 }}>
            Charlas, talleres, música en vivo, espacios para chicos y una cocina abierta que no para. El programa es denso pero con respiros — porque la pausa también es parte.
          </p>
          <button onClick={() => setPage("programa")} className="btn btn-primary">Ver programa completo</button>
        </div>

        <div>
          {DIA_BLOQUES.map((d, i) => (
            <div key={d.num} className="reveal" style={{
              display: "grid",
              gridTemplateColumns: "96px 1fr",
              gap: 28,
              padding: "30px 0",
              borderBottom: i < DIA_BLOQUES.length - 1 ? "0.5px solid var(--bz-borde-suave)" : "none",
              alignItems: "start",
              transitionDelay: `${i * 100}ms`,
            }}>
              <div style={{ textAlign: "center" }}>
                <div className="display" style={{ fontSize: 52, color: "var(--bz-tierra-rojo)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>{d.num}</div>
                <div style={{ fontSize: 11, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)", letterSpacing: "0.18em", marginTop: 4 }}>NOV</div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                  <span style={{ fontFamily: "var(--bz-font-display)", fontSize: 24, color: "var(--bz-texto-primario)", lineHeight: 1.1 }}>{d.dia}</span>
                  <span style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: 18, color: "var(--bz-verde-musgo)" }}>· {d.sub}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {d.tags.map(t => (
                    <span key={t} className="tag tag-outline">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bz-agenda-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 480px) {
          .bz-agenda-grid > div:last-child > div { grid-template-columns: 64px 1fr !important; gap: 18px !important; }
        }
      `}</style>
    </section>
  );
}

function Gallery() {
  return (
    <section style={{ padding: "120px 0", background: "var(--bz-fondo-alt)" }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <SectionHead eyebrow="El espacio" title={<>Un predio que <em>respira.</em></>} />
        </div>
        <figure className="reveal" style={{ margin: 0 }}>
          <div className="ph" style={{ width: "100%", aspectRatio: "1808 / 854", borderRadius: "var(--bz-radius-lg)", overflow: "hidden" }}>
            <span className="ph-label">foto · predio del festival al atardecer · Patagonia nov 2026</span>
          </div>
          <figcaption style={{ marginTop: 16, fontFamily: "var(--bz-font-mono)", fontSize: 12, letterSpacing: "0.04em", color: "var(--bz-texto-terciario)" }}>
            El predio de BIORAIZ al atardecer · Patagonia, nov 2026
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@")) setSent(true);
  };

  return (
    <section style={{ padding: "100px 0", background: "var(--bz-crema-fondo)" }}>
      <div className="container-narrow">
        <div className="reveal" style={{ background: "var(--bz-beige-hueso)", borderRadius: "var(--bz-radius-xl)", padding: "60px 56px", border: "0.5px solid var(--bz-borde-ligero)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, opacity: 0.18 }}>
            <LeafShape size={200} color="var(--bz-verde-musgo)" rotate={30} />
          </div>
          <div style={{ position: "absolute", bottom: -50, left: -30, opacity: 0.12 }}>
            <LeafShape size={180} color="var(--bz-ocre-tostado)" rotate={-160} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 18 }}>Carta de Raíz</div>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "var(--bz-texto-primario)", marginBottom: 18, lineHeight: 1.2 }}>
              Una vez al mes, algo bueno en tu bandeja.
            </h3>
            <p style={{ fontSize: 16, color: "var(--bz-texto-secundario)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Novedades del evento, historias de productores y notas eco. Sin spam, sin urgencia, sin métricas oscuras.
            </p>
            {sent ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px", background: "var(--bz-verde-pasto)", color: "var(--bz-verde-bosque)", borderRadius: "var(--bz-radius-pill)", fontSize: 14 }}>
                <span style={{ fontSize: 16 }}>✓</span>
                ¡Listo! Te llegará un mail de confirmación.
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, maxWidth: 440, margin: "0 auto", flexWrap: "wrap" }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" required style={{ flex: 1, minWidth: 200, padding: "14px 20px", fontSize: 14, fontFamily: "var(--bz-font-body)", border: "1px solid var(--bz-ocre-calido)", borderRadius: "var(--bz-radius-pill)", background: "var(--bz-beige-base)", color: "var(--bz-texto-primario)", outline: "none" }} />
                <button type="submit" className="btn btn-primary">Suscribirme</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
