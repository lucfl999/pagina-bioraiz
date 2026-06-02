// ─── BIORAIZ — Prensa ──────────────────────────────────────────

function PagePrensa({ setPage }) {
  useReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText("prensa@bioraiz.ar");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Prensa & medios"
        title={<>Prensa.</>}
        sub="Recursos, datos y contacto directo para periodistas, podcasters y creadores que quieran contar BIORAIZ."
      />

      {/* PRESS KIT downloads */}
      <section style={{ padding: "60px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "start" }} className="bz-prensa-top">
            <div className="reveal">
              <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 14 }}>Kit de prensa 2026</div>
              <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "var(--bz-texto-primario)", marginBottom: 24, lineHeight: 1.1 }}>
                Descargá lo que necesites para tu nota.
              </h2>
              <p style={{ fontSize: 16, color: "var(--bz-texto-secundario)", lineHeight: 1.7, marginBottom: 36 }}>
                Logos, fotografías en alta, gacetillas listas para publicar y datos comprobables. Si necesitás algo que no está acá, escribinos.
              </p>

              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { name: "Kit completo (PDF + fotos + logos)",     size: "48 MB", ext: "ZIP" },
                  { name: "Logos (RGB, CMYK, monocromo, SVG)",        size: "3.2 MB", ext: "ZIP" },
                  { name: "Fotografías ediciones anteriores",         size: "32 MB", ext: "ZIP" },
                  { name: "Gacetilla — Anuncio fecha",                size: "180 KB", ext: "PDF" },
                  { name: "Reporte de impacto 2025",                 size: "4.1 MB", ext: "PDF" },
                ].map((f, i) => (
                  <a key={i} href="#" className="reveal" style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "18px 22px",
                    background: "var(--bz-beige-hueso)",
                    border: "0.5px solid var(--bz-borde-ligero)",
                    borderRadius: "var(--bz-radius-md)",
                    transition: "all 250ms var(--bz-ease)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--bz-verde-musgo)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bz-borde-ligero)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, color: "var(--bz-verde-bosque)", background: "var(--bz-verde-pasto)", padding: "4px 10px", borderRadius: "var(--bz-radius-sm)", flexShrink: 0, letterSpacing: "0.06em" }}>{f.ext}</span>
                    <span style={{ flex: 1, fontSize: 14, color: "var(--bz-texto-primario)" }}>{f.name}</span>
                    <span style={{ fontSize: 11, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)" }}>{f.size}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--bz-verde-bosque)" }}>
                      <path d="M12 4v12M5 12l7 7 7-7"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Sidebar — contact */}
            <div className="reveal" style={{ position: "sticky", top: 120 }}>
              <div style={{
                background: "var(--bz-verde-profundo)",
                color: "var(--bz-beige-hueso)",
                borderRadius: "var(--bz-radius-xl)",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -30, right: -30, opacity: 0.2 }}>
                  <LeafShape size={140} color="var(--bz-ocre-calido)" rotate={45} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 18 }}>Contacto prensa</div>
                  <h3 className="display" style={{ fontSize: 28, marginBottom: 24, lineHeight: 1.1, color: "var(--bz-beige-hueso)" }}>
                    Joaquín Páez
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--bz-verde-claro)", marginBottom: 24, lineHeight: 1.5 }}>
                    Comunicación y prensa<br />Equipo BIORAIZ
                  </p>

                  <button onClick={copyEmail} style={{
                    width: "100%",
                    padding: "14px 18px",
                    background: "rgba(250, 246, 237, 0.08)",
                    border: "0.5px solid rgba(230, 203, 122, 0.4)",
                    borderRadius: "var(--bz-radius-md)",
                    fontSize: 13,
                    color: "var(--bz-beige-hueso)",
                    textAlign: "left",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: "var(--bz-font-mono)",
                    marginBottom: 8,
                    transition: "all 200ms var(--bz-ease)",
                  }}>
                    prensa@bioraiz.ar
                    <span style={{ fontSize: 10, color: copied ? "var(--bz-ocre-calido)" : "var(--bz-verde-claro)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {copied ? "✓ copiado" : "copiar"}
                    </span>
                  </button>
                  <a href="https://wa.me/" style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "rgba(250, 246, 237, 0.08)",
                    border: "0.5px solid rgba(230, 203, 122, 0.4)",
                    borderRadius: "var(--bz-radius-md)",
                    fontSize: 13,
                    color: "var(--bz-beige-hueso)",
                    fontFamily: "var(--bz-font-mono)",
                  }}>
                    +54 9 299 412 8800
                    <span style={{ fontSize: 10, color: "var(--bz-verde-claro)", letterSpacing: "0.1em", textTransform: "uppercase" }}>WhatsApp</span>
                  </a>

                  <p style={{ fontSize: 12, color: "rgba(157, 201, 159, 0.7)", marginTop: 24, lineHeight: 1.6 }}>
                    Respondemos solicitudes de prensa en menos de 48 hs hábiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .bz-prensa-top { grid-template-columns: 1fr !important; gap: 32px !important; }
            .bz-prensa-top > div:last-child { position: relative !important; top: 0 !important; }
          }
        `}</style>
      </section>

      {/* MEDIOS — what's been said */}
      <section style={{ padding: "100px 0", background: "var(--bz-fondo-alt)" }}>
        <div className="container">
          <SectionHead
            eyebrow="En los medios"
            title={<>Algunas de las notas <em>publicadas</em>.</>}
            sub="Una muestra de cómo otros medios contaron BIORAIZ. Si querés sumar tu nota, mandanos el link."
          />

          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
            {PRENSA_NOTAS.map((nota, i) => (
              <a key={i} href={nota.url} className="reveal" style={{
                background: "var(--bz-beige-hueso)",
                padding: "28px 28px",
                borderRadius: "var(--bz-radius-lg)",
                border: "0.5px solid var(--bz-borde-ligero)",
                display: "flex", flexDirection: "column", gap: 14,
                transition: "all 250ms var(--bz-ease)",
                transitionDelay: `${(i % 3) * 60}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--bz-shadow-md)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div className="eyebrow" style={{ color: "var(--bz-tierra-rojo)", margin: 0 }}>{nota.medio}</div>
                  <div style={{ fontSize: 11, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)" }}>{nota.fecha}</div>
                </div>
                <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 22, color: "var(--bz-texto-primario)", lineHeight: 1.25, marginTop: 4 }}>
                  "{nota.title}"
                </h4>
                <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--bz-verde-bosque)", fontFamily: "var(--bz-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Leer nota
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section style={{ padding: "100px 0", background: "var(--bz-fondo-base)" }} className="trama">
        <div className="container">
          <SectionHead
            eyebrow="Datos rápidos"
            title={<>Para citar <em>en tu nota.</em></>}
          />
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1, background: "var(--bz-borde-suave)", border: "0.5px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-lg)", overflow: "hidden" }}>
            {[
              { label: "Edición",          value: "4ª" },
              { label: "Fecha 2026",        value: "13–15 nov" },
              { label: "Lugar",             value: "Parque Centenario" },
              { label: "Expositores",       value: "80+" },
              { label: "Asistencia 2025",   value: "24.000" },
              { label: "Provincias",        value: "5" },
              { label: "Equipo permanente", value: "6 personas" },
              { label: "Reciclaje 2025",    value: "92%" },
            ].map((d, i) => (
              <div key={i} className="reveal" style={{ background: "var(--bz-beige-hueso)", padding: "28px 24px", transitionDelay: `${i * 40}ms` }}>
                <div className="display" style={{ fontSize: 36, color: "var(--bz-verde-profundo)", lineHeight: 1, marginBottom: 8, letterSpacing: "-0.02em" }}>{d.value}</div>
                <div style={{ fontSize: 11, color: "var(--bz-texto-terciario)", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

window.PagePrensa = PagePrensa;
