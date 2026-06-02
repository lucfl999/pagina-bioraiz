import { useReveal, SectionHead, Placeholder, LeafShape, ValorBlock, CTABanner } from '../components/shared.jsx';
import { VALORES, COMPROMISOS, EQUIPO } from '../data.js';

export default function FeriaPage({ setPage }) {
  useReveal();
  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Sobre BIORAIZ"
        title={<>La Feria.</>}
        sub="Una historia que empezó con cuatro productores en una plaza y hoy convoca a 24.000 personas. Esto es lo que somos y por qué seguimos."
      />

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
                <p>Cuatro años después, BIORAIZ junta a más de 80 expositores curados, una agenda de charlas y talleres, y miles de personas que vienen de toda la Patagonia.</p>
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
                  <div className="display" style={{ fontSize: 32, color: "var(--bz-tierra-rojo)", lineHeight: 1 }}>
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

      <CTABanner setPage={setPage} />
    </div>
  );
}

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
