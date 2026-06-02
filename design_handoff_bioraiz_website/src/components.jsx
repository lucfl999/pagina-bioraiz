// ─── BIORAIZ — Shared Components & Hooks ──────────────────────────
const { useState, useEffect, useRef, useCallback } = React;

// ── Logo (wordmark + sprout symbol) ──────────────────────────────
function BzLogo({ size = 28, mono = false, color }) {
  const c = color || (mono ? "currentColor" : "var(--bz-verde-profundo)");
  const acc = mono ? "currentColor" : "var(--bz-ocre-tostado)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
        {/* sprout */}
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

// ── Scroll Reveal Hook ──────────────────────────────────────────
function useReveal() {
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

// ── Animated Counter ────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1400 }) {
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

// ── Header / Nav ────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home",        label: "Inicio" },
  { id: "feria",       label: "La Feria" },
  { id: "expositores", label: "Expositores" },
  { id: "programa",    label: "Programa" },
  { id: "entradas",    label: "Entradas" },
  { id: "participa",   label: "Participá" },
  { id: "prensa",      label: "Prensa" },
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
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center" }}>
          <BzLogo size={26} color={!isLight ? "var(--bz-beige-hueso)" : undefined} />
        </button>

        <nav className="bz-nav-desktop" style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              style={{
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
            onClick={() => setPage("entradas")}
            className="btn btn-ocre btn-sm bz-cta-desktop"
            style={{ padding: "9px 18px", fontSize: 12 }}
          >
            Entradas
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
        @media (max-width: 880px) {
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
              {BZ_DATE_FULL}<br />{BZ_LOCATION}
            </p>
          </div>

          <div>
            <div style={colTitle}>Navegar</div>
            {NAV_LINKS.slice(1).map(l => (
              <a key={l.id} style={colLink} onClick={() => setPage(l.id)} href="#"
                 onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
                 onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>{l.label}</a>
            ))}
          </div>

          <div>
            <div style={colTitle}>Comunidad</div>
            <a href="#" style={colLink}>Postulate como expositor</a>
            <a href="#" style={colLink}>Voluntariado</a>
            <a href="#" style={colLink}>Newsletter</a>
            <a href="#" style={colLink}>Sustentabilidad</a>
          </div>

          <div>
            <div style={colTitle}>Contacto</div>
            <a href="mailto:hola@bioraiz.ar" style={colLink}>hola@bioraiz.ar</a>
            <a href="mailto:prensa@bioraiz.ar" style={colLink}>prensa@bioraiz.ar</a>
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              {["IG", "FB", "YT", "TW"].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(242, 239, 230, 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontFamily: "var(--bz-font-mono)", color: "var(--bz-crema-texto)",
                  transition: "all 200ms var(--bz-ease)",
                }}
                onMouseEnter={e => { e.target.style.background = "var(--bz-ocre-calido)"; e.target.style.color = "var(--bz-verde-profundo)"; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--bz-crema-texto)"; }}>{s}</a>
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
      <Placeholder label={`retrato · ${exp.name}`} ratio={compact ? "5/4" : "4/3"} style={{ borderRadius: 0 }} />
      <div style={{ padding: compact ? "16px 18px" : "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span className="tag" style={{ background: "transparent", color: cat?.color, padding: 0, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>{cat?.label}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--bz-borde-suave)" }} />
          <span style={{ fontSize: 11, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)" }}>{exp.origen}</span>
        </div>
        <h3 style={{ fontFamily: "var(--bz-font-display)", fontSize: compact ? 20 : 22, color: "var(--bz-texto-primario)", marginBottom: 8, lineHeight: 1.15 }}>{exp.name}</h3>
        {!compact && <p style={{ fontSize: 13, color: "var(--bz-texto-secundario)", lineHeight: 1.6 }}>{exp.desc}</p>}
      </div>
    </article>
  );
}

// ── Expose ──
Object.assign(window, {
  BzLogo, useReveal, Counter,
  Header, Footer, SectionHead,
  Placeholder, LeafShape, CircleShape,
  ExpositorCard, NAV_LINKS,
});
