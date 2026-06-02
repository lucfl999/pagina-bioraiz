import { useReveal, SectionHead, Placeholder, LeafShape, ValorBlock, CTABanner } from '../components/shared.jsx';
import { VALORES, COMPROMISOS } from '../data.js';

export default function FeriaPage({ setPage }) {
  useReveal();
  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Sobre BIORAIZ"
        title={<>La Feria.</>}
        sub="Un proyecto que nació de una pregunta simple: ¿qué pasaría si los mejores productores de la Patagonia se encontraran en un mismo lugar?"
      />

      <section style={{ padding: "60px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div className="bz-feria-history" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
            <div className="reveal" style={{ position: "sticky", top: 120 }}>
              <img src="/foto-bioraiz-verde.png" alt="BIORAIZ · productores patagónicos" style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", borderRadius: "var(--bz-radius-lg)", display: "block" }} />
            </div>
            <div>
              <div className="reveal eyebrow" style={{ marginBottom: 14 }}>Por qué nace</div>
              <h2 className="reveal display" style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 32, color: "var(--bz-texto-primario)" }}>
                Una feria con raíces en la Patagonia.
              </h2>
              <div className="reveal reveal-delay-1" style={{ fontSize: 17, color: "var(--bz-texto-secundario)", lineHeight: 1.85, marginBottom: 24 }}>
                <p style={{ marginBottom: 20 }}>La Patagonia produce cosas extraordinarias: alimentos, oficios, marcas y proyectos que crecen con un compromiso real por la tierra. BIORAIZ nace para reunirlos en un mismo lugar y darles el espacio que merecen.</p>
                <p style={{ marginBottom: 20 }}>Pensamos la feria como un <strong style={{ color: "var(--bz-texto-primario)" }}>punto de encuentro</strong>: entre quienes producen de forma sustentable y quienes quieren consumir distinto. Un lugar para mostrar, probar, conversar y construir comunidad.</p>
                <p>Creemos en una economía más cercana, más consciente y más justa. Esta es nuestra forma de empujarla: poniendo en valor a quienes la hacen posible.</p>
              </div>
              <div className="reveal reveal-delay-2" style={{ marginTop: 48, padding: "24px 28px", background: "var(--bz-verde-pasto)", borderLeft: "3px solid var(--bz-verde-musgo)", borderRadius: "0 var(--bz-radius-md) var(--bz-radius-md) 0" }}>
                <p style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: 19, color: "var(--bz-verde-profundo)", lineHeight: 1.5 }}>
                  "Cuando lo que comprás tiene origen, todo cambia."
                </p>
                <p style={{ fontSize: 12, color: "var(--bz-verde-bosque)", marginTop: 12, fontFamily: "var(--bz-font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Equipo BIORAIZ
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
            title={<>Cinco criterios<br /><em>que usamos para decidir.</em></>}
            sub="Cada decisión de la feria — desde qué expositor sumamos hasta qué tipo de vasos usamos — pasa por estos cinco criterios."
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
          <div className="bz-feria-sust" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div>
              <SectionHead
                eyebrow="Sustentabilidad"
                title={<>Cinco compromisos <em>honestos.</em></>}
                sub="Dos ya están en marcha; tres son promesas que estamos construyendo. Al cierre publicamos los resultados — los buenos y los que aún no funcionan."
              />
              <div className="reveal reveal-delay-3" style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px", border: "1px solid var(--bz-verde-musgo)", borderRadius: "var(--bz-radius-pill)", fontSize: 13, color: "var(--bz-verde-bosque)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--bz-verde-musgo)", animation: "bz-pulse 2s infinite" }} />
                Publicamos los resultados al cierre de la edición
              </div>
            </div>
            <div>
              {COMPROMISOS.map((c, i) => (
                <div key={i} className="reveal" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "24px 0", borderBottom: i < COMPROMISOS.length - 1 ? "0.5px solid var(--bz-borde-suave)" : "none", transitionDelay: `${i * 80}ms`, alignItems: "start" }}>
                  <div className="display" style={{ fontSize: 32, color: "var(--bz-tierra-rojo)", lineHeight: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 22, color: "var(--bz-texto-primario)", marginBottom: c.desc ? 6 : 0 }}>{c.title}</h4>
                    {c.desc && <p style={{ fontSize: 14, color: "var(--bz-texto-secundario)", lineHeight: 1.65 }}>{c.desc}</p>}
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
          <div className="reveal" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Quién hace BIORAIZ</div>
            <p className="display" style={{ fontSize: "clamp(26px, 3.6vw, 40px)", color: "var(--bz-texto-primario)", lineHeight: 1.25 }}>
              Producido por <em>Zenzzo Productora de Experiencias</em>
            </p>
            <p style={{ marginTop: 14, fontSize: 14, color: "var(--bz-texto-terciario)", fontFamily: "var(--bz-font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Neuquén, Patagonia
            </p>
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
        {sub && <p style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: "clamp(18px, 2.2vw, 24px)", color: "var(--bz-verde-claro)", maxWidth: 720, lineHeight: 1.45, animation: "bz-fade-up 800ms var(--bz-ease) 200ms both" }}>{sub}</p>}
      </div>
    </section>
  );
}
