import { useReveal, SectionHead, LeafShape, CategoriaCard, SubPageHeader, CTABanner } from '../components/shared.jsx';
import { CATEGORIAS_STANDS } from '../data.js';

export default function ExpositorPage({ setPage }) {
  useReveal();

  const criterios = [
    { title: "Origen claro", desc: "Sabés de dónde viene tu materia prima y podés contarlo." },
    { title: "Compromiso sustentable", desc: "Cuidás el impacto de lo que hacés: materiales, procesos o energía." },
    { title: "Coherencia", desc: "Lo que ofrecés y cómo lo ofrecés van en la misma dirección." },
  ];

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Convocatoria 2026"
        title={<>Sumá tu proyecto a <em>la feria.</em></>}
        sub="BIORAIZ reúne a productores, emprendimientos y marcas de la Patagonia que trabajan con compromiso por lo sustentable, sin importar su escala. Si esa es tu búsqueda, postulate."
      />

      <section style={{ padding: "90px 0", background: "var(--bz-fondo-base)" }} className="trama">
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <SectionHead
              eyebrow="Lo que buscamos"
              title={<>Tres señales de que <em>encajás</em>.</>}
              sub="No es una lista de requisitos: es una forma de mirar. Si te reconocés en estas tres, queremos conocerte."
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: "var(--bz-borde-suave)", border: "0.5px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-lg)", overflow: "hidden" }}>
            {criterios.map((c, i) => (
              <div key={i} className="reveal" style={{ background: "var(--bz-beige-hueso)", padding: "40px 34px", transitionDelay: `${i * 80}ms` }}>
                <div className="display" style={{ fontSize: 30, color: "var(--bz-tierra-rojo)", lineHeight: 1, marginBottom: 18 }}>{String(i + 1).padStart(2, "0")}</div>
                <h4 style={{ fontFamily: "var(--bz-font-display)", fontSize: 24, color: "var(--bz-texto-primario)", marginBottom: 10 }}>{c.title}</h4>
                <p style={{ fontSize: 15, color: "var(--bz-texto-secundario)", lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 0", background: "var(--bz-fondo-alt)" }}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <SectionHead
              eyebrow="200+ stands disponibles"
              title={<>Seis categorías, <em>convocatoria abierta.</em></>}
              sub="Seis categorías, un mismo criterio: origen verificable, proceso consciente, producto con historia."
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {CATEGORIAS_STANDS.map((cat, i) => (
              <div key={cat.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <CategoriaCard cat={cat} large />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0 120px", background: "var(--bz-fondo-base)" }}>
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
              <div className="eyebrow" style={{ color: "var(--bz-verde-profundo)", marginBottom: 16 }}>Convocatoria abierta</div>
              <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "var(--bz-verde-profundo)", marginBottom: 16, lineHeight: 1.15 }}>
                ¿Querés exponer en BIORAIZ?
              </h3>
              <p style={{ color: "var(--bz-verde-profundo)", lineHeight: 1.65, opacity: 0.85 }}>
                Contanos qué hacés y de dónde viene. Buscamos productores que pueden contar su proceso, con coherencia entre lo que ofrecen y cómo lo ofrecen.
              </p>
            </div>
            <button onClick={() => setPage("participa")} className="btn btn-primary" style={{ position: "relative", zIndex: 1 }}>Quiero postularme</button>
          </div>
        </div>
        <style>{`@media (max-width: 720px) { .bz-postular { grid-template-columns: 1fr !important; padding: 40px 28px !important; } }`}</style>
      </section>
    </div>
  );
}
