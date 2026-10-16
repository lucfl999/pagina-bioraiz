import { useState } from 'react';
import { useReveal, LeafShape, SubPageHeader, ExpositorCard } from '../components/shared.jsx';
import { CATEGORIES, EXPOSITORES } from '../data.js';

const normalizeSearchText = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");

export default function ExpositorPage({ setPage }) {
  useReveal();

  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query.trim());
  const filteredExpositores = EXPOSITORES.filter(expositor => {
    const matchesCategory = activeCategory === "all" || expositor.cat === activeCategory;
    const matchesQuery = !normalizedQuery
      || normalizeSearchText(expositor.name).includes(normalizedQuery)
      || normalizeSearchText(expositor.origen).includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow={`${EXPOSITORES.length} expositores · curaduría 2026`}
        title={<>Expositores.</>}
        sub="Cada uno pasa por una curaduría que pregunta por el origen, el proceso y la coherencia. Estos son los confirmados para esta edición."
      />

      <section style={{ position: "sticky", top: 72, zIndex: 30, background: "var(--bz-fondo-base)", borderBottom: "0.5px solid var(--bz-borde-suave)", padding: "20px 0" }}>
        <div className="container" style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(category => {
              const count = category.id === "all"
                ? EXPOSITORES.length
                : EXPOSITORES.filter(expositor => expositor.cat === category.id).length;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: "var(--bz-radius-pill)",
                    fontSize: 13,
                    fontWeight: 500,
                    background: isActive ? "var(--bz-verde-profundo)" : "transparent",
                    color: isActive ? "var(--bz-beige-hueso)" : "var(--bz-texto-secundario)",
                    border: isActive ? "1.5px solid var(--bz-verde-profundo)" : "1.5px solid var(--bz-borde-suave)",
                    transition: "all 200ms var(--bz-ease)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {category.label}
                  <span style={{ fontSize: 10, opacity: 0.6, fontFamily: "var(--bz-font-mono)" }}>{count}</span>
                </button>
              );
            })}
          </div>

          <label style={{ position: "relative", width: "min(280px, 100%)" }}>
            <span style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}>Buscar expositores por nombre o localidad</span>
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Buscar por nombre o localidad…"
              style={{
                width: "100%",
                padding: "10px 16px 10px 38px",
                fontSize: 13,
                fontFamily: "var(--bz-font-body)",
                border: "1px solid var(--bz-borde-suave)",
                borderRadius: "var(--bz-radius-pill)",
                background: "var(--bz-beige-hueso)",
                color: "var(--bz-texto-primario)",
                outline: "none",
              }}
              onFocus={event => { event.currentTarget.style.borderColor = "var(--bz-verde-profundo)"; }}
              onBlur={event => { event.currentTarget.style.borderColor = "var(--bz-borde-suave)"; }}
            />
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--bz-texto-terciario)", pointerEvents: "none" }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </label>
        </div>
      </section>

      <section style={{ padding: "56px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
            <div className="display" aria-live="polite" style={{ fontSize: 22, color: "var(--bz-texto-secundario)", fontStyle: "italic" }}>
              {filteredExpositores.length === 0
                ? "Ninguno coincide aún"
                : filteredExpositores.length === EXPOSITORES.length
                  ? "Todos los expositores"
                  : `${filteredExpositores.length} resultado${filteredExpositores.length === 1 ? "" : "s"}`}
            </div>
            {(activeCategory !== "all" || query) && (
              <button
                type="button"
                onClick={() => { setActiveCategory("all"); setQuery(""); }}
                style={{ fontSize: 12, color: "var(--bz-tierra-rojo)", textDecoration: "underline", fontFamily: "var(--bz-font-mono)" }}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {filteredExpositores.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 32px", background: "var(--bz-beige-hueso)", borderRadius: "var(--bz-radius-lg)" }}>
              <div aria-hidden="true" style={{ fontSize: 48, marginBottom: 16 }}>🌾</div>
              <h2 className="display" style={{ fontSize: 26, marginBottom: 10 }}>Todavía no hay nada acá.</h2>
              <p style={{ color: "var(--bz-texto-secundario)" }}>Probá con otra búsqueda o explorá por categoría.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
              gap: 24,
            }}>
              {filteredExpositores.map((expositor, index) => (
                <div key={expositor.id} className="reveal" style={{ transitionDelay: `${(index % 6) * 60}ms` }}>
                  <ExpositorCard exp={expositor} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: "80px 0 120px", background: "var(--bz-fondo-alt)" }}>
        <div className="container-narrow">
          <div className="reveal bz-postular" style={{
            background: "var(--bz-ocre-calido)",
            borderRadius: "var(--bz-radius-xl)",
            padding: "60px 56px",
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 32,
            alignItems: "center",
          }}>
            <div style={{ position: "absolute", bottom: -40, right: -40, opacity: 0.3 }}>
              <LeafShape size={200} color="var(--bz-verde-profundo)" rotate={120} />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="eyebrow" style={{ color: "var(--bz-verde-profundo)", marginBottom: 16 }}>Postulaciones abiertas</div>
              <h2 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "var(--bz-verde-profundo)", marginBottom: 16, lineHeight: 1.15 }}>
                ¿Querés exponer en BIORAIZ?
              </h2>
              <p style={{ color: "var(--bz-verde-profundo)", lineHeight: 1.65, opacity: 0.85 }}>
                Cerramos postulaciones 60 días antes del evento. Buscamos productos con origen, proceso transparente y coherencia con los valores de la feria.
              </p>
            </div>
            <button onClick={() => setPage("participa")} className="btn btn-primary" style={{ position: "relative", zIndex: 1 }}>Quiero postularme</button>
          </div>
        </div>
        <style>{`
          @media (max-width: 720px) {
            .bz-postular { grid-template-columns: 1fr !important; padding: 40px 28px !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
