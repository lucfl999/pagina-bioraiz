const ARTISTAS = [
  {
    nombre: "Magma",
    dia: "Domingo 8",
    hora: "21:30 al cierre",
    lugar: "Escenario principal",
    foto: "/artistas/magma.jpg",
    ratio: "1400 / 985",
  },
  {
    nombre: "María Julia",
    dia: "Domingo 8",
    hora: "20:00",
    lugar: "Escenario principal",
    foto: "/artistas/julia.jpg",
    pos: "center 40%",
  },
];

export default function ArtistasSection({ setPage }) {
  return (
    <section style={{ padding: "120px 0", background: "var(--bz-fondo-dark)", color: "var(--bz-beige-hueso)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow reveal" style={{ color: "var(--bz-ocre-calido)", marginBottom: 16 }}>Música en vivo</div>
          <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "var(--bz-beige-hueso)", lineHeight: 1.05 }}>
            Cerramos <em style={{ color: "var(--bz-ocre-calido)" }}>con música.</em>
          </h2>
        </div>
        <div className="bz-artistas-grid">
          {ARTISTAS.map((artista, index) => (
            <article
              key={artista.nombre}
              className={`reveal${index ? " reveal-delay-1 bz-art-tall" : ""}`}
              style={{
                position: "relative",
                borderRadius: "var(--bz-radius-lg)",
                overflow: "hidden",
                aspectRatio: artista.ratio || undefined,
                background: "#111",
              }}
            >
              <img
                src={artista.foto}
                alt={artista.nombre}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: artista.pos || "center",
                }}
              />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,24,16,0.92) 0%, rgba(20,24,16,0.35) 38%, transparent 60%)" }} />
              <div style={{ position: "absolute", left: 28, right: 28, bottom: 26, display: "flex", flexDirection: "column", gap: 8 }}>
                <h3 className="display" style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1, color: "var(--bz-beige-hueso)", margin: 0 }}>{artista.nombre}</h3>
                <div style={{ fontFamily: "var(--bz-font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bz-ocre-calido)" }}>{artista.dia} · {artista.hora}</div>
                <div style={{ fontSize: 14, color: "rgba(245,240,232,0.8)" }}>{artista.lugar}</div>
              </div>
            </article>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={() => setPage("programa")} className="btn btn-ocre">Ver programa completo</button>
        </div>
      </div>
      <style>{`
        .bz-artistas-grid { display: grid; grid-template-columns: minmax(0, 1.775fr) minmax(0, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 720px) {
          .bz-artistas-grid { grid-template-columns: minmax(0, 1fr); }
          .bz-art-tall { aspect-ratio: 4 / 5; }
        }
      `}</style>
    </section>
  );
}
