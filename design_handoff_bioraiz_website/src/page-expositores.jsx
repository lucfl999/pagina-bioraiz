// ─── BIORAIZ — Expositores ─────────────────────────────────────

function PageExpositores({ setPage }) {
  useReveal();
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = EXPOSITORES.filter(e => {
    if (activeCat !== "all" && e.cat !== activeCat) return false;
    if (query && !e.name.toLowerCase().includes(query.toLowerCase()) && !e.origen.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  // Count by category
  const counts = CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c.id === "all" ? EXPOSITORES.length : EXPOSITORES.filter(e => e.cat === c.id).length;
    return acc;
  }, {});

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow={`${EXPOSITORES.length} expositores · curaduría 2026`}
        title={<>Expositores.</>}
        sub="Cada uno pasa por una curaduría que pregunta por el origen, el proceso y la coherencia. Estos son los confirmados para esta edición."
      />

      {/* FILTERS */}
      <section style={{ position: "sticky", top: 72, zIndex: 30, background: "var(--bz-fondo-base)", borderBottom: "0.5px solid var(--bz-borde-suave)", padding: "20px 0" }}>
        <div className="container" style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "var(--bz-radius-pill)",
                  fontSize: 13,
                  fontWeight: 500,
                  background: activeCat === cat.id ? "var(--bz-verde-profundo)" : "transparent",
                  color: activeCat === cat.id ? "var(--bz-beige-hueso)" : "var(--bz-texto-secundario)",
                  border: activeCat === cat.id ? "1.5px solid var(--bz-verde-profundo)" : "1.5px solid var(--bz-borde-suave)",
                  transition: "all 200ms var(--bz-ease)",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {cat.label}
                <span style={{ fontSize: 10, opacity: 0.6, fontFamily: "var(--bz-font-mono)" }}>{counts[cat.id]}</span>
              </button>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nombre o localidad…"
              style={{
                padding: "10px 16px 10px 38px",
                width: 280,
                fontSize: 13,
                fontFamily: "var(--bz-font-body)",
                border: "1px solid var(--bz-borde-suave)",
                borderRadius: "var(--bz-radius-pill)",
                background: "var(--bz-beige-hueso)",
                color: "var(--bz-texto-primario)",
                outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = "var(--bz-verde-profundo)"}
              onBlur={e => e.target.style.borderColor = "var(--bz-borde-suave)"}
            />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--bz-texto-terciario)" }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section style={{ padding: "56px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 32 }}>
            <div className="display" style={{ fontSize: 22, color: "var(--bz-texto-secundario)", fontStyle: "italic" }}>
              {filtered.length === 0 ? "Ninguno coincide aún" : filtered.length === EXPOSITORES.length ? "Todos los expositores" : `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`}
            </div>
            {(activeCat !== "all" || query) && (
              <button
                onClick={() => { setActiveCat("all"); setQuery(""); }}
                style={{ fontSize: 12, color: "var(--bz-tierra-rojo)", textDecoration: "underline", fontFamily: "var(--bz-font-mono)" }}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 32px", background: "var(--bz-beige-hueso)", borderRadius: "var(--bz-radius-lg)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌾</div>
              <h3 className="display" style={{ fontSize: 26, marginBottom: 10 }}>Todavía no hay nada acá.</h3>
              <p style={{ color: "var(--bz-texto-secundario)" }}>Probá con otra búsqueda o explorá por categoría.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}>
              {filtered.map((exp, i) => (
                <div key={exp.id} className="reveal" style={{ transitionDelay: `${(i % 6) * 60}ms` }}>
                  <ExpositorCard exp={exp} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA — postular */}
      <section style={{ padding: "80px 0 120px", background: "var(--bz-fondo-alt)" }}>
        <div className="container-narrow">
          <div className="reveal" style={{
            background: "var(--bz-ocre-calido)",
            borderRadius: "var(--bz-radius-xl)",
            padding: "60px 56px",
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 32,
            alignItems: "center",
          }} className="bz-postular">
            <div style={{ position: "absolute", bottom: -40, right: -40, opacity: 0.3 }}>
              <LeafShape size={200} color="var(--bz-verde-profundo)" rotate={120} />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="eyebrow" style={{ color: "var(--bz-verde-profundo)", marginBottom: 16 }}>Postulaciones abiertas</div>
              <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "var(--bz-verde-profundo)", marginBottom: 16, lineHeight: 1.15 }}>
                ¿Querés exponer en BIORAIZ?
              </h3>
              <p style={{ color: "var(--bz-verde-profundo)", lineHeight: 1.65, opacity: 0.85 }}>
                Cerramos postulaciones 60 días antes del evento. Buscamos productos con origen, proceso transparente y coherencia con los valores de la feria.
              </p>
            </div>
            <button className="btn btn-primary" style={{ position: "relative", zIndex: 1 }}>Quiero postularme</button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .bz-postular { grid-template-columns: 1fr !important; padding: 40px 28px !important; }
        }
      `}</style>
    </div>
  );
}

window.PageExpositores = PageExpositores;
