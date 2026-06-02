import { useState } from 'react';
import { useReveal, SectionHead, SubPageHeader, FaqItem } from '../components/shared.jsx';
import { TICKETS, FAQ, BZ_EMAIL, BZ_WHATSAPP_LINK } from '../data.js';
import { subscribeNewsletter } from '../services/api.js';

function TicketCard({ ticket, index }) {
  const colors = {
    ocre:    { bg: "var(--bz-ocre-calido)",    fg: "var(--bz-verde-profundo)", accent: "var(--bz-verde-profundo)", border: "var(--bz-ocre-tostado)" },
    verde:   { bg: "var(--bz-verde-profundo)", fg: "var(--bz-beige-hueso)",    accent: "var(--bz-ocre-calido)",    border: "var(--bz-verde-profundo)" },
    tierra:  { bg: "var(--bz-beige-hueso)",    fg: "var(--bz-texto-primario)", accent: "var(--bz-tierra-rojo)",    border: "var(--bz-borde-suave)" },
  };
  const c = colors[ticket.color];
  const featured = ticket.destacado;
  const [notify, setNotify] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onNotify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await subscribeNewsletter(email); } catch (_) {}
    setSent(true);
    setLoading(false);
  };
  const btnBg = ticket.color === "verde" ? "var(--bz-ocre-calido)" : "var(--bz-verde-profundo)";
  const btnFg = ticket.color === "verde" ? "var(--bz-verde-profundo)" : "var(--bz-beige-hueso)";

  return (
    <article className="reveal" style={{
      background: c.bg, color: c.fg,
      borderRadius: "var(--bz-radius-xl)", padding: "40px 36px",
      border: `1px solid ${c.border}`,
      boxShadow: featured ? "var(--bz-shadow-lg)" : "none",
      transform: featured ? "translateY(-12px)" : "none",
      transition: "transform 300ms var(--bz-ease), box-shadow 300ms var(--bz-ease)",
      transitionDelay: `${index * 100}ms`,
      position: "relative", display: "flex", flexDirection: "column",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = featured ? "translateY(-16px)" : "translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = featured ? "translateY(-12px)" : "translateY(0)"; }}
    >
      {featured && (
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--bz-ocre-calido)", color: "var(--bz-verde-profundo)", padding: "5px 14px", borderRadius: "var(--bz-radius-pill)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>★ Más elegida</div>
      )}

      <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)", opacity: 0.7, marginBottom: 14 }}>{ticket.badge}</div>
      <h3 style={{ fontFamily: "var(--bz-font-display)", fontSize: 36, marginBottom: 16, lineHeight: 1 }}>{ticket.name}</h3>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span className="display" style={{ fontSize: 48, color: c.accent, lineHeight: 1 }}>{ticket.precio}</span>
          {ticket.unidad && <span style={{ fontSize: 13, opacity: 0.7, fontFamily: "var(--bz-font-mono)" }}>{ticket.unidad}</span>}
        </div>
        {ticket.precioOrig && (
          <div style={{ fontSize: 14, marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ opacity: 0.55, textDecoration: "line-through" }}>{ticket.precioOrig}</span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)", padding: "2px 8px", borderRadius: "var(--bz-radius-pill)", background: "rgba(163, 58, 30, 0.14)", color: "var(--bz-tierra-rojo)" }}>−27%</span>
          </div>
        )}
      </div>

      <ul style={{ listStyle: "none", marginBottom: 32, flex: 1 }}>
        {ticket.incluye.map((item, j) => (
          <li key={j} style={{ display: "flex", gap: 10, padding: "8px 0", fontSize: 14, lineHeight: 1.5, opacity: 0.9, borderTop: j > 0 ? `0.5px solid ${ticket.color === "verde" ? "rgba(250,246,237,0.15)" : "var(--bz-borde-ligero)"}` : "none" }}>
            <span style={{ color: c.accent, flexShrink: 0 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>

      {sent ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "16px 18px", borderRadius: "var(--bz-radius-md)", background: ticket.color === "verde" ? "rgba(250,246,237,0.12)" : "var(--bz-verde-pasto)", color: ticket.color === "verde" ? "var(--bz-beige-hueso)" : "var(--bz-verde-bosque)", fontSize: 13.5, lineHeight: 1.5 }}>
          <span style={{ flexShrink: 0 }}>✓</span>
          <span>Listo. Te avisamos apenas salga a la venta:<br /><strong style={{ wordBreak: "break-all" }}>{email}</strong></span>
        </div>
      ) : notify ? (
        <form onSubmit={onNotify} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" autoFocus required style={{ width: "100%", padding: "13px 18px", fontSize: 14, fontFamily: "var(--bz-font-body)", border: "1px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-pill)", background: "var(--bz-beige-hueso)", color: "var(--bz-texto-primario)", outline: "none" }} />
          <button type="submit" disabled={loading} style={{ padding: "14px 24px", borderRadius: "var(--bz-radius-pill)", background: btnBg, color: btnFg, fontSize: 14, fontWeight: 500, transition: "transform 200ms var(--bz-spring)", opacity: loading ? 0.7 : 1 }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            {loading ? "..." : "Confirmar"}
          </button>
        </form>
      ) : (
        <button onClick={() => setNotify(true)} style={{ padding: "14px 24px", borderRadius: "var(--bz-radius-pill)", background: btnBg, color: btnFg, fontSize: 14, fontWeight: 500, transition: "transform 200ms var(--bz-spring)" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          Avisame cuando salga
        </button>
      )}
    </article>
  );
}

export default function EntradasPage({ setPage }) {
  useReveal();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Entradas · BIORAIZ 2026"
        title={<>Tu lugar.</>}
        sub="3 tipos de entrada. El precio es por día: entrás el día que quieras. A la venta desde septiembre."
      />

      <section style={{ padding: "60px 0 80px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div className="bz-tickets-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }}>
            {TICKETS.map((t, i) => (
              <TicketCard key={t.id} ticket={t} index={i} />
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 880px) { .bz-tickets-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <section style={{ padding: "32px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container-narrow">
          <div className="reveal" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, padding: "28px 40px", background: "var(--bz-beige-hueso)", border: "0.5px solid var(--bz-borde-ligero)", borderRadius: "var(--bz-radius-lg)", flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, color: "var(--bz-texto-terciario)", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>Pagás con</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {["Visa", "Mastercard", "Amex", "Mercado Pago", "Modo", "Transferencia"].map(m => (
                <span key={m} style={{ padding: "6px 14px", background: "var(--bz-fondo-base)", borderRadius: "var(--bz-radius-pill)", fontSize: 12, color: "var(--bz-texto-secundario)", fontWeight: 500 }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0 120px", background: "var(--bz-fondo-alt)" }}>
        <div className="container-narrow">
          <SectionHead
            eyebrow="Preguntas frecuentes"
            title={<>Lo que <em>siempre</em> nos preguntan.</>}
            sub={`Si tu duda no está acá, escribinos a ${BZ_EMAIL}. Respondemos en menos de 48 hs.`}
          />
          <div style={{ marginTop: 56 }}>
            {FAQ.map((item, i) => (
              <FaqItem key={i} item={item} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: "var(--bz-fondo-base)" }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 18 }}>¿Te quedaste con dudas?</div>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 18, color: "var(--bz-texto-primario)", lineHeight: 1.15 }}>
              Escribinos directamente.
            </h3>
            <p style={{ fontSize: 15, color: "var(--bz-texto-secundario)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Te responde alguien del equipo, en persona, en menos de 48 hs.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`mailto:${BZ_EMAIL}`} className="btn btn-primary">{BZ_EMAIL}</a>
              <a href={BZ_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
