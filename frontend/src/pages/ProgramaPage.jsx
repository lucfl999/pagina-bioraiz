import { useState } from 'react';
import { useReveal, SubPageHeader, CTABanner } from '../components/shared.jsx';
import { DIAS, TIPOS_ACTIVIDAD } from '../data.js';
import { subscribeNewsletter } from '../services/api.js';

function GrillaSubscribe() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    try { await subscribeNewsletter(email); } catch (_) {}
    setSent(true);
  };
  return (
    <div style={{ marginTop: 44, padding: "24px 26px", background: "var(--bz-verde-pasto)", borderRadius: "var(--bz-radius-md)" }}>
      <p style={{ fontSize: 13, color: "var(--bz-verde-bosque)", fontFamily: "var(--bz-font-mono)", lineHeight: 1.6, letterSpacing: "0.02em", marginBottom: 16 }}>
        Grilla completa disponible a partir de septiembre 2026. Suscribite para recibirla primero.
      </p>
      {sent ? (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--bz-verde-bosque)" }}>
          <span>✓</span> <span>Listo, te enviamos la grilla a <strong style={{ wordBreak: "break-all" }}>{email}</strong> apenas salga.</span>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, maxWidth: 460, flexWrap: "wrap" }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" required style={{ flex: 1, minWidth: 200, padding: "13px 18px", fontSize: 14, fontFamily: "var(--bz-font-body)", border: "1px solid var(--bz-verde-musgo)", borderRadius: "var(--bz-radius-pill)", background: "var(--bz-beige-hueso)", color: "var(--bz-texto-primario)", outline: "none" }} />
          <button type="submit" className="btn btn-primary">Suscribirme</button>
        </form>
      )}
    </div>
  );
}

export default function ProgramaPage({ setPage }) {
  useReveal();
  const [activeDia, setActiveDia] = useState("viernes");

  const dia = DIAS.find(d => d.id === activeDia);

  const enfasis = {
    viernes: "El día de apertura: se inaugura el mercado, suena la primera charla y la música estrena el escenario.",
    sabado:  "El día más completo: todo abierto a la vez, de la cocina a los talleres, de la mañana a la noche.",
    domingo: "El cierre y la cosecha: bienestar, espacio para los más chicos y el último fogón antes de despedirnos.",
  };

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Programa · 3 días"
        title={<>Programa.</>}
        sub="Tres días con las mismas familias de actividades. Lo que cambia es el énfasis de cada jornada."
      />

      <section style={{ padding: "48px 0 0", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, background: "var(--bz-beige-base)", padding: 6, borderRadius: "var(--bz-radius-lg)", maxWidth: 720, margin: "0 auto 48px" }}>
            {DIAS.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveDia(d.id)}
                style={{
                  padding: "16px 20px",
                  borderRadius: "var(--bz-radius-md)",
                  background: activeDia === d.id ? "var(--bz-verde-profundo)" : "transparent",
                  color: activeDia === d.id ? "var(--bz-beige-hueso)" : "var(--bz-texto-secundario)",
                  transition: "all 300ms var(--bz-ease)",
                  textAlign: "center",
                }}
              >
                <div className="display" style={{ fontSize: 32, lineHeight: 1, marginBottom: 4 }}>{d.num}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)", opacity: activeDia === d.id ? 0.8 : 1 }}>{d.label}</div>
                <div style={{ fontSize: 11, opacity: activeDia === d.id ? 0.6 : 0.5, marginTop: 4, fontStyle: "italic", fontFamily: "var(--bz-font-display)" }}>{d.subtitulo}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section key={activeDia} style={{ padding: "8px 0 90px", background: "var(--bz-fondo-base)", animation: "bz-fade-in 400ms var(--bz-ease) both" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="reveal" style={{ display: "flex", gap: 20, alignItems: "baseline", marginBottom: 40, paddingBottom: 28, borderBottom: "0.5px solid var(--bz-borde-suave)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span className="display" style={{ fontSize: 30, color: "var(--bz-texto-primario)" }}>{dia.label}</span>
              <span style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: 20, color: "var(--bz-verde-musgo)" }}>· {dia.subtitulo}</span>
            </div>
            <p style={{ flex: 1, minWidth: 280, fontSize: 15, color: "var(--bz-texto-secundario)", lineHeight: 1.6 }}>{enfasis[activeDia]}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {TIPOS_ACTIVIDAD.map((t, i) => (
              <article key={t.tipo} className="reveal" style={{
                background: "var(--bz-beige-hueso)",
                border: "0.5px solid var(--bz-borde-ligero)",
                borderRadius: "var(--bz-radius-lg)",
                padding: "26px 26px",
                transition: "transform 250ms var(--bz-ease), box-shadow 250ms var(--bz-ease)",
                transitionDelay: `${(i % 3) * 60}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--bz-shadow-md)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <span className="tag tag-ocre" style={{ marginBottom: 14 }}>{t.tipo}</span>
                <p style={{ fontFamily: "var(--bz-font-display)", fontSize: 19, color: "var(--bz-texto-primario)", lineHeight: 1.4, marginTop: 4 }}>{t.desc}</p>
              </article>
            ))}
          </div>

          <GrillaSubscribe />
        </div>
      </section>

      <CTABanner setPage={setPage} />
    </div>
  );
}
