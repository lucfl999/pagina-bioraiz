// ─── BIORAIZ — La Feria ──────────────────────────────────────────

function PageFeria({ setPage }) {
  useReveal();

  return (
    <div className="page-enter">
      {/* HEADER */}
      <SubPageHeader
        eyebrow="Sobre BIORAIZ"
        title={<>La Feria.</>}
        sub="Una historia que empezó con cuatro productores en una plaza y hoy convoca a 24.000 personas. Esto es lo que somos y por qué seguimos."
      />

      {/* HISTORY */}
      <section style={{ padding: "60px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }} className="bz-feria-history">
            <div className="reveal" style={{ position: "sticky", top: 120 }}>
              <Placeholder label="archivo · primera edición · 2021" ratio="3/4" />
            </div>
            <div>
              <div className="reveal eyebrow" style={{ marginBottom: 14 }}>Origen</div>
              <h2 className="reveal display" style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 32, color: "var(--bz-texto-primario)" }}>
                Cuatro productores, una plaza, una idea simple.
              </h2>
              <div className="reveal reveal-delay-1" style={{ fontSize: 17, color: "var(--bz-texto-secundario)", lineHeight: 1.85, marginBottom: 24 }}>
                <p style={{ marginBottom: 20 }}>En 2021, cuatro productores patagónicos armaron una mesa larga en la plaza central de Neuquén y se sentaron a ver qué pasaba. Lo que pasó fue que la gente se quedó. Se quedó a probar, a preguntar, a contar.</p>
                <p style={{ marginBottom: 20 }}>De ahí salió la idea de hacer una feria. No un evento. No un mercado. <strong style={{ color: "var(--bz-texto-primario)" }}>Una feria, en el sentido más original de la palabra:</strong> un lugar donde la gente se junta a intercambiar — productos, sí, pero también tiempo, conocimiento y modos de hacer.</p>
                <p style={{ marginBottom: 20 }}>Cuatro años después, BIORAIZ junta a más de 80 expositores curados, una agenda de charlas y talleres, y miles de personas que vienen de toda la Patagonia. Pero seguimos guardando ese gesto inicial: una mesa larga, y tiempo.</p>
              </div>

              <div className="reveal reveal-delay-2" style={{ marginTop: 48, padding: "24px 28px", background: "var(--bz-verde-pasto)", borderLeft: "3px solid var(--bz-verde-musgo)", borderRadius: "0 var(--bz-radius-md) var(--bz-radius-md) 0" }}>
                <p style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: 19, color: "var(--bz-verde-profundo)", lineHeight: 1.5 }}>
                  "No queremos crecer más rápido. Queremos crecer mejor."
                </p>
                <p style={{ fontSize: 12, color: "var(--bz-verde-bosque)", marginTop: 12, fontFamily: "var(--bz-font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Carla Reinoso · Dirección
                </p>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .bz-feria-history { grid-template-columns: 1fr !important; gap: 32px !important; }
            .bz-feria-history > div:first-child { position: relative !important; top: 0 !important; }
          }
        `}</style>
      </section>

      {/* VALORES */}
      <section style={{ padding: "100px 0", background: "var(--bz-fondo-alt)" }}>
        <div className="container">
          <SectionHead
            eyebrow="Nuestros valores"
            title={<>No los pegamos a la pared.<br /><em>Los usamos para decidir.</em></>}
            sub="Cada decisión de la feria — desde qué expositor entra hasta qué tipo de vasos usamos — pasa por estos 5 filtros."
          />

          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: "var(--bz-borde-suave)", border: "0.5px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-lg)", overflow: "hidden" }}>
            {VALORES.map((v, i) => (
              <ValorBlock key={i} valor={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SUSTENTABILIDAD */}
      <section style={{ padding: "120px 0", background: "var(--bz-fondo-base)" }} className="trama">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} className="bz-feria-sust">
            <div>
              <SectionHead
                eyebrow="Sustentabilidad"
                title={<>5 compromisos <em>medibles.</em></>}
                sub="Sin esto, no hay BIORAIZ. Cada edición publicamos los resultados — los buenos y los que aún no funcionan."
              />
              <div className="reveal reveal-delay-3" style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px", border: "1px solid var(--bz-verde-musgo)", borderRadius: "var(--bz-radius-pill)", fontSize: 13, color: "var(--bz-verde-bosque)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--bz-verde-musgo)", animation: "bz-pulse 2s infinite" }} />
                Reporte de impacto 2025 publicado
              </div>
            </div>

            <div>
              {COMPROMISOS.map((c, i) => (
                <div key={i} className="reveal" style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 24,
                  padding: "24px 0",
                  borderBottom: i < COMPROMISOS.length - 1 ? "0.5px solid var(--bz-borde-suave)" : "none",
                  transitionDelay: `${i * 80}ms`,
                  alignItems: "start",
                }}>
                  <div className="display" style={{ fontSize: 32, color: "var(--bz-tierra-rojo)", lineHeight: 1, fontFeatureSettings: '"tnum"' }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 22, color: "var(--bz-texto-primario)", marginBottom: 6 }}>{c.title}</h4>
                    <p style={{ fontSize: 14, color: "var(--bz-texto-secundario)", lineHeight: 1.65 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 880px) { .bz-feria-sust { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* EQUIPO */}
      <section style={{ padding: "120px 0", background: "var(--bz-fondo-alt)" }}>
        <div className="container">
          <SectionHead
            eyebrow="Quién hace BIORAIZ"
            title={<>Un equipo chico, <em>de carne y hueso.</em></>}
            sub="No tercerizamos lo importante. Estas seis personas, más una red rotativa de 30 voluntarios, son quienes arman BIORAIZ cada año."
          />

          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {EQUIPO.map((m, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <Placeholder label={`retrato · ${m.name.split(" ")[0]}`} ratio="1/1" style={{ marginBottom: 14, borderRadius: "var(--bz-radius-md)" }} />
                <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 19, color: "var(--bz-texto-primario)", marginBottom: 4 }}>{m.name}</h4>
                <p style={{ fontSize: 12, color: "var(--bz-texto-secundario)", letterSpacing: "0.04em" }}>{m.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner setPage={setPage} />
    </div>
  );
}

// ── Sub page header ──
function SubPageHeader({ eyebrow, title, sub }) {
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

// ── Valor block ──
function ValorBlock({ valor, index }) {
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

function ValorIcon({ kind }) {
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

// ── CTA Banner (reused on many pages) ──
function CTABanner({ setPage }) {
  return (
    <section style={{ padding: "100px 0", background: "var(--bz-fondo-base)" }}>
      <div className="container">
        <div className="reveal" style={{
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
        }} className="bz-cta-banner">
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

Object.assign(window, { PageFeria, SubPageHeader, CTABanner });
