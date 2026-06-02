import { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../data.js';

export function BzLogo({ size = 28, mono = false, color }) {
  const c = color || (mono ? "currentColor" : "var(--bz-verde-profundo)");
  const acc = mono ? "currentColor" : "var(--bz-ocre-tostado)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
        <path d="M16 28 L16 14" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <path d="M16 18 C 9 18, 7 12, 7 8 C 12 9, 16 12, 16 18 Z" fill={c} />
        <path d="M16 14 C 23 14, 25 9, 25 5 C 20 6, 16 8, 16 14 Z" fill={acc} />
        <circle cx="16" cy="28" r="1.6" fill={c} />
      </svg>
      <span style={{
        fontFamily: "var(--bz-font-display)",
        fontWeight: 600,
        fontSize: size * 0.62,
        letterSpacing: "0.16em",
        color: c,
        lineHeight: 1,
      }}>BIORAIZ</span>
    </div>
  );
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

export function Counter({ to, suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function SectionHead({ eyebrow, title, sub, align = "left", color, accent }) {
  return (
    <div className="reveal" style={{ textAlign: align, maxWidth: align === "center" ? 680 : "none", margin: align === "center" ? "0 auto" : 0 }}>
      {eyebrow && <div className={"eyebrow" + (accent === "tierra" ? " eyebrow-tierra" : "")} style={{ marginBottom: 14 }}>{eyebrow}</div>}
      <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: color || "var(--bz-texto-primario)", marginBottom: sub ? 18 : 0 }}>{title}</h2>
      {sub && <p style={{ fontSize: 17, color: "var(--bz-texto-secundario)", lineHeight: 1.65, maxWidth: 580, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{sub}</p>}
    </div>
  );
}

export function Placeholder({ label, ratio = "4/3", dark = false, style = {}, children, decoration }) {
  return (
    <div className={"ph" + (dark ? " ph-dark" : "")} style={{ aspectRatio: ratio, borderRadius: "var(--bz-radius-lg)", ...style }}>
      {decoration}
      {children || <span className="ph-label">{label}</span>}
    </div>
  );
}

export function LeafShape({ size = 80, color = "var(--bz-verde-musgo)", rotate = 0, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <path d="M40 8 C 18 18, 8 38, 12 64 C 38 60, 60 42, 68 14 C 56 12, 48 10, 40 8 Z" fill={color} opacity="0.85" />
      <path d="M40 8 C 38 22, 30 40, 14 62" stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function CircleShape({ size = 80, color = "var(--bz-ocre-calido)", style = {} }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: color, ...style }} />;
}

export function ExpositorCard({ exp, compact = false }) {
  const cat = CATEGORIES.find(c => c.id === exp.cat);
  return (
    <article style={{
      background: "var(--bz-beige-hueso)",
      borderRadius: "var(--bz-radius-lg)",
      overflow: "hidden",
      border: "0.5px solid var(--bz-borde-ligero)",
      transition: "transform 300ms var(--bz-ease), box-shadow 300ms var(--bz-ease)",
      cursor: "pointer",
      display: "flex", flexDirection: "column",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--bz-shadow-md)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <Placeholder label={`retrato · ${exp.name}`} ratio={compact ? "5/4" : "4/3"} style={{ borderRadius: 0 }} />
      <div style={{ padding: compact ? "16px 18px" : "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ background: "transparent", color: cat?.color, padding: 0, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>{cat?.label}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--bz-borde-suave)" }} />
          <span style={{ fontSize: 11, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)" }}>{exp.origen}</span>
        </div>
        <h3 style={{ fontFamily: "var(--bz-font-display)", fontSize: compact ? 20 : 22, color: "var(--bz-texto-primario)", marginBottom: 8, lineHeight: 1.15 }}>{exp.name}</h3>
        {!compact && <p style={{ fontSize: 13, color: "var(--bz-texto-secundario)", lineHeight: 1.6 }}>{exp.desc}</p>}
      </div>
    </article>
  );
}

export function SubPageHeader({ eyebrow, title, sub }) {
  return (
    <section style={{ background: "var(--bz-fondo-dark)", color: "var(--bz-beige-hueso)", padding: "180px 0 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "-3%", opacity: 0.18 }}>
        <LeafShape size={260} color="var(--bz-verde-musgo)" rotate={-25} />
      </div>
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", opacity: 0.12 }}>
        <LeafShape size={300} color="var(--bz-ocre-calido)" rotate={140} />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 18, animation: "bz-fade-up 700ms var(--bz-ease) both" }}>{eyebrow}</div>
        <h1 className="display" style={{ fontSize: "clamp(56px, 9vw, 132px)", color: "var(--bz-beige-hueso)", lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 24, animation: "bz-fade-up 800ms var(--bz-ease) 100ms both" }}>
          {title}
        </h1>
        {sub && (
          <p style={{
            fontFamily: "var(--bz-font-display)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2.2vw, 24px)",
            color: "var(--bz-verde-claro)",
            maxWidth: 720,
            lineHeight: 1.45,
            animation: "bz-fade-up 800ms var(--bz-ease) 200ms both",
          }}>{sub}</p>
        )}
      </div>
    </section>
  );
}

export function CTABanner({ setPage }) {
  return (
    <section style={{ padding: "100px 0", background: "var(--bz-fondo-base)" }}>
      <div className="container">
        <div className="reveal bz-cta-banner" style={{
          background: "var(--bz-verde-profundo)",
          borderRadius: "var(--bz-radius-xl)",
          padding: "72px 64px",
          color: "var(--bz-beige-hueso)",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 48,
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, opacity: 0.25 }}>
            <LeafShape size={240} color="var(--bz-ocre-calido)" rotate={45} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 18 }}>13 · 14 · 15 nov 2026</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "var(--bz-beige-hueso)", lineHeight: 1.05, marginBottom: 18 }}>
              Nos vemos en <em style={{ color: "var(--bz-ocre-calido)" }}>el Parque.</em>
            </h2>
            <p style={{ fontSize: 17, color: "var(--bz-verde-claro)", maxWidth: 460, lineHeight: 1.55 }}>
              Tu entrada ya está disponible en precio Early Bird hasta fin de septiembre.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }} className="bz-cta-actions">
            <button onClick={() => setPage("entradas")} className="btn btn-ocre" style={{ width: "100%", justifyContent: "center" }}>Comprar entrada</button>
            <button onClick={() => setPage("programa")} className="btn" style={{ width: "100%", justifyContent: "center", background: "transparent", color: "var(--bz-beige-hueso)", border: "1.5px solid rgba(250, 246, 237, 0.3)" }}>Ver programa</button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .bz-cta-banner { grid-template-columns: 1fr !important; padding: 48px 32px !important; }
        }
      `}</style>
    </section>
  );
}

export function ValorIcon({ kind }) {
  const c = "var(--bz-verde-profundo)";
  const a = "var(--bz-tierra-rojo)";
  const size = 44;
  switch (kind) {
    case "raíz":
      return (
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="14" r="4" fill={c} />
          <path d="M22 18 L22 36" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <path d="M22 26 L12 36 M22 28 L32 38 M22 32 L18 40 M22 32 L26 40" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="22" cy="14" r="4" stroke={a} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "círculo":
      return (
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
          <path d="M36 22 A 14 14 0 1 1 22 8" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M22 8 L30 8 L30 16" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ola":
      return (
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
          <path d="M4 18 Q 11 12, 18 18 T 32 18 T 40 18" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M4 28 Q 11 22, 18 28 T 32 28 T 40 28" stroke={a} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        </svg>
      );
    case "trama":
      return (
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
          <circle cx="14" cy="14" r="3" fill={c} />
          <circle cx="30" cy="14" r="3" fill={c} />
          <circle cx="22" cy="30" r="3" fill={a} />
          <path d="M14 14 L30 14 L22 30 Z" stroke={c} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "brote":
      return (
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
          <path d="M22 38 L22 18" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <path d="M22 22 C 14 22, 12 16, 12 12 C 18 13, 22 16, 22 22 Z" fill={c} />
          <path d="M22 18 C 30 18, 32 14, 32 10 C 26 11, 22 12, 22 18 Z" fill={a} />
        </svg>
      );
    default: return null;
  }
}

export function ValorBlock({ valor, index }) {
  return (
    <div className="reveal" style={{
      background: "var(--bz-beige-hueso)",
      padding: "40px 32px",
      transitionDelay: `${index * 80}ms`,
      transition: "background 250ms var(--bz-ease)",
    }}>
      <ValorIcon kind={valor.icon} />
      <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 24, color: "var(--bz-texto-primario)", marginTop: 24, marginBottom: 10 }}>
        {valor.title}
      </h4>
      <p style={{ fontSize: 14, color: "var(--bz-texto-secundario)", lineHeight: 1.65 }}>{valor.desc}</p>
    </div>
  );
}

export function TicketCard({ ticket, index }) {
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
        {ticket.unidad && (
          <div style={{ fontSize: 12, opacity: 0.55, marginTop: 4, fontFamily: "var(--bz-font-mono)" }}>{ticket.unidad}</div>
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

export function FaqItem({ item, open, onClick, index }) {
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
