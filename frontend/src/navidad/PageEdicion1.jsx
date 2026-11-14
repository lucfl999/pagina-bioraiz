// BIORAIZ — Edición 1 (recap): números, galería, música, expositores, sponsors
import { Counter, Countdown, ExpositorCard, Garland, SectionHead, StarShape, useReveal } from './components.jsx';
import {
  ACTIVIDADES,
  ARTISTAS,
  BZ_DATE,
  BZ_ED1_ASISTENTES,
  BZ_ED1_EXPOSITORES,
  BZ_ED1_FECHA,
  BZ_ED1_GASTRO,
  BZ_HORARIO,
  BZ_LOCATION,
  ED1_FOTOS,
  EXPOSITORES,
  SPONSOR_TIERS,
} from './data.js';
import { SubPageHeader } from './PageExpositores.jsx';

const ED1_NUMEROS = [
  { value: BZ_ED1_ASISTENTES, suffix: "", label: "asistencias" },
  { value: BZ_ED1_EXPOSITORES, suffix: "", label: "expositores" },
  { value: BZ_ED1_GASTRO, suffix: "", label: "gastronómicos" },
  { value: Object.values(ACTIVIDADES).flat().length, suffix: "", label: "actividades" },
];

// Mosaico de la galería: [columnas, filas] en grilla de 4 columnas
const ED1_GALERIA = [[2, 2], [1, 1], [1, 2], [1, 1], [1, 1], [2, 1], [1, 2], [1, 1], [2, 2], [1, 1], [1, 1], [2, 1], [1, 2], [1, 1], [1, 1], [2, 1]];

function Ed1Foto({ file, alt, pos }) {
  return <img src={"assets/ed1/" + file + ".jpg"} alt={alt} loading="lazy" className="bz-ed1-foto" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: 14, background: "var(--bz-fondo-dark)", objectPosition: pos || "center" }} />;
}

function Ed1Slot({ id, label, style }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }}>
      <image-slot id={id} shape="rounded" radius="14" placeholder={label}></image-slot>
    </div>
  );
}

function Ed1Numeros({ compact }) {
  return (
    <div className="bz-ed1-num" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 1, background: "var(--bz-borde-suave)", border: "0.5px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-lg)", overflow: "hidden" }}>
      {ED1_NUMEROS.map((n, i) => (
        <div key={i} className="reveal" style={{ background: "var(--bz-beige-hueso)", padding: compact ? "32px 20px" : "44px 24px", textAlign: "center", transitionDelay: `${i * 80}ms` }}>
          <div className="display" style={{ fontSize: i === 0 ? "clamp(44px, 6.4vw, 84px)" : "clamp(40px, 5.6vw, 72px)", color: i === 0 ? "var(--bz-navidad-rojo)" : "var(--bz-verde-profundo)", lineHeight: 1, marginBottom: 12 }}>
            <Counter to={n.value} suffix={n.suffix} />
          </div>
          <div style={{ fontSize: 13, color: "var(--bz-texto-secundario)" }}>{n.label}</div>
        </div>
      ))}
      <style>{`@media (max-width: 880px){.bz-ed1-num{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}

function Ed1Galeria() {
  return (
    <section style={{ padding: "100px 0", background: "var(--bz-fondo-alt)" }}>
      <div className="container">
        <div style={{ marginBottom: 44 }}>
          <SectionHead eyebrow="Galería" title={<>Lo que <em>vivimos.</em></>} />
        </div>
        <div className="bz-ed1-gal">
          {ED1_GALERIA.map(([c, r], i) => (
            <div key={i} style={{ gridColumn: `span ${c}`, gridRow: `span ${r}` }}>
              <Ed1Foto file={ED1_FOTOS[i][0]} alt={ED1_FOTOS[i][1]} />
            </div>
          ))}
        </div>
      </div>
      <style>{`.bz-ed1-foto{display:block;width:100%;height:100%;object-fit:cover;border-radius:14px;background:var(--bz-fondo-dark)}.bz-ed1-gal{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:200px;gap:14px;grid-auto-flow:dense}@media(max-width:720px){.bz-ed1-gal{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:150px}.bz-ed1-gal>div{grid-column:span 1!important}}`}</style>
    </section>
  );
}

function Ed1Musica() {
  if (!ARTISTAS.length) return null;
  return (
    <section style={{ padding: "110px 0", background: "var(--bz-fondo-dark)", color: "var(--bz-beige-hueso)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="eyebrow reveal" style={{ color: "var(--bz-ocre-calido)", marginBottom: 16 }}>Música en vivo</div>
          <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "var(--bz-beige-hueso)", lineHeight: 1.05 }}>
            Así <em style={{ color: "var(--bz-ocre-calido)" }}>cerramos.</em>
          </h2>
        </div>
        <div className="bz-artistas-grid">
          {ARTISTAS.map((a, i) => (
            <article key={a.nombre} className={"reveal" + (i ? " reveal-delay-1" : "") + (a.ratio ? "" : " bz-art-tall")} style={{ position: "relative", borderRadius: "var(--bz-radius-lg)", overflow: "hidden", aspectRatio: a.ratio || "auto", background: "#111" }}>
              <img src={a.foto} alt={a.nombre} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: a.pos || "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,24,16,0.92) 0%, rgba(20,24,16,0.35) 38%, transparent 60%)" }}></div>
              <div style={{ position: "absolute", left: 28, right: 28, bottom: 26, display: "flex", flexDirection: "column", gap: 8 }}>
                <h3 className="display" style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1, color: "var(--bz-beige-hueso)", margin: 0 }}>{a.nombre}</h3>
                <div style={{ fontFamily: "var(--bz-font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bz-ocre-calido)" }}>{a.dia} nov · {a.hora}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`.bz-artistas-grid{display:grid;grid-template-columns:minmax(0,1.775fr) minmax(0,1fr);gap:20px;max-width:1200px;margin:0 auto}@media(max-width:720px){.bz-artistas-grid{grid-template-columns:minmax(0,1fr)}.bz-art-tall{aspect-ratio:4/5!important}}`}</style>
    </section>
  );
}

function Ed1Expositores({ setPage }) {
  return (
    <section style={{ padding: "110px 0", background: "var(--bz-fondo-base)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap", marginBottom: 44 }}>
          <SectionHead eyebrow={`${BZ_ED1_EXPOSITORES} expositores · ${BZ_ED1_GASTRO} gastronómicos`} title={<>Las marcas que <em>estuvieron.</em></>} />
          <button className="btn btn-secondary reveal" onClick={() => setPage("expositores")}>Ver todos</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: 20 }}>
          {EXPOSITORES.slice(0, 4).map((exp, i) => (
            <div key={exp.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}><ExpositorCard exp={exp} compact /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorCard({ sp, height, pad }) {
  return (
    <div title={sp.nombre} style={{ height, background: sp.bg || "#fff", borderRadius: "var(--bz-radius-md)", display: "flex", alignItems: "center", justifyContent: "center", padding: sp.full ? 0 : pad, overflow: "hidden" }}>
      {sp.logo ? <img src={sp.logo} alt={sp.nombre} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", filter: sp.filter || "none", display: "block" }} />
        : <span style={{ fontFamily: "var(--bz-font-display)", fontSize: height > 120 ? 34 : 18, color: "var(--bz-fondo-dark)", letterSpacing: "0.04em" }}>{sp.nombre}</span>}
    </div>
  );
}

function SponsorStrip({ eyebrow = "Sponsors Edición 1", title }) {
  const main = SPONSOR_TIERS.filter(t => t.id === "raiz-eterna").flatMap(t => t.sponsors);
  const rest = SPONSOR_TIERS.filter(t => t.id !== "raiz-eterna").flatMap(t => t.sponsors);
  return (
    <section style={{ padding: "100px 0", background: "var(--bz-fondo-dark)", color: "var(--bz-beige-hueso)", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 16 }}>{eyebrow}</div>
          <h2 className="display" style={{ fontSize: "clamp(30px, 4.5vw, 52px)", color: "var(--bz-beige-hueso)", lineHeight: 1.05 }}>
            {title || <>Gracias por hacerlo <em style={{ color: "var(--bz-ocre-calido)" }}>posible.</em></>}
          </h2>
        </div>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {main.map((sp, i) => <SponsorCard key={i} sp={sp} height={180} pad="32px 44px" />)}
        </div>
        <div style={{ height: "0.5px", background: "rgba(250,246,237,0.1)", margin: "48px auto", maxWidth: 960 }} />
        <div className="reveal bz-sponsor-grid">
          {rest.map((sp, i) => <SponsorCard key={i} sp={sp} height={100} pad="16px 20px" />)}
        </div>
      </div>
      <style>{`.bz-sponsor-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;max-width:960px;margin:0 auto}@media(min-width:560px){.bz-sponsor-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(min-width:900px){.bz-sponsor-grid{grid-template-columns:repeat(6,minmax(0,1fr))}}`}</style>
    </section>
  );
}

function NavidadCTA({ setPage }) {
  return (
    <section style={{ padding: "100px 0 40px", background: "var(--bz-fondo-base)" }}>
      <div className="container-narrow">
        <div className="reveal bz-nav-cta" style={{ position: "relative", overflow: "hidden", background: "var(--bz-navidad-rojo-hondo)", color: "var(--bz-beige-hueso)", borderRadius: "var(--bz-radius-xl)", padding: "84px 52px 52px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center" }}>
          <Garland top={0} segments={5} />
          <div>
            <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 14 }}>Se viene</div>
            <h3 className="display" style={{ fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.1, marginBottom: 14 }}>Edición <em style={{ color: "var(--bz-ocre-calido)" }}>Navideña.</em></h3>
            <p style={{ color: "rgba(250,246,237,0.85)", marginBottom: 26 }}>{BZ_DATE} · {BZ_HORARIO} · {BZ_LOCATION}</p>
            <button className="btn btn-on-dark" onClick={() => setPage("participa")}>Quiero participar</button>
          </div>
          <Countdown size="sm" />
        </div>
      </div>
      <style>{`@media(max-width:720px){.bz-nav-cta{grid-template-columns:1fr!important;padding:72px 26px 32px!important}}`}</style>
    </section>
  );
}

function PageEdicion1({ setPage }) {
  useReveal();
  return (
    <div className="page-enter">
      <SubPageHeader eyebrow={`Edición 1 · ${BZ_ED1_FECHA}`} title={<>Así fue la <em style={{ color: "var(--bz-ocre-calido)" }}>primera.</em></>} sub="Tres días de productores, charlas, bienestar y música en vivo en Isla 132. Gracias a todos los que vinieron." />
      <section style={{ padding: "72px 0 40px", background: "var(--bz-fondo-base)" }}>
        <div className="container"><Ed1Numeros /></div>
      </section>
      <Ed1Galeria />
      <Ed1Musica />
      <Ed1Expositores setPage={setPage} />
      <SponsorStrip />
      <NavidadCTA setPage={setPage} />
    </div>
  );
}

export { Ed1Foto, Ed1Numeros, Ed1Slot, NavidadCTA, SponsorStrip };
export default PageEdicion1;
