// BIORAIZ — Componentes compartidos (Logo, Header, Footer, cards, hooks)
// Requiere: React 18 global + data.js + components.jsx cargados antes.
// ─── BIORAIZ — Shared Components & Hooks ──────────────────────────
import * as React from 'react';
import {
  BZ_DATE_SHORT,
  BZ_EMAIL,
  BZ_FACEBOOK,
  BZ_HORARIO,
  BZ_INSTAGRAM,
  BZ_NAV_CONFIRMADA,
  BZ_NAV_TARGET,
  BZ_WHATSAPP_LABEL,
  BZ_WHATSAPP_LINK,
  CATEGORIES,
} from './data.js';

const { useState, useEffect, useRef, useCallback } = React;

// ── Logo (wordmark + sprout symbol) ──────────────────────────────
function BzLogo({ size = 28, mono = false, color }) {
  const onDark = mono || color === "var(--bz-beige-hueso)";
  return (
    <img
      src={onDark ? "assets/bioraiz-logo.png" : "assets/bioraiz-logo-dark.png"}
      alt="BIORAIZ"
      style={{
        height: size * 2.6,
        width: "auto",
        flexShrink: 0,
      }}
    />
  );
}

// ── Scroll Reveal Hook ──────────────────────────────────────────
function useReveal() {
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
    // Fallback: if the observer never fires (e.g. inside a re-hosted/bundled
    // document where IO can stay inert), force-reveal everything so content is
    // never stuck invisible. Also reveal anything already within the viewport.
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

// ── Animated Counter ────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1400 }) {
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
      if (entries[0].isIntersecting && !started.current) {
        run();
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    // Safety: ensure the final value shows even if the observer stays inert.
    const safety = setTimeout(() => { if (!started.current) { started.current = true; setVal(to); } }, 1400);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString("es-AR")}{suffix}</span>;
}

// ── Header / Nav ────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home",        label: "Navidad" },
  { id: "actividades", label: "Actividades" },
  { id: "edicion1",    label: "Edición 1" },
  { id: "expositores", label: "Expositores" },
  { id: "participa",   label: "Participá" },
];

function Header({ page, setPage, transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [page]);

  const isLight = !transparent || scrolled;

  const headerStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    transition: "background 300ms var(--bz-ease), border-color 300ms var(--bz-ease), padding 300ms var(--bz-ease)",
    background: isLight ? "rgba(250, 246, 237, 0.86)" : "transparent",
    backdropFilter: isLight ? "blur(10px) saturate(140%)" : "none",
    WebkitBackdropFilter: isLight ? "blur(10px) saturate(140%)" : "none",
    borderBottom: isLight ? "0.5px solid var(--bz-borde-ligero)" : "0.5px solid transparent",
    padding: scrolled ? "12px 0" : "20px 0",
  };

  return (
    <header style={headerStyle}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <BzLogo size={26} color={!isLight ? "var(--bz-beige-hueso)" : undefined} />
        </button>

        <nav className="bz-nav-desktop" style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              style={{
                whiteSpace: "nowrap",
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: !isLight ? "var(--bz-beige-hueso)" : (page === link.id ? "var(--bz-verde-profundo)" : "var(--bz-texto-secundario)"),
                borderRadius: "var(--bz-radius-pill)",
                position: "relative",
                transition: "color 200ms var(--bz-ease)",
              }}
            >
              {link.label}
              {page === link.id && (
                <span style={{
                  position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%",
                  background: !isLight ? "var(--bz-ocre-calido)" : "var(--bz-tierra-rojo)",
                }} />
              )}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setPage("participa")}
            className="btn btn-ocre btn-sm bz-cta-desktop"
            style={{ padding: "9px 18px", fontSize: 12 }}
          >
            Quiero participar
          </button>
          <button
            className="bz-burger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menú"
            style={{
              display: "none", width: 36, height: 36, alignItems: "center", justifyContent: "center",
              borderRadius: "50%", color: !isLight ? "var(--bz-beige-hueso)" : "var(--bz-verde-profundo)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <><path d="M6 6l12 12"/><path d="M18 6l-12 12"/></> : <><path d="M3 7h18"/><path d="M3 17h18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          background: "var(--bz-beige-hueso)",
          borderTop: "0.5px solid var(--bz-borde-ligero)",
          padding: "16px 0",
          animation: "bz-slide-down 240ms var(--bz-ease)",
        }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                style={{
                  padding: "12px 8px",
                  fontSize: 16,
                  textAlign: "left",
                  color: page === link.id ? "var(--bz-verde-profundo)" : "var(--bz-texto-secundario)",
                  fontWeight: page === link.id ? 600 : 400,
                  borderBottom: "0.5px solid var(--bz-borde-ligero)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .bz-nav-desktop { display: none !important; }
          .bz-cta-desktop { display: none !important; }
          .bz-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

// ── Footer ─────────────────────────────────────────────────────
const ECO_PHRASES = [
  "Esta página se carga con menos de 200 kb. La sustentabilidad también es digital.",
  "Cada link visitado consume menos que un mate. Pero igual, andá despacio.",
  "Tipografía cargada una sola vez. El resto, te lo regala el navegador.",
  "Sin trackers, sin pop-ups, sin oscuridad. Solo BIORAIZ.",
];

function Footer({ setPage }) {
  const [eco] = useState(() => ECO_PHRASES[Math.floor(Math.random() * ECO_PHRASES.length)]);

  const colTitle = { fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--bz-ocre-calido)", marginBottom: 16, fontFamily: "var(--bz-font-mono)" };
  const colLink = { display: "block", padding: "5px 0", fontSize: 14, color: "rgba(242, 239, 230, 0.78)", transition: "color 200ms var(--bz-ease)" };

  return (
    <footer style={{ background: "var(--bz-fondo-dark)", color: "var(--bz-crema-texto)", marginTop: 80 }}>
      <div className="container" style={{ padding: "72px 32px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }} className="bz-footer-grid">
          <div>
            <BzLogo size={28} color="var(--bz-beige-hueso)" />
            <p style={{ marginTop: 20, fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: 18, lineHeight: 1.45, color: "var(--bz-verde-claro)" }}>
              Donde la tierra<br />florece y la comunidad crece.
            </p>
            <p style={{ marginTop: 24, fontSize: 13, color: "rgba(242, 239, 230, 0.65)", lineHeight: 1.7 }}>
              Edición Navideña<br />{BZ_DATE_SHORT} · {BZ_HORARIO}
            </p>
          </div>

          <div>
            <div style={colTitle}>Navegar</div>
            {NAV_LINKS.map(l => (
              <a key={l.id} style={colLink} onClick={(e) => { e.preventDefault(); setPage(l.id); }} href="#"
                 onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
                 onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>{l.label}</a>
            ))}
          </div>

          <div>
            <div style={colTitle}>Comunidad</div>
            {[["expositor","Postulate como expositor"],["tallerista","Proponé una actividad"],["sponsor","Sumate como sponsor"],["voluntario","Voluntariado"]].map(([r,l]) => (
              <a key={r} href="#" style={colLink} onClick={(e) => { e.preventDefault(); setPage("participa", r); }}>{l}</a>
            ))}
          </div>

          <div>
            <div style={colTitle}>Contacto</div>
            <a href={`mailto:${BZ_EMAIL}`} style={colLink}>{BZ_EMAIL}</a>
            <a href={BZ_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={colLink}>WhatsApp {BZ_WHATSAPP_LABEL}</a>
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              {[
                { label: "Instagram", href: BZ_INSTAGRAM, Icon: IconInstagram },
                { label: "Facebook",  href: BZ_FACEBOOK,  Icon: IconFacebook },
              ].map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(242, 239, 230, 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--bz-crema-texto)",
                  transition: "all 200ms var(--bz-ease)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--bz-ocre-calido)"; e.currentTarget.style.color = "var(--bz-verde-profundo)"; e.currentTarget.style.borderColor = "var(--bz-ocre-calido)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--bz-crema-texto)"; e.currentTarget.style.borderColor = "rgba(242, 239, 230, 0.2)"; }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "0.5px solid rgba(242, 239, 230, 0.15)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap",
          fontSize: 12, color: "rgba(242, 239, 230, 0.5)", fontFamily: "var(--bz-font-mono)",
        }}>
          <div>🌱 {eco}</div>
          <div>© 2026 BIORAIZ · Neuquén, Argentina</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bz-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 520px) {
          .bz-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ── Section heading (eyebrow + display) ──────────────────────────
function SectionHead({ eyebrow, title, sub, align = "left", color, accent }) {
  return (
    <div className="reveal" style={{ textAlign: align, maxWidth: align === "center" ? 680 : "none", margin: align === "center" ? "0 auto" : 0 }}>
      {eyebrow && <div className={"eyebrow" + (accent === "tierra" ? " eyebrow-tierra" : "")} style={{ marginBottom: 14 }}>{eyebrow}</div>}
      <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: color || "var(--bz-texto-primario)", marginBottom: sub ? 18 : 0 }}>{title}</h2>
      {sub && <p style={{ fontSize: 17, color: "var(--bz-texto-secundario)", lineHeight: 1.65, maxWidth: 580, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{sub}</p>}
    </div>
  );
}

// ── Generic placeholder card ─────────────────────────────────────
function Placeholder({ label, ratio = "4/3", dark = false, style = {}, children, decoration }) {
  return (
    <div className={"ph" + (dark ? " ph-dark" : "")} style={{ aspectRatio: ratio, borderRadius: "var(--bz-radius-lg)", ...style }}>
      {decoration}
      {children || <span className="ph-label">{label}</span>}
    </div>
  );
}

// ── Decorative organic shapes (inline SVG) ───────────────────────
function LeafShape({ size = 80, color = "var(--bz-verde-musgo)", rotate = 0, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <path d="M40 8 C 18 18, 8 38, 12 64 C 38 60, 60 42, 68 14 C 56 12, 48 10, 40 8 Z" fill={color} opacity="0.85" />
      <path d="M40 8 C 38 22, 30 40, 14 62" stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" />
    </svg>
  );
}

function CircleShape({ size = 80, color = "var(--bz-ocre-calido)", style = {} }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: color, ...style }} />;
}

// ── Expositor card ──────────────────────────────────────────────
function ExpositorCard({ exp, compact = false }) {
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
      {exp.foto ? (
        <div style={{ position: "relative", aspectRatio: compact ? "5/4" : "4/3", background: "var(--bz-fondo-alt)" }}>
          <img src={exp.foto} alt={exp.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {exp.logo && (
            <img src={exp.logo} alt={`Logo ${exp.name}`} style={{ position: "absolute", zIndex: 1, left: 16, bottom: -28, width: 64, height: 64, borderRadius: "50%", objectFit: "contain", background: "#fff", border: "3px solid var(--bz-beige-hueso)", boxShadow: "var(--bz-shadow-sm, 0 2px 8px rgba(0,0,0,.12))" }} />
          )}
        </div>
      ) : (
        <Placeholder label={`retrato · ${exp.name}`} ratio={compact ? "5/4" : "4/3"} style={{ borderRadius: 0 }} />
      )}
      <div style={{ padding: compact ? "16px 18px" : "20px 22px", paddingTop: exp.logo ? 40 : undefined }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span className="tag" style={{ background: "transparent", color: cat?.color, padding: 0, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>{cat?.label}</span>
          {exp.origen && <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--bz-borde-suave)" }} />}
          {exp.origen && <span style={{ fontSize: 11, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)" }}>{exp.origen}</span>}
        </div>
        <h3 style={{ fontFamily: "var(--bz-font-display)", fontSize: compact ? 20 : 22, color: "var(--bz-texto-primario)", marginBottom: 8, lineHeight: 1.15 }}>{exp.name}</h3>
        {!compact && <p style={{ fontSize: 13, color: "var(--bz-texto-secundario)", lineHeight: 1.6 }}>{exp.desc}</p>}
      </div>
    </article>
  );
}

// ── Iconos de categoría (línea, 28×28) ───────────────────
function CategoriaIcon({ id, size = 30 }) {
  const common = { width: size, height: size, viewBox: "0 0 28 28", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (id) {
    case "alimentos": // manzana
      return (<svg {...common}><path d="M14 9c-2-3-7-2.5-7 2.5C7 17 10 21 14 21s7-4 7-9.5c0-5-5-5.5-7-2.5z"/><path d="M14 9c0-2.5 1.2-4 3.5-4.8"/></svg>);
    case "cosmetica": // gota
      return (<svg {...common}><path d="M14 4c4 5.5 6.5 8.5 6.5 11.5a6.5 6.5 0 0 1-13 0C7.5 12.5 10 9.5 14 4z"/></svg>);
    case "diseno": // gema / artesanía
      return (<svg {...common}><path d="M7 11l3-4.5h8L21 11l-7 10z"/><path d="M7 11h14M11 6.5l3 4.5 3-4.5"/></svg>);
    case "bienestar": // sol
      return (<svg {...common}><circle cx="14" cy="14" r="4"/><path d="M14 4v2.5M14 21.5V24M4 14h2.5M21.5 14H24M7 7l1.8 1.8M19.2 19.2L21 21M21 7l-1.8 1.8M8.8 19.2L7 21"/></svg>);
    case "infantil": // globo
      return (<svg {...common}><circle cx="14" cy="11" r="6"/><path d="M14 17v4.5M13 21.5h2"/></svg>);
    case "gastro": // bol con vapor
      return (<svg {...common}><path d="M5 13.5h18a9 9 0 0 1-18 0z"/><path d="M11 5.5c-1 1-1 2 0 3M14 4.5c-1 1-1 2 0 3M17 5.5c-1 1-1 2 0 3"/></svg>);
    default: return null;
  }
}

// ── Tarjeta de categoría con stands disponibles ──────────────
function CategoriaCard({ cat, large = false }) {
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
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span className="display" style={{ fontSize: large ? 34 : 28, color: "var(--bz-tierra-rojo)", lineHeight: 1 }}>{cat.stands}</span>
          <span style={{ fontSize: 12, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)" }}>stands</span>
        </div>
        <span className="tag tag-outline">Convocatoria abierta</span>
      </div>
    </article>
  );
}

// ── Iconos de redes (línea, 18×18) ────────────────────────
function IconInstagram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5V21M9 13h5"/>
      <path d="M11.5 21v-9"/>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
    </svg>
  );
}

// ── Navidad: guirnalda de luces, estrella, cuenta regresiva ──
function Garland({ top = 0, segments = 6, opacity = 1 }) {
  const cols = ["var(--bz-tierra-claro)", "var(--bz-ocre-calido)", "var(--bz-verde-claro)"];
  const W = 1200, seg = W / segments, bulbs = [];
  for (let s = 0; s < segments; s++) [0.2, 0.5, 0.8].forEach(t => bulbs.push({ x: (s + t) * seg, y: 8 + 120 * t * (1 - t) }));
  let path = "M0,8"; for (let s = 0; s < segments; s++) path += " Q" + ((s + 0.5) * seg) + ",68 " + ((s + 1) * seg) + ",8";
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top, height: 64, pointerEvents: "none", zIndex: 2, opacity }}>
      <svg width="100%" height="64" viewBox="0 0 1200 64" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        <path d={path} fill="none" stroke="rgba(242,239,230,0.28)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      {bulbs.map((b, i) => (
        <span key={i} className="bz-bulb" style={{ left: (b.x / W * 100) + "%", top: b.y, background: cols[i % 3], color: cols[i % 3], animationDelay: ((i * 0.37) % 2.4) + "s" }} />
      ))}
    </div>
  );
}

function StarShape({ size = 40, color = "var(--bz-ocre-calido)", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={style} aria-hidden="true">
      <path d="M20 2 C21.5 14 26 18.5 38 20 C26 21.5 21.5 26 20 38 C18.5 26 14 21.5 2 20 C14 18.5 18.5 14 20 2 Z" fill={color} />
    </svg>
  );
}

function useCountdown(target) {
  const calc = () => Math.max(0, new Date(target).getTime() - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => { const t = setInterval(() => setMs(calc()), 1000); return () => clearInterval(t); }, [target]);
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60, done: ms === 0 };
}

function Countdown({ target = BZ_NAV_TARGET, light = true, size = "lg" }) {
  const t = useCountdown(target);
  const big = size === "lg";
  if (!BZ_NAV_CONFIRMADA) return (
    <div style={{ padding: big ? "20px 18px" : "14px 16px", borderRadius: "var(--bz-radius-md)", background: light ? "rgba(250,246,237,0.08)" : "var(--bz-beige-hueso)", border: light ? "0.5px solid rgba(230,203,122,0.3)" : "0.5px solid var(--bz-borde-suave)" }}>
      <div className="display" style={{ fontSize: big ? "clamp(34px, 4vw, 46px)" : 30, lineHeight: 1, color: light ? "var(--bz-beige-hueso)" : "var(--bz-verde-profundo)" }}>Diciembre</div>
      <div style={{ marginTop: 8, fontSize: 13, color: light ? "var(--bz-verde-claro)" : "var(--bz-texto-secundario)" }}>Anunciamos el día muy pronto.</div>
    </div>
  );
  const units = [["d", "días"], ["h", "horas"], ["m", "min"], ["s", "seg"]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: big ? 10 : 8 }}>
      {units.map(([k, l]) => (
        <div key={k} style={{ textAlign: "center", padding: big ? "14px 6px 10px" : "10px 4px 8px", borderRadius: "var(--bz-radius-md)", background: light ? "rgba(250,246,237,0.08)" : "var(--bz-beige-hueso)", border: light ? "0.5px solid rgba(230,203,122,0.3)" : "0.5px solid var(--bz-borde-suave)" }}>
          <div className="display" style={{ fontSize: big ? "clamp(34px, 4vw, 48px)" : 30, lineHeight: 1, color: light ? "var(--bz-beige-hueso)" : "var(--bz-verde-profundo)", fontVariantNumeric: "tabular-nums" }}>{String(t[k]).padStart(2, "0")}</div>
          <div style={{ marginTop: 6, fontFamily: "var(--bz-font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: light ? "var(--bz-ocre-calido)" : "var(--bz-texto-terciario)" }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

// ── Expose ──
export {
  BzLogo, useReveal, Counter,
  Header, Footer, SectionHead,
  Placeholder, LeafShape, CircleShape,
  ExpositorCard, CategoriaIcon, CategoriaCard,
  IconInstagram, IconFacebook, NAV_LINKS, Garland, StarShape, Countdown, useCountdown,
};