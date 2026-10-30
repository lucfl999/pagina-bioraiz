import { useState } from 'react';
import { useReveal, SubPageHeader, CTABanner } from '../components/shared.jsx';
import { ACTIVIDADES, DIAS } from '../data.js';

export default function ProgramaPage({ setPage }) {
  useReveal();
  const [activeDia, setActiveDia] = useState("viernes");

  const dia = DIAS.find(d => d.id === activeDia);

  const enfasis = {
    viernes: "Charlas en el Domo y el Escenario principal, y stretching al aire libre.",
    sabado:  "Terapias, charlas, yoga, biodanza, pilates, terapia de sonido y música.",
    domingo: "Charlas, Oráculo Vivo, pilates, yoga, biodanza, jam y música hasta el cierre.",
  };

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Programa · 3 días"
        title={<>Programa.</>}
        sub="Tres días con las mismas familias de actividades. Lo que cambia es el énfasis de cada jornada."
      />

      <section style={{ padding: "48px 0 0", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div role="tablist" aria-label="Días del programa" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, background: "var(--bz-beige-base)", padding: 6, borderRadius: "var(--bz-radius-lg)", maxWidth: 720, margin: "0 auto 48px" }}>
            {DIAS.map(d => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={activeDia === d.id}
                aria-controls="programa-del-dia"
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

      <section id="programa-del-dia" key={activeDia} role="tabpanel" style={{ padding: "8px 0 90px", background: "var(--bz-fondo-base)", animation: "bz-fade-in 400ms var(--bz-ease) both" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="reveal" style={{ display: "flex", gap: 20, alignItems: "baseline", marginBottom: 40, paddingBottom: 28, borderBottom: "0.5px solid var(--bz-borde-suave)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span className="display" style={{ fontSize: 30, color: "var(--bz-texto-primario)" }}>{dia.label}</span>
              <span style={{ fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: 20, color: "var(--bz-verde-musgo)" }}>· {dia.subtitulo}</span>
            </div>
            <p style={{ flex: 1, minWidth: 280, fontSize: 15, color: "var(--bz-texto-secundario)", lineHeight: 1.6 }}>{enfasis[activeDia]}</p>
          </div>

          <div className="bz-grilla" role="table" aria-label={`Programa ${dia.label}`}>
            <div className="bz-grilla-row bz-grilla-head" role="row">
              <span role="columnheader">Hora</span>
              <span role="columnheader">Actividad</span>
              <span role="columnheader">Quién</span>
              <span role="columnheader">Espacio</span>
            </div>
            {(ACTIVIDADES[activeDia] || []).map((activity) => (
              <div key={`${activity.hora}-${activity.title}-${activity.speaker}`} className="bz-grilla-row" role="row">
                <span role="cell" className="bz-g-hora">{activity.hora}</span>
                <span role="cell" className="bz-g-title">{activity.title}</span>
                <span role="cell" className="bz-g-quien">{activity.speaker}</span>
                <span role="cell" className="bz-g-lugar">{activity.lugar}</span>
              </div>
            ))}
          </div>

          <style>{`
            .bz-grilla { border-top: 0.5px solid var(--bz-borde-suave); }
            .bz-grilla-row { display: grid; grid-template-columns: 130px minmax(0, 1.4fr) minmax(0, 1.2fr) minmax(0, 1fr); gap: 20px; padding: 18px 4px; border-bottom: 0.5px solid var(--bz-borde-suave); align-items: baseline; }
            .bz-grilla-head { padding: 12px 4px; font-family: var(--bz-font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--bz-texto-terciario); }
            .bz-g-hora { font-family: var(--bz-font-mono); font-size: 14px; color: var(--bz-verde-musgo); }
            .bz-g-title { font-family: var(--bz-font-display); font-size: 20px; color: var(--bz-texto-primario); line-height: 1.3; }
            .bz-g-quien, .bz-g-lugar { font-size: 14px; color: var(--bz-texto-secundario); }
            @media (max-width: 720px) {
              .bz-grilla-head { display: none; }
              .bz-grilla-row { grid-template-columns: 96px minmax(0, 1fr); gap: 4px 16px; }
              .bz-g-quien, .bz-g-lugar { grid-column: 2; }
            }
          `}</style>
        </div>
      </section>

      <CTABanner setPage={setPage} />
    </div>
  );
}
