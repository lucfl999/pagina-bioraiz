// BIORAIZ — Home · Edición Navideña (convocatoria + cuenta regresiva + recap Edición 1)
import { Counter, Countdown, Garland, LeafShape, SectionHead, StarShape, useReveal } from './components.jsx';
import {
  BZ_DATE,
  BZ_ED1_ASISTENTES,
  BZ_ED1_FECHA,
  BZ_HERO_POSTER,
  BZ_HERO_VIDEO,
  BZ_HORARIO,
  BZ_LOCATION,
  BZ_NAV_CONFIRMADA,
} from './data.js';
import { Ed1Foto, SponsorStrip } from './PageEdicion1.jsx';
import { PART_ROLES } from './PageParticipa.jsx';

function PageHome({ setPage }) {
  useReveal();
  return (
    <div className="page-enter">
      <NavHero setPage={setPage} />
      <Convocatoria setPage={setPage} />
      <Ed1Teaser setPage={setPage} />
      <SponsorStrip />
    </div>
  );
}

function NavHero({ setPage }) {
  return (
    <section style={{ position: "relative", minHeight: "100vh", background: "var(--bz-fondo-dark)", color: "var(--bz-beige-hueso)", overflow: "hidden", paddingTop: 120 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(160deg, #1A2812 0%, #2A3D24 45%, #3D5A3F 100%)" }}>
        <div style={{ position: "absolute", top: "18%", right: "-8%", width: 520, height: 520, borderRadius: "50%", background: "var(--bz-navidad-rojo)", opacity: 0.28, filter: "blur(10px)" }} />
        <div style={{ position: "absolute", bottom: "-12%", left: "-6%", opacity: 0.35, transform: "rotate(-14deg)" }}><LeafShape size={320} color="var(--bz-verde-musgo)" /></div>
        <StarShape size={46} style={{ position: "absolute", top: "26%", left: "8%", opacity: 0.8 }} />
        <StarShape size={22} style={{ position: "absolute", top: "62%", left: "44%", opacity: 0.6 }} color="var(--bz-beige-hueso)" />
        <StarShape size={30} style={{ position: "absolute", top: "20%", right: "34%", opacity: 0.7 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 60%, transparent 0%, rgba(26, 32, 18, 0.45) 80%)" }} />
      </div>
      <Garland top={84} segments={7} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 90, paddingBottom: 110 }}>
        <div className="bz-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 460px)", alignItems: "center", gap: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 24, animation: "bz-fade-up 800ms var(--bz-ease) both" }}>
              <span className="tag tag-navidad" style={{ fontFamily: "var(--bz-font-mono)", textTransform: "uppercase", letterSpacing: "0.14em" }}>Edición Navideña</span>
              <span className="eyebrow" style={{ color: "var(--bz-ocre-calido)" }}>{BZ_DATE}</span>
            </div>
            <h1 className="display" style={{ fontSize: "clamp(56px, 11vw, 168px)", color: "var(--bz-beige-hueso)", lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: 28, animation: "bz-fade-up 1000ms var(--bz-ease) 100ms both" }}>
              BIO<em style={{ color: "var(--bz-ocre-calido)" }}>RAIZ</em>
            </h1>
            <p style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: "clamp(22px, 2.8vw, 32px)", color: "var(--bz-verde-claro)", maxWidth: 560, lineHeight: 1.35, marginBottom: 40, animation: "bz-fade-up 1000ms var(--bz-ease) 300ms both" }}>
              Una Navidad con raíz: regalos con origen, talleres y comunidad.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "bz-fade-up 1000ms var(--bz-ease) 500ms both" }}>
              <button onClick={() => setPage("participa")} className="btn btn-ocre">Quiero participar</button>
              <button onClick={() => setPage("edicion1")} className="btn" style={{ background: "rgba(250, 246, 237, 0.1)", color: "var(--bz-beige-hueso)", border: "1.5px solid rgba(250, 246, 237, 0.3)" }}>Ver la Edición 1</button>
            </div>
          </div>

          <div className="bz-hero-media" style={{ animation: "bz-fade-up 1100ms var(--bz-ease) 300ms both" }}>
            <div className="bz-arch-outline" aria-hidden="true"></div>
            <div className="bz-arch">
              {BZ_HERO_VIDEO
                ? <video src={BZ_HERO_VIDEO} poster={BZ_HERO_POSTER} autoPlay muted loop playsInline></video>
                : <img src={BZ_HERO_POSTER} alt="Clase de yoga al atardecer en la Edición 1" />}
            </div>
            <StarShape size={34} style={{ position: "absolute", top: "6%", right: "-2%", zIndex: 2 }} />
            <div className="bz-hero-info">
              <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 10 }}>{BZ_NAV_CONFIRMADA ? "Faltan" : "Se viene"}</div>
              {BZ_NAV_CONFIRMADA && <div style={{ marginBottom: 14 }}><Countdown size="sm" light /></div>}
              <div style={{ fontSize: 14, color: "var(--bz-verde-claro)", lineHeight: 1.55, display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 14px" }}>
                <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bz-ocre-calido)", paddingTop: 2 }}>Fecha</span><span>{BZ_DATE}</span>
                <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bz-ocre-calido)", paddingTop: 2 }}>Hora</span><span>{BZ_HORARIO}</span>
                <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bz-ocre-calido)", paddingTop: 2 }}>Lugar</span><span>{BZ_LOCATION}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.bz-hero-media{position:relative;padding:0 0 0 28px}.bz-arch{position:relative;z-index:1;aspect-ratio:4/5;border-radius:999px 999px 28px 28px;overflow:hidden;background:#1A2812;box-shadow:0 30px 80px rgba(0,0,0,0.35)}.bz-arch img,.bz-arch video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}.bz-arch-outline{position:absolute;z-index:0;top:-16px;left:12px;right:-16px;bottom:-16px;border:1.5px solid rgba(230,203,122,0.55);border-radius:999px 999px 40px 40px}.bz-hero-info{position:absolute;z-index:2;left:0;bottom:-28px;min-width:240px;border:1px solid rgba(230,203,122,0.4);border-radius:var(--bz-radius-lg);padding:18px 20px;background:rgba(26,40,18,0.82);backdrop-filter:blur(8px)}@media (max-width: 880px){.bz-hero-grid{grid-template-columns:1fr!important}.bz-hero-media{max-width:440px;margin:24px auto 30px;width:100%}}`}</style>
    </section>
  );
}

function Convocatoria({ setPage }) {
  return (
    <section style={{ padding: "120px 0", background: "var(--bz-fondo-base)" }} className="trama">
      <div className="container">
        <div style={{ marginBottom: 52, display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap" }}>
          <SectionHead eyebrow="Convocatoria abierta" accent="tierra" title={<>Sumate a la <em>Edición Navideña.</em></>} sub="Estamos armando la segunda edición. Elegí cómo querés ser parte." />
        </div>
        <div className="bz-conv-grid">
          {PART_ROLES.map((r, i) => (
            <button key={r.id} onClick={() => setPage("participa", r.id)} className={"reveal bz-conv-card" + (r.id === "publico" ? " is-pub" : "")} style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="eyebrow" style={{ color: r.id === "publico" ? "var(--bz-ocre-calido)" : "var(--bz-verde-musgo)" }}>{r.label}</span>
              <span className="display" style={{ fontSize: 28, lineHeight: 1.1 }}>{r.titulo}</span>
              <span style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>{r.desc}</span>
              <span className="bz-conv-go">Anotarme →</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`.bz-conv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:16px}
.bz-conv-card{text-align:left;display:flex;flex-direction:column;gap:10px;padding:28px 24px 24px;border-radius:var(--bz-radius-lg);background:var(--bz-beige-hueso);border:0.5px solid var(--bz-borde-ligero);color:var(--bz-texto-primario);transition:transform 300ms var(--bz-ease),box-shadow 300ms var(--bz-ease),border-color 300ms var(--bz-ease)}
.bz-conv-card:hover{transform:translateY(-4px);box-shadow:var(--bz-shadow-md);border-color:var(--bz-navidad-rojo)}
.bz-conv-card.is-pub{background:var(--bz-verde-profundo);color:var(--bz-beige-hueso);border-color:var(--bz-verde-profundo)}
.bz-conv-go{margin-top:auto;padding-top:10px;font-size:13px;font-weight:600;color:var(--bz-navidad-rojo)}
.bz-conv-card.is-pub .bz-conv-go{color:var(--bz-ocre-calido)}`}</style>
    </section>
  );
}

function Ed1Teaser({ setPage }) {
  return (
    <section style={{ padding: "110px 0", background: "var(--bz-fondo-alt)" }}>
      <div className="container">
        <div className="bz-teaser-head" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 32, alignItems: "end", marginBottom: 44 }}>
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 14 }}>Edición 1 · {BZ_ED1_FECHA}</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5.4vw, 68px)", lineHeight: 1.04 }}>
              <span style={{ color: "var(--bz-navidad-rojo)" }}><Counter to={BZ_ED1_ASISTENTES} /></span> personas<br />nos <em>visitaron.</em>
            </h2>
          </div>
          <button className="btn btn-primary reveal" onClick={() => setPage("edicion1")}>Ver cómo fue</button>
        </div>
        <div className="bz-teaser-grid">
          <div><Ed1Foto file="DSC00157" alt="Familias recorriendo la feria" /></div>
          <div><Ed1Foto file="DSC09728" alt="Deco navideña en un stand" /></div>
          <div><Ed1Foto file="DSC00151" alt="Saltos en el pelotero" pos="50% 30%" /></div>
        </div>
      </div>
      <style>{`.bz-teaser-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);grid-template-rows:220px 220px;gap:14px}.bz-teaser-grid>div:first-child{grid-row:span 2}
@media(max-width:720px){.bz-teaser-head{grid-template-columns:1fr!important}.bz-teaser-grid{grid-template-columns:1fr 1fr;grid-template-rows:260px 160px}.bz-teaser-grid>div:first-child{grid-row:auto;grid-column:span 2}}`}</style>
    </section>
  );
}

export default PageHome;
