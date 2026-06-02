// ─── BIORAIZ — Programa ────────────────────────────────────────

function PagePrograma({ setPage }) {
  useReveal();
  const [activeDia, setActiveDia] = useState("sabado");
  const [favorites, setFavorites] = useState(() => new Set());
  const [typeFilter, setTypeFilter] = useState("Todos");

  const acts = ACTIVIDADES[activeDia];

  // Get unique types for current day
  const types = ["Todos", ...new Set(acts.map(a => a.tipo))];

  const filteredActs = typeFilter === "Todos" ? acts : acts.filter(a => a.tipo === typeFilter);

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Programa · 3 días"
        title={<>Programa.</>}
        sub="Charlas, talleres, música, espacios para chicos y una cocina abierta. Marcá tus favoritos con la estrellita — los guardamos en tu navegador."
      />

      {/* Day tabs */}
      <section style={{ padding: "48px 0 0", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, background: "var(--bz-beige-base)", padding: 6, borderRadius: "var(--bz-radius-lg)", maxWidth: 720, margin: "0 auto 56px" }}>
            {DIAS.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveDia(d.id)}
                style={{
                  padding: "16px 20px",
                  borderRadius: "var(--bz-radius-md)",
                  background: activeDia === d.id ? "var(--bz-verde-profundo)" : "transparent",
                  color: activeDia === d.id ? "var(--bz-beige-hueso)" : "var(--bz-texto-secundario)",
                  transition: "all 300ms var(--bz-ease)",
                  textAlign: "center",
                }}
              >
                <div className="display" style={{ fontSize: 32, lineHeight: 1, marginBottom: 4 }}>{d.num}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)", opacity: activeDia === d.id ? 0.8 : 1 }}>{d.label}</div>
                <div style={{ fontSize: 11, opacity: activeDia === d.id ? 0.6 : 0.5, marginTop: 4, fontStyle: "italic", fontFamily: "var(--bz-font-display)" }}>{d.subtitulo}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Type filter pills */}
      <section style={{ padding: "0 0 24px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                style={{
                  padding: "7px 14px",
                  borderRadius: "var(--bz-radius-pill)",
                  fontSize: 12,
                  fontWeight: 500,
                  background: typeFilter === t ? "var(--bz-tierra-rojo)" : "var(--bz-beige-base)",
                  color: typeFilter === t ? "var(--bz-beige-hueso)" : "var(--bz-texto-secundario)",
                  transition: "all 200ms var(--bz-ease)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section key={activeDia + typeFilter} style={{ padding: "32px 0 80px", background: "var(--bz-fondo-base)", animation: "bz-fade-in 400ms var(--bz-ease) both" }}>
        <div className="container" style={{ maxWidth: 920 }}>
          {filteredActs.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80, color: "var(--bz-texto-secundario)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🍃</div>
              <p>Nada de este tipo en este día. Probá otro.</p>
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              {/* Vertical timeline line */}
              <div style={{ position: "absolute", left: 80, top: 12, bottom: 12, width: 1, background: "var(--bz-borde-suave)" }} className="bz-timeline-line" />

              {filteredActs.map((act, i) => {
                const id = `${activeDia}-${act.hora}-${act.title}`;
                const isFav = favorites.has(id);
                return (
                  <article key={id} className="reveal" style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto",
                    gap: 32,
                    padding: "20px 0",
                    alignItems: "start",
                    position: "relative",
                    transitionDelay: `${i * 50}ms`,
                  }} className="bz-act-row">
                    {/* Hora */}
                    <div style={{ paddingTop: 4 }}>
                      <div className="display" style={{ fontSize: 24, color: "var(--bz-tierra-rojo)", lineHeight: 1, letterSpacing: "-0.02em" }}>{act.hora}</div>
                    </div>

                    {/* Dot on timeline */}
                    <div style={{ position: "absolute", left: 76, top: 24, width: 9, height: 9, borderRadius: "50%", background: act.destacado ? "var(--bz-ocre-calido)" : "var(--bz-verde-musgo)", border: "2px solid var(--bz-fondo-base)" }} className="bz-timeline-dot" />

                    {/* Content card */}
                    <div style={{
                      background: act.destacado ? "var(--bz-beige-hueso)" : "transparent",
                      border: act.destacado ? "0.5px solid var(--bz-ocre-calido)" : "0.5px solid var(--bz-borde-ligero)",
                      borderRadius: "var(--bz-radius-md)",
                      padding: "18px 22px",
                      transition: "transform 250ms var(--bz-ease)",
                      cursor: "default",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <span className={`tag ${act.tipo === "Charla" ? "" : act.tipo === "Música" ? "tag-tierra" : "tag-ocre"}`}>{act.tipo}</span>
                        {act.destacado && <span style={{ fontSize: 10, color: "var(--bz-ocre-tostado)", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>★ Destacada</span>}
                      </div>
                      <h3 style={{ fontFamily: "var(--bz-font-display)", fontSize: 22, color: "var(--bz-texto-primario)", marginBottom: 8, lineHeight: 1.25 }}>{act.title}</h3>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "var(--bz-texto-secundario)" }}>
                        <span>📍 {act.lugar}</span>
                        <span>· {act.speaker}</span>
                      </div>
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={() => toggleFav(id)}
                      aria-label="Marcar como favorito"
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        border: "1px solid var(--bz-borde-suave)",
                        background: isFav ? "var(--bz-ocre-calido)" : "var(--bz-beige-hueso)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isFav ? "var(--bz-verde-profundo)" : "var(--bz-texto-terciario)",
                        transition: "all 200ms var(--bz-spring)",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
                        <path d="M12 2l3 6.3 7 1-5 4.9 1.2 7-6.2-3.4-6.2 3.4 1.2-7-5-4.9 7-1z"/>
                      </svg>
                    </button>
                  </article>
                );
              })}
            </div>
          )}

          {favorites.size > 0 && (
            <div style={{ marginTop: 48, padding: "20px 24px", background: "var(--bz-verde-pasto)", borderRadius: "var(--bz-radius-md)", textAlign: "center", fontSize: 14, color: "var(--bz-verde-bosque)" }}>
              ⭐ Tenés <strong>{favorites.size}</strong> actividad{favorites.size === 1 ? "" : "es"} en favoritos. Se guardan en tu navegador.
            </div>
          )}
        </div>
      </section>

      {/* SPEAKERS */}
      <section style={{ padding: "100px 0", background: "var(--bz-fondo-alt)" }}>
        <div className="container">
          <SectionHead
            eyebrow="Speakers"
            title={<>Quienes vienen <em>a contar.</em></>}
            sub="Productores, cocineros, antropólogos y periodistas que llevan años pensando lo que la feria hace en la práctica."
          />
          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {SPEAKERS.map((s, i) => (
              <article key={s.id} className="reveal" style={{
                background: "var(--bz-beige-hueso)",
                borderRadius: "var(--bz-radius-lg)",
                padding: "24px",
                border: "0.5px solid var(--bz-borde-ligero)",
                transitionDelay: `${(i % 3) * 80}ms`,
                display: "flex",
                gap: 16,
              }}>
                <Placeholder label={s.name.split(" ")[0]} ratio="1/1" style={{ width: 80, height: 80, borderRadius: "50%", flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 20, color: "var(--bz-texto-primario)", marginBottom: 4, lineHeight: 1.15 }}>{s.name}</h4>
                  <p style={{ fontSize: 11, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)", letterSpacing: "0.04em", marginBottom: 10 }}>{s.rol}</p>
                  <p style={{ fontSize: 13, color: "var(--bz-texto-secundario)", lineHeight: 1.5, fontStyle: "italic" }}>"{s.topic}"</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner setPage={setPage} />

      <style>{`
        @media (max-width: 720px) {
          .bz-act-row { grid-template-columns: 60px 1fr 40px !important; gap: 16px !important; }
          .bz-timeline-line { left: 60px !important; }
          .bz-timeline-dot { left: 56px !important; }
        }
      `}</style>
    </div>
  );
}

window.PagePrograma = PagePrograma;
