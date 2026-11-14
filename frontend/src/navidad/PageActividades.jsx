// BIORAIZ — Actividades (Edición Navideña): talleres, clases y terapias
import * as React from 'react';
import { SectionHead, StarShape, useReveal } from './components.jsx';
import { ACT_TIPOS, BZ_DATE, BZ_EMAIL, BZ_HORARIO, NAV_ACTIVIDADES } from './data.js';
import { SubPageHeader } from './PageExpositores.jsx';
import { submitParticipationForm } from '../services/api.js';

const { useState: useStateAct } = React;
const actMono = { fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" };

function ActTipos({ count }) {
  return (
    <div className="bz-act-tipos">
      {ACT_TIPOS.map((t, i) => (
        <article key={t.id} className="reveal bz-act-tipo" style={{ transitionDelay: `${i * 80}ms` }}>
          <span style={{ ...actMono, color: "var(--bz-navidad-rojo)" }}>0{i + 1}</span>
          <h3 className="display" style={{ fontSize: "clamp(34px, 4vw, 46px)", lineHeight: 1 }}>{t.label}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--bz-texto-secundario)" }}>{t.desc}</p>
          <span style={{ ...actMono, marginTop: "auto", paddingTop: 14, color: "var(--bz-verde-musgo)" }}>{count ? `${count(t.id)} en el programa` : "Próximamente más info"}</span>
        </article>
      ))}
    </div>
  );
}

function ActConvocatoria({ setPage }) {
  return (
    <section style={{ padding: "100px 0", background: "var(--bz-verde-profundo)", color: "var(--bz-beige-hueso)", position: "relative", overflow: "hidden" }}>
      <StarShape size={34} style={{ position: "absolute", top: 40, right: "12%", opacity: 0.7 }} />
      <div className="container bz-act-cta">
        <div className="reveal">
          <div className="eyebrow" style={{ color: "var(--bz-ocre-calido)", marginBottom: 14 }}>Convocatoria abierta</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4.6vw, 54px)", lineHeight: 1.06, color: "var(--bz-beige-hueso)" }}>¿Das talleres, clases <em style={{ color: "var(--bz-ocre-calido)" }}>o terapias?</em></h2>
          <p style={{ marginTop: 16, maxWidth: 520, color: "var(--bz-verde-claro)", lineHeight: 1.6 }}>Estamos armando el programa de la Edición Navideña. Contanos qué propuesta traés y te contactamos.</p>
        </div>
        <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-ocre" onClick={() => setPage("participa", "tallerista")}>Proponer una actividad</button>
          <button className="btn btn-on-dark" onClick={() => setPage("participa", "publico")}>Avisame cuando salga</button>
        </div>
      </div>
    </section>
  );
}

const actInput = { width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: "var(--bz-font-body)", border: "1px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-md)", background: "var(--bz-fondo-base)", color: "var(--bz-texto-primario)", outline: "none" };

function ActInscripcion({ a, lab, onClose }) {
  const [sent, setSent] = useStateAct(false);
  const [sending, setSending] = useStateAct(false);
  const [error, setError] = useStateAct(false);
  const fields = [["nombre", "Nombre y apellido", "text"], ["whatsapp", "WhatsApp", "tel"], ["email", "Email", "email"], ["personas", "¿Cuántas personas?", "number"]];
  const onSubmit = async ev => {
    ev.preventDefault();
    const g = n => (ev.target.elements[n].value || "").trim();
    setSending(true);
    setError(false);
    try {
      await submitParticipationForm({
        tipo_participacion: `Inscripción a actividad: ${a.nombre}`,
        nombre: g("nombre"),
        whatsapp: g("whatsapp"),
        email: g("email"),
        personas: g("personas"),
        actividad: a.nombre,
        tipo: lab,
        horario: a.hora,
        lugar: a.lugar,
        responsable: a.quien,
      });
      setSent(true);
    } catch (submitError) {
      console.error("Activity registration error:", submitError);
      setError(true);
    } finally {
      setSending(false);
    }
  };
  if (sent) return (
    <div className="bz-act-form" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <p style={{ fontSize: 15 }}><strong>¡Listo!</strong> Recibimos tu solicitud y te contactaremos para confirmar tu lugar.</p>
      <button className="btn btn-secondary btn-sm" onClick={onClose}>Cerrar</button>
    </div>
  );
  return (
    <form className="bz-act-form" onSubmit={onSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 14 }}>
        {fields.map(([n, l, t]) => (
          <label key={n} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ ...actMono, fontSize: 10, color: "var(--bz-texto-secundario)" }}>{l}<span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span></span>
            <input name={n} type={t} required min={t === "number" ? 1 : undefined} defaultValue={t === "number" ? 1 : undefined} style={actInput} />
          </label>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 16 }}>
        <button type="submit" className="btn btn-primary btn-sm" disabled={sending}>{sending ? "Enviando…" : "Confirmar inscripción"}</button>
        <button type="button" onClick={onClose} style={{ fontSize: 13, color: "var(--bz-texto-secundario)" }}>Cancelar</button>
      </div>
      {error && <p role="alert" style={{ marginTop: 14, color: "var(--bz-navidad-rojo)", fontSize: 13 }}>No se pudo enviar la inscripción. Probá de nuevo o escribinos a {BZ_EMAIL}.</p>}
    </form>
  );
}

function ActPrograma() {
  const [f, setF] = useStateAct("all");
  const [open, setOpen] = useStateAct(null);
  const list = NAV_ACTIVIDADES.filter(a => f === "all" || a.tipo === f).slice().sort((a, b) => a.hora.localeCompare(b.hora));
  const lab = id => (ACT_TIPOS.find(t => t.id === id) || {}).label;
  const tabs = [["all", "Todas"], ...ACT_TIPOS.map(t => [t.id, t.label])];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {tabs.map(([id, l]) => <button key={id} onClick={() => { setF(id); setOpen(null); }} aria-pressed={f === id} className="bz-act-tab">{l}</button>)}
      </div>
      <div style={{ borderTop: "0.5px solid var(--bz-borde-suave)" }}>
        {list.map((a, i) => (
          <div key={i} style={{ borderBottom: "0.5px solid var(--bz-borde-suave)" }}>
          <div className="bz-act-row">
            <span className="display" style={{ fontSize: 26, color: "var(--bz-navidad-rojo)", fontVariantNumeric: "tabular-nums" }}>{a.hora}</span>
            <div style={{ minWidth: 0 }}>
              <div className="display" style={{ fontSize: 22, lineHeight: 1.2 }}>{a.nombre}</div>
              <div style={{ fontSize: 14, color: "var(--bz-texto-secundario)", marginTop: 4 }}>{a.quien}</div>
            </div>
            <span style={{ ...actMono, color: "var(--bz-verde-musgo)" }}>{lab(a.tipo)}</span>
            <span style={{ fontSize: 14, color: "var(--bz-texto-secundario)" }}>{a.lugar}{a.cupo && <span style={{ display: "block", fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 2 }}>Cupo: {a.cupo}</span>}</span>
            <button className={"btn btn-sm " + (open === i ? "btn-secondary" : "btn-primary")} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>{open === i ? "Cerrar" : "Inscribirme"}</button>
          </div>
          {open === i && <ActInscripcion a={a} lab={lab(a.tipo)} onClose={() => setOpen(null)} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function PageActividades({ setPage, definido }) {
  useReveal();
  return (
    <div className="page-enter">
      <SubPageHeader eyebrow={`Edición Navideña · ${BZ_DATE} · ${BZ_HORARIO}`} title={<>Actividades.</>} sub={definido ? "Talleres, clases y terapias durante toda la jornada. Cupos limitados en algunas actividades." : "Habrá talleres, clases y terapias durante toda la jornada. Estamos definiendo quién da cada una: el programa completo se publica pronto."} />
      <section style={{ padding: "100px 0", background: "var(--bz-fondo-base)" }} className="trama">
        <div className="container">
          {definido ? (<>
            <div style={{ marginBottom: 44 }}><SectionHead eyebrow="Programa" accent="tierra" title={<>Qué hacer <em>en la feria.</em></>} /></div>
            <ActPrograma />
          </>) : (<>
            <div style={{ marginBottom: 44 }}><SectionHead eyebrow="Qué va a haber" accent="tierra" title={<>Tres formas de <em>ser parte.</em></>} /></div>
            <ActTipos />
          </>)}
        </div>
      </section>
      {!definido && <ActConvocatoria setPage={setPage} />}
      <style>{`.bz-act-tipos{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px}
.bz-act-tipo{display:flex;flex-direction:column;gap:14px;padding:30px 28px 26px;min-height:280px;border-radius:var(--bz-radius-lg);background:var(--bz-beige-hueso);border:0.5px solid var(--bz-borde-ligero)}
.bz-act-cta{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:32px;align-items:end;position:relative}
.bz-act-tab{padding:9px 16px;border-radius:999px;font-size:13px;border:1px solid var(--bz-borde-suave);background:var(--bz-beige-hueso);color:var(--bz-texto-secundario)}
.bz-act-tab[aria-pressed="true"]{background:var(--bz-verde-profundo);border-color:var(--bz-verde-profundo);color:var(--bz-beige-hueso)}
.bz-act-row{display:grid;grid-template-columns:90px minmax(0,1fr) 110px 120px auto;gap:20px;align-items:center;padding:22px 4px}
.bz-act-form{margin:0 0 22px 110px;padding:22px;border-radius:var(--bz-radius-lg);background:var(--bz-beige-hueso);border:0.5px solid var(--bz-borde-ligero);animation:bz-fade-up 300ms var(--bz-ease) both}
@media(max-width:760px){.bz-act-cta{grid-template-columns:1fr}.bz-act-row{grid-template-columns:70px minmax(0,1fr);row-gap:6px}.bz-act-row>*:nth-child(n+3){grid-column:2;justify-self:start}.bz-act-form{margin-left:0}}`}</style>
    </div>
  );
}

export default PageActividades;
