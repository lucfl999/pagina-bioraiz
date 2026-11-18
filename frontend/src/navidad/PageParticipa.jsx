// BIORAIZ — Participá (Edición Navideña): formulario único con rol
import * as React from 'react';
import { StarShape, useReveal } from './components.jsx';
import {
  BZ_DATE,
  BZ_EMAIL,
  BZ_WHATSAPP_LABEL,
  BZ_WHATSAPP_LINK,
} from './data.js';
import { SubPageHeader } from './PageExpositores.jsx';
import { submitParticipationForm } from '../services/api.js';

const { useState: useStatePart, useEffect: useEffectPart } = React;

const PART_ROLES = [
  { id: "expositor", label: "Expositor/a", titulo: "Tené tu stand", desc: "Productos con origen para el mercado de regalos navideños.", fields: [["emprendimiento", "Nombre del emprendimiento", true], ["rubro", "Rubro · qué vendés", true], ["instagram", "Instagram o web", true]] },
  { id: "tallerista", label: "Tallerista", titulo: "Proponé una actividad", desc: "Talleres, clases o terapias para grandes y chicos.", fields: [["actividad", "Taller, clase o terapia que proponés", true], ["duracion", "Duración aproximada", true], ["requerimientos", "Qué necesitás (espacio, sonido, materiales)", true]] },
  { id: "facilitador", label: "Facilitador/a", titulo: "Compartí una práctica", desc: "Yoga, meditación, respiración, movimiento, sonido y otras prácticas de bienestar.", fields: [["disciplina", "Disciplina", true], ["disciplina_sesion", "Tipo de sesión que proponés", true], ["descripcion", "Descripción de la sesión", true, true], ["duracion_sesion", "Duración de la sesión", true], ["nivel", "Nivel de la práctica", true], ["formacion", "Formación y certificaciones", true, true], ["experiencia", "Experiencia facilitando grupos", true], ["requerimientos_especiales", "Requerimientos especiales", false, true]] },
  { id: "sponsor", label: "Sponsor", titulo: "Acompañá la edición", desc: "Marcas que quieran sumarse a la Navidad de BIORAIZ.", fields: [["empresa", "Empresa o marca", true], ["cargo", "Tu cargo", true]] },
  { id: "voluntario", label: "Voluntario/a", titulo: "Sumate al equipo", desc: "Armado, recepción, puntos verdes y acompañamiento.", fields: [["disponibilidad", "Días en los que podrías colaborar", true], ["area", "Área que te interesa", true]] },
  { id: "publico", label: "Público", titulo: "Avisame la fecha", desc: "Te escribimos cuando confirmemos el día y el programa.", fields: [] },
];

const partLabel = { display: "block", fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bz-texto-secundario)", marginBottom: 8 };
const partInput = { width: "100%", padding: "13px 16px", fontSize: 15, fontFamily: "var(--bz-font-body)", border: "1px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-md)", background: "var(--bz-beige-hueso)", color: "var(--bz-texto-primario)", outline: "none" };

function PartField({ name, label, required, type = "text", textarea }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label style={partLabel} htmlFor={"p-" + name}>{label}{required && <span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span>}</label>
      <Tag id={"p-" + name} name={name} type={textarea ? undefined : type} required={required} rows={textarea ? 4 : undefined} className="part-input" style={{ ...partInput, resize: textarea ? "vertical" : undefined }} />
    </div>
  );
}

function PartFile({ name, label, required, multiple, hint }) {
  const [names, setNames] = useStatePart([]);
  return (
    <div>
      <label style={partLabel} htmlFor={"p-" + name}>{label}{required && <span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span>}</label>
      <label htmlFor={"p-" + name} className="part-file" style={{ ...partInput, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", borderStyle: "dashed" }}>
        <span style={{ flexShrink: 0, fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 10px", borderRadius: "var(--bz-radius-sm)", background: "var(--bz-verde-profundo)", color: "var(--bz-beige-hueso)" }}>Subir</span>
        <span style={{ fontSize: 14, color: names.length ? "var(--bz-texto-primario)" : "var(--bz-texto-terciario)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{names.length ? names.join(", ") : "Foto o PDF"}</span>
      </label>
      <input id={"p-" + name} name={name} type="file" accept="image/*,.pdf" multiple={multiple} required={required} onChange={e => setNames([...e.target.files].map(f => f.name))} style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
      {hint && <p style={{ fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 6 }}>{hint}</p>}
    </div>
  );
}

const PART_TIPOS = [{ id: "feriante", label: "Feriante", sub: "Productos, artesanías, diseño" }, { id: "gastronomico", label: "Gastronómico", sub: "Carro o puesto de comida/bebida" }];
const PART_DOCS = {
  feriante: [["doc_arca", "Inscripción en ARCA"], ["doc_dni_frente", "DNI · frente"], ["doc_dni_dorso", "DNI · dorso"]],
  gastronomico: [["doc_hab_municipal", "Habilitación municipal"], ["doc_bromatologia", "Habilitación bromatológica"], ["doc_manipulacion", "Carnet de manipulación de alimentos", true, "Uno por cada persona que atienda el carro. Podés subir varios archivos."], ["doc_dni_frente", "DNI · frente"], ["doc_dni_dorso", "DNI · dorso"]],
};

function PageParticipa({ setPage, initialRole }) {
  useReveal();
  const [role, setRole] = useStatePart(initialRole || "expositor");
  const [status, setStatus] = useStatePart("idle");
  const [tipo, setTipo] = useStatePart("feriante");
  const [docsWa, setDocsWa] = useStatePart(null);
  const waDocsLink = (nombre) => BZ_WHATSAPP_LINK + "?text=" + encodeURIComponent("Hola BIORAIZ, soy " + (nombre || "") + " (" + (tipo === "gastronomico" ? "Gastronómico" : "Feriante") + "). Les envío la documentación para la Edición Navideña: " + PART_DOCS[tipo].map(d => d[1]).join(", ") + ".");
  useEffectPart(() => { if (initialRole) setRole(initialRole); }, [initialRole]);
  const r = PART_ROLES.find(x => x.id === role);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const get = (n) => (form.elements[n] && form.elements[n].value || "").trim();
    setDocsWa(role === "expositor" ? waDocsLink(get("nombre")) : null);
    setStatus("sending");
    try {
      const data = { tipo_participacion: r.label, rol: role };
      for (const [name, value] of new FormData(form).entries()) {
        if (typeof value === "string" && value.trim()) data[name] = value.trim();
      }
      await submitParticipationForm(data);
      setStatus("sent");
    } catch (error) {
      console.error("Participation form error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="page-enter">
      <SubPageHeader eyebrow={`Edición Navideña · ${BZ_DATE} · día a confirmar`} title={<>Participá.</>} sub="Abrimos la convocatoria para la Edición Navideña. Elegí cómo querés sumarte y te contactamos." />

      <section style={{ padding: "72px 0 120px", background: "var(--bz-fondo-base)" }} className="trama">
        <div className="container-narrow">
          <div className="reveal" style={{ marginBottom: 40 }}>
            <span style={partLabel}>¿Cómo querés participar?</span>
            <div role="radiogroup" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 10 }}>
              {PART_ROLES.map(x => {
                const on = x.id === role;
                return (
                  <button key={x.id} type="button" role="radio" aria-checked={on} onClick={() => { setRole(x.id); setStatus("idle"); }} style={{ textAlign: "left", padding: "16px 16px 14px", borderRadius: "var(--bz-radius-md)", border: on ? "1.5px solid var(--bz-verde-profundo)" : "1px solid var(--bz-borde-suave)", background: on ? "var(--bz-verde-profundo)" : "var(--bz-beige-hueso)", color: on ? "var(--bz-beige-hueso)" : "var(--bz-texto-primario)", transition: "all 200ms var(--bz-ease)", display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontFamily: "var(--bz-font-display)", fontSize: 19, lineHeight: 1.1 }}>{x.label}</span>
                    <span style={{ fontSize: 12, lineHeight: 1.4, color: on ? "var(--bz-verde-claro)" : "var(--bz-texto-terciario)" }}>{x.titulo}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {status === "sent" ? (
            <div className="reveal in" style={{ background: "var(--bz-beige-hueso)", border: "0.5px solid var(--bz-borde-ligero)", borderRadius: "var(--bz-radius-xl)", padding: "56px 40px", textAlign: "center" }}>
              <StarShape size={36} color="var(--bz-navidad-rojo)" style={{ margin: "0 auto 18px" }} />
              <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 12 }}>¡Gracias! Ya estás en la lista.</h3>
              <p style={{ color: "var(--bz-texto-secundario)", maxWidth: 460, margin: "0 auto 28px" }}>{docsWa ? <>Último paso: mandanos la documentación por WhatsApp al {BZ_WHATSAPP_LABEL}. Sin ella no podemos confirmar tu puesto.</> : "Te escribimos por WhatsApp o email apenas confirmemos la fecha de la Edición Navideña."}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {docsWa && <a href={docsWa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Enviar documentación por WhatsApp</a>}
                <button className="btn btn-secondary" onClick={() => setStatus("idle")}>Enviar otra inscripción</button>
              </div>
            </div>
          ) : (
            <form key={role} onSubmit={onSubmit} className="reveal in" style={{ background: "var(--bz-beige-hueso)", border: "0.5px solid var(--bz-borde-ligero)", borderRadius: "var(--bz-radius-xl)", padding: "clamp(28px, 5vw, 48px)", display: "flex", flexDirection: "column", gap: 22 }}>
              <input type="hidden" name="rol" value={r.label} />
              <div>
                <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 8 }}>{r.label}</div>
                <p style={{ color: "var(--bz-texto-secundario)", fontSize: 15 }}>{r.desc}</p>
              </div>
              <PartField name="nombre" label="Nombre y apellido" required />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "22px 24px" }}>
                <PartField name="whatsapp" label="WhatsApp" type="tel" required />
                <PartField name="email" label="Email" type="email" required />
              </div>
              {role === "expositor" && (
                <div>
                  <span style={partLabel}>Tipo de puesto<span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span></span>
                  <input type="hidden" name="tipo" value={tipo} />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 10 }}>
                    {PART_TIPOS.map(t => { const on = t.id === tipo; return (
                      <button key={t.id} type="button" aria-pressed={on} onClick={() => setTipo(t.id)} style={{ textAlign: "left", padding: "12px 14px", borderRadius: "var(--bz-radius-md)", border: on ? "1.5px solid var(--bz-navidad-rojo)" : "1px solid var(--bz-borde-suave)", background: on ? "color-mix(in oklch, var(--bz-navidad-rojo) 8%, var(--bz-beige-hueso))" : "var(--bz-beige-hueso)", color: "var(--bz-texto-primario)", display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontFamily: "var(--bz-font-display)", fontSize: 17 }}>{t.label}</span>
                        <span style={{ fontSize: 12, color: "var(--bz-texto-secundario)" }}>{t.sub}</span>
                      </button>); })}
                  </div>
                </div>
              )}
              {r.fields.map(([n, l, req, textarea]) => <PartField key={n} name={n} label={role === "expositor" && n === "rubro" && tipo === "gastronomico" ? "Qué comidas o bebidas ofrecés" : l} required={req} textarea={textarea} />)}
              {role === "expositor" && (<>
                {tipo === "gastronomico" && <>
                  <PartField name="carro_medidas" label="Medidas del carro (largo × ancho × alto, en metros)" required />
                  <PartField name="vasos" label="Vasos que usás (tamaños, en cc o ml)" required />
                  <PartField name="platos" label="Platos y utensilios que usás (material y tipo)" required />
                </>}
                <div>
                  <PartField name="electricidad" label="¿Qué elementos usan electricidad?" required textarea />
                  <p style={{ fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 6 }}>Ej.: luces, heladera, plancha, cafetera. Si sabés la potencia (W), sumala. Si no usás, escribí &quot;Ninguno&quot;.</p>
                </div>
                <div style={{ borderTop: "0.5px solid var(--bz-borde-ligero)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 6 }}>Documentación</div>
                    <p style={{ fontSize: 14, color: "var(--bz-texto-secundario)" }}>{tipo === "gastronomico" ? "Obligatoria para puestos gastronómicos." : "Obligatoria para feriantes."} Después de enviar el formulario, mandala por WhatsApp al <a href={BZ_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "var(--bz-verde-profundo)", fontWeight: 600 }}>{BZ_WHATSAPP_LABEL}</a> (foto legible o PDF).</p>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "10px 24px" }}>
                    {PART_DOCS[tipo].map(([n, l, multi, hint]) => <li key={n} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 15, gridColumn: multi ? "1 / -1" : undefined }}><StarShape size={10} color="var(--bz-navidad-rojo)" style={{ flexShrink: 0 }} /><span>{l}{hint && <span style={{ display: "block", fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 2 }}>{hint.replace(" Podés subir varios archivos.", "")}</span>}</span></li>)}
                  </ul>
                </div>
              </>)}
              <PartField name="mensaje" label={role === "publico" ? "¿Algo que quieras contarnos?" : "Contanos un poco más"} textarea />
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 6 }}>
                <button type="submit" className="btn btn-primary" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : role === "publico" ? "Avisame" : "Enviar inscripción"}</button>
                {status === "error" && <span style={{ fontSize: 13, color: "var(--bz-navidad-rojo)" }}>No se pudo enviar. Probá de nuevo o escribinos a {BZ_EMAIL}.</span>}
              </div>
            </form>
          )}
        </div>
      </section>
      <style>{`.part-input:focus{border-color:var(--bz-verde-profundo)!important}.part-file:hover{border-color:var(--bz-verde-profundo)!important}`}</style>
    </div>
  );
}

export { PART_ROLES };
export default PageParticipa;
