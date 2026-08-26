import { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../data.js';

export function BzLogo({ size = 28, color }) {
  const c = color || "var(--bz-verde-profundo)";
  const onDark = color === "var(--bz-beige-hueso)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <img
        src="/bioraiz-symbol.png"
        alt="BIORAIZ"
        style={{
          height: size * 1.42,
          width: "auto",
          flexShrink: 0,
          filter: onDark ? "brightness(0) invert(0.96)" : "none",
        }}
      />
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

export function IconInstagram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export function IconFacebook({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5V21M9 13h5"/>
      <path d="M11.5 21v-9"/>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
    </svg>
  );
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!els.length) return;
    let safety;
    const revealAll = () => els.forEach(el => el.classList.add("in"));
    if (typeof IntersectionObserver === "undefined") { revealAll(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach(el => io.observe(el));
    requestAnimationFrame(() => {
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800) && r.bottom > 0) el.classList.add("in");
      });
    });
    safety = setTimeout(revealAll, 1200);
    return () => { io.disconnect(); clearTimeout(safety); };
  });
}

export function Counter({ to, suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(to * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") { run(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) { run(); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    const safety = setTimeout(() => { if (!started.current) { started.current = true; setVal(to); } }, 1400);
    return () => { io.disconnect(); clearTimeout(safety); };
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

export function Placeholder({ label, ratio = "4/3", dark = false, style = {}, children }) {
  return (
    <div className={"ph" + (dark ? " ph-dark" : "")} style={{ aspectRatio: ratio, borderRadius: "var(--bz-radius-lg)", ...style }}>
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

export function CategoriaIcon({ id, size = 30 }) {
  const common = { width: size, height: size, viewBox: "0 0 28 28", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (id) {
    case "alimentos":
      return (<svg {...common}><path d="M14 9c-2-3-7-2.5-7 2.5C7 17 10 21 14 21s7-4 7-9.5c0-5-5-5.5-7-2.5z"/><path d="M14 9c0-2.5 1.2-4 3.5-4.8"/></svg>);
    case "cosmetica":
      return (<svg {...common}><path d="M14 4c4 5.5 6.5 8.5 6.5 11.5a6.5 6.5 0 0 1-13 0C7.5 12.5 10 9.5 14 4z"/></svg>);
    case "diseno":
      return (<svg {...common}><path d="M7 11l3-4.5h8L21 11l-7 10z"/><path d="M7 11h14M11 6.5l3 4.5 3-4.5"/></svg>);
    case "bienestar":
      return (<svg {...common}><circle cx="14" cy="14" r="4"/><path d="M14 4v2.5M14 21.5V24M4 14h2.5M21.5 14H24M7 7l1.8 1.8M19.2 19.2L21 21M21 7l-1.8 1.8M8.8 19.2L7 21"/></svg>);
    case "infantil":
      return (<svg {...common}><circle cx="14" cy="11" r="6"/><path d="M14 17v4.5M13 21.5h2"/></svg>);
    case "gastro":
      return (<svg {...common}><path d="M5 13.5h18a9 9 0 0 1-18 0z"/><path d="M11 5.5c-1 1-1 2 0 3M14 4.5c-1 1-1 2 0 3M17 5.5c-1 1-1 2 0 3"/></svg>);
    default: return null;
  }
}

export function CategoriaCard({ cat, large = false }) {
  return (
    <article style={{
      background: "var(--bz-beige-hueso)",
      borderRadius: "var(--bz-radius-lg)",
      border: "0.5px solid var(--bz-borde-ligero)",
      padding: large ? "36px 32px" : "28px 26px",
      transition: "transform 300ms var(--bz-ease), box-shadow 300ms var(--bz-ease), border-color 300ms var(--bz-ease)",
      display: "flex", flexDirection: "column",
      height: "100%",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--bz-shadow-md)"; e.currentTarget.style.borderColor = "var(--bz-verde-musgo)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--bz-borde-ligero)"; }}
    >
      <div style={{
        width: large ? 64 : 54, height: large ? 64 : 54, borderRadius: "50%",
        background: "var(--bz-verde-pasto)", color: "var(--bz-verde-profundo)",
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: large ? 24 : 18,
      }}>
        <CategoriaIcon id={cat.id} size={large ? 34 : 30} />
      </div>
      <h3 style={{ fontFamily: "var(--bz-font-display)", fontSize: large ? 28 : 24, color: "var(--bz-texto-primario)", marginBottom: 8, lineHeight: 1.1 }}>{cat.label}</h3>
      {cat.desc && <p style={{ fontSize: large ? 14.5 : 13.5, color: "var(--bz-texto-secundario)", lineHeight: 1.6, marginBottom: 18 }}>{cat.desc}</p>}
      <div style={{ marginTop: "auto" }}>
        <span className="tag tag-outline">Convocatoria abierta</span>
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
              Nos vemos en <em style={{ color: "var(--bz-ocre-calido)" }}>Neuquén Capital.</em>
            </h2>
            <p style={{ fontSize: 17, color: "var(--bz-verde-claro)", maxWidth: 460, lineHeight: 1.55 }}>
              Tres días para encontrarnos, compartir y celebrar lo que nace en nuestra región.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }} className="bz-cta-actions">
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
    case "raíz": return (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="14" r="4" fill={c} />
        <path d="M22 18 L22 36" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <path d="M22 26 L12 36 M22 28 L32 38 M22 32 L18 40 M22 32 L26 40" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="14" r="4" stroke={a} strokeWidth="1.5" fill="none" />
      </svg>
    );
    case "círculo": return (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <path d="M36 22 A 14 14 0 1 1 22 8" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M22 8 L30 8 L30 16" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    case "ola": return (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <path d="M4 18 Q 11 12, 18 18 T 32 18 T 40 18" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M4 28 Q 11 22, 18 28 T 32 28 T 40 28" stroke={a} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
      </svg>
    );
    case "trama": return (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="14" cy="14" r="3" fill={c} />
        <circle cx="30" cy="14" r="3" fill={c} />
        <circle cx="22" cy="30" r="3" fill={a} />
        <path d="M14 14 L30 14 L22 30 Z" stroke={c} strokeWidth="1.5" fill="none" />
      </svg>
    );
    case "brote": return (
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

export function FaqItem({ item, open, onClick, index }) {
  return (
    <div className="reveal" style={{ borderBottom: "0.5px solid var(--bz-borde-suave)", transitionDelay: `${index * 50}ms` }}>
      <button onClick={onClick} style={{ width: "100%", padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, textAlign: "left" }}>
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
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 350ms var(--bz-ease), opacity 250ms var(--bz-ease)", opacity: open ? 1 : 0 }}>
        <p style={{ paddingBottom: 28, paddingRight: 56, fontSize: 15, color: "var(--bz-texto-secundario)", lineHeight: 1.7 }}>{item.a}</p>
      </div>
    </div>
  );
}
