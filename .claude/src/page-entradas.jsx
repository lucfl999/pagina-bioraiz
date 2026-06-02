// ─── BIORAIZ — Entradas ──────────────────────────────────────────

function PageEntradas({ setPage }) {
  useReveal();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Entradas · BIORAIZ 2026"
        title={<>Tu lugar.</>}
        sub="3 tipos de entrada. Todos los tipos incluyen los 3 días del evento. Recargos hasta 3 cuotas sin interés."
      />

      {/* TICKETS */}
      <section style={{ padding: "60px 0 80px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }} className="bz-tickets-grid">
            {TICKETS.map((t, i) => (
              <TicketCard key={t.id} ticket={t} index={i} />
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .bz-tickets-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* PAYMENT METHODS */}
      <section style={{ padding: "32px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container-narrow">
          <div className="reveal" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, padding: "28px 40px", background: "var(--bz-beige-hueso)", border: "0.5px solid var(--bz-borde-ligero)", borderRadius: "var(--bz-radius-lg)", flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, color: "var(--bz-texto-terciario)", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>Pagás con</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {["Visa", "Mastercard", "Amex", "Mercado Pago", "Modo", "Transferencia"].map(m => (
                <span key={m} style={{ padding: "6px 14px", background: "var(--bz-fondo-base)", borderRadius: "var(--bz-radius-pill)", fontSize: 12, color: "var(--bz-texto-secundario)", fontWeight: 500 }}>{m}</span>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--bz-verde-musgo)", fontFamily: "var(--bz-font-mono)", letterSpacing: "0.04em" }}>· hasta 3 cuotas s/interés</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "60px 0 120px", background: "var(--bz-fondo-alt)" }}>
        <div className="container-narrow">
          <SectionHead
            eyebrow="Preguntas frecuentes"
            title={<>Lo que <em>siempre</em> nos preguntan.</>}
            sub="Si tu duda no está acá, escribinos a hola@bioraiz.ar. Respondemos en menos de 48 hs."
          />

          <div style={{ marginTop: 56 }}>
            {FAQ.map((item, i) => (
              <FaqItem key={i} item={item} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: "100px 0", background: "var(--bz-fondo-base)" }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 18 }}>¿Te quedaste con dudas?</div>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 18, color: "var(--bz-texto-primario)", lineHeight: 1.15 }}>
              Escribinos directamente.
            </h3>
            <p style={{ fontSize: 15, color: "var(--bz-texto-secundario)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Atendemos personas, no formularios. Te responde alguien del equipo en menos de 48 hs.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:hola@bioraiz.ar" className="btn btn-primary">hola@bioraiz.ar</a>
              <a href="https://wa.me/" className="btn btn-secondary">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Ticket card ──
function TicketCard({ ticket, index }) {
  const colors = {
    ocre:    { bg: "var(--bz-ocre-calido)",    fg: "var(--bz-verde-profundo)", accent: "var(--bz-verde-profundo)", border: "var(--bz-ocre-tostado)" },
    verde:   { bg: "var(--bz-verde-profundo)", fg: "var(--bz-beige-hueso)",    accent: "var(--bz-ocre-calido)",    border: "var(--bz-verde-profundo)" },
    tierra:  { bg: "var(--bz-beige-hueso)",    fg: "var(--bz-texto-primario)", accent: "var(--bz-tierra-rojo)",    border: "var(--bz-borde-suave)" },
  };
  const c = colors[ticket.color];
  const featured = ticket.destacado;

  return (
    <article className="reveal" style={{
      background: c.bg,
      color: c.fg,
      borderRadius: "var(--bz-radius-xl)",
      padding: "40px 36px",
      border: `1px solid ${c.border}`,
      boxShadow: featured ? "var(--bz-shadow-lg)" : "none",
      transform: featured ? "translateY(-12px)" : "none",
      transition: "transform 300ms var(--bz-ease), box-shadow 300ms var(--bz-ease)",
      transitionDelay: `${index * 100}ms`,
      position: "relative",
      display: "flex", flexDirection: "column",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = featured ? "translateY(-16px)" : "translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = featured ? "translateY(-12px)" : "translateY(0)"; }}
    >
      {featured && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "var(--bz-ocre-calido)", color: "var(--bz-verde-profundo)",
          padding: "5px 14px", borderRadius: "var(--bz-radius-pill)",
          fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)",
        }}>★ Más elegida</div>
      )}

      <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)", opacity: 0.7, marginBottom: 14 }}>{ticket.badge}</div>
      <h3 style={{ fontFamily: "var(--bz-font-display)", fontSize: 36, marginBottom: 16, lineHeight: 1 }}>{ticket.name}</h3>

      <div style={{ marginBottom: 28 }}>
        <div className="display" style={{ fontSize: 48, color: c.accent, lineHeight: 1 }}>{ticket.precio}</div>
        {ticket.precioOrig && (
          <div style={{ fontSize: 13, opacity: 0.6, textDecoration: "line-through", marginTop: 6 }}>{ticket.precioOrig}</div>
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

      <button style={{
        padding: "14px 24px",
        borderRadius: "var(--bz-radius-pill)",
        background: ticket.color === "verde" ? "var(--bz-ocre-calido)" : "var(--bz-verde-profundo)",
        color: ticket.color === "verde" ? "var(--bz-verde-profundo)" : "var(--bz-beige-hueso)",
        fontSize: 14, fontWeight: 500,
        transition: "transform 200ms var(--bz-spring)",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        Comprar {ticket.name}
      </button>
    </article>
  );
}

// ── FAQ Item ──
function FaqItem({ item, open, onClick, index }) {
  return (
    <div className="reveal" style={{ borderBottom: "0.5px solid var(--bz-borde-suave)", transitionDelay: `${index * 50}ms` }}>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          padding: "24px 0",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
          textAlign: "left",
        }}
      >
        <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 20, color: "var(--bz-texto-primario)", lineHeight: 1.3, fontWeight: 500 }}>{item.q}</h4>
        <span style={{
          width: 32, height: 32, borderRadius: "50%",
          border: "1px solid var(--bz-borde-suave)",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: open ? "var(--bz-verde-profundo)" : "transparent",
          color: open ? "var(--bz-beige-hueso)" : "var(--bz-verde-profundo)",
          transition: "all 250ms var(--bz-ease)",
          flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: "hidden",
        transition: "max-height 350ms var(--bz-ease), opacity 250ms var(--bz-ease)",
        opacity: open ? 1 : 0,
      }}>
        <p style={{ paddingBottom: 28, paddingRight: 56, fontSize: 15, color: "var(--bz-texto-secundario)", lineHeight: 1.7 }}>{item.a}</p>
      </div>
    </div>
  );
}

window.PageEntradas = PageEntradas;
