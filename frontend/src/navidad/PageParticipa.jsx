// BIORAIZ — Participá (Edición Navideña): formulario único con rol
import * as React from 'react';
import { StarShape, useReveal } from './components.jsx';
import {
  BZ_DATE,
  BZ_EMAIL,
  BZ_LOCATION,
  BZ_WHATSAPP_LABEL,
  BZ_WHATSAPP_LINK,
} from './data.js';
import { SubPageHeader } from './PageExpositores.jsx';
import { submitParticipationForm } from '../services/api.js';

const { useState: useStatePart, useEffect: useEffectPart } = React;

const PART_ROLES = [
  { id: "expositor", label: "Expositor/a", titulo: "Tené tu stand", desc: "Productos con origen para el mercado de regalos navideños.", fields: [["emprendimiento", "Nombre del emprendimiento", true], ["rubro", "Rubro · qué vendés", true], ["instagram", "Instagram o web", true]] },
  { id: "tallerista", label: "Tallerista", titulo: "Proponé una actividad", desc: "Talleres, clases o terapias para grandes y chicos.", fields: [["actividad", "Taller, clase o terapia que proponés", true], ["duracion", "Duración aproximada", true], ["requerimientos", "Qué necesitás (espacio, sonido, materiales)", true]] },
  { id: "facilitador", label: "Facilitador/a", titulo: "Compartí una práctica", desc: "Yoga, meditación, respiración, movimiento, sonido y otras prácticas de bienestar.", fields: [["disciplina", "Disciplina", true], ["disciplina_sesion", "Tipo de sesión que proponés", true], ["descripcion", "Descripción de la sesión", true, true], ["duracion_sesion", "Duración de la sesión", true], ["nivel", "Nivel de la práctica", true], ["formacion", "Formación y certificaciones", true, true], ["experiencia", "Experiencia facilitando grupos", true], ["requerimientos_especiales", "¿Qué traés y qué necesitás de la organización?", false, true]] },
  { id: "sponsor", label: "Sponsor", titulo: "Acompañá la edición", desc: "Marcas que quieran sumarse a la Navidad de BIORAIZ.", fields: [["empresa", "Empresa o marca", true], ["cargo", "Tu cargo", true]] },
  { id: "voluntario", label: "Voluntario/a", titulo: "Sumate al equipo", desc: "Armado, recepción, puntos verdes y acompañamiento.", fields: [["disponibilidad", "¿Qué días podés?", true], ["area", "Área que te interesa", true]] },
  { id: "publico", label: "Público", titulo: "Avisame la fecha", desc: "Te avisamos cuando esté el programa completo.", fields: [["canal", "¿Cómo te enteraste?", false]] },
];

const partLabel = { display: "block", fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bz-texto-secundario)", marginBottom: 8 };
const partInput = { width: "100%", padding: "13px 16px", fontSize: 15, fontFamily: "var(--bz-font-body)", border: "1px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-md)", background: "var(--bz-beige-hueso)", color: "var(--bz-texto-primario)", outline: "none" };

function PartField({ name, label, required, type = "text", textarea, hint, min, step, placeholder }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label style={partLabel} htmlFor={"p-" + name}>{label}{required && <span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span>}</label>
      <Tag id={"p-" + name} name={name} type={textarea ? undefined : type} required={required} min={min} step={step} placeholder={placeholder} rows={textarea ? 4 : undefined} className="part-input" style={{ ...partInput, resize: textarea ? "vertical" : undefined }} />
      {hint && <p style={{ fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 6 }}>{hint}</p>}
    </div>
  );
}

function PartCards({ name, label, options, value, onChange, hint }) {
  return (
    <div>
      <span style={partLabel}>{label}<span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span></span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 10 }}>
        {options.map(option => {
          const selected = value === option.value;
          return (
            <label key={option.value} className="part-card" style={{ position: "relative", textAlign: "left", padding: "12px 14px", borderRadius: "var(--bz-radius-md)", border: selected ? "1.5px solid var(--bz-navidad-rojo)" : "1px solid var(--bz-borde-suave)", background: selected ? "color-mix(in oklch, var(--bz-navidad-rojo) 8%, var(--bz-beige-hueso))" : "var(--bz-beige-hueso)", color: "var(--bz-texto-primario)", display: "flex", flexDirection: "column", gap: 2, cursor: "pointer" }}>
              <input type="radio" name={name} value={option.value} required checked={selected} onChange={() => onChange(option.value)} style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} />
              <span style={{ fontFamily: "var(--bz-font-display)", fontSize: 17 }}>{option.title}</span>
            </label>
          );
        })}
      </div>
      {hint && <p style={{ fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 6 }}>{hint}</p>}
    </div>
  );
}

function PartSelect({ name, label, required, options, hint }) {
  return (
    <div>
      <label style={partLabel} htmlFor={"p-" + name}>{label}{required && <span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span>}</label>
      <select id={"p-" + name} name={name} required={required} className="part-input" style={partInput} defaultValue="">
        <option value="" disabled>Seleccioná una opción</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      {hint && <p style={{ fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 6 }}>{hint}</p>}
    </div>
  );
}

function PartInfo({ title, children }) {
  return (
    <div style={{ background: "var(--bz-fondo-base)", border: "1px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-md)", padding: "16px 18px" }}>
      <div style={partLabel}>{title}</div>
      <p style={{ fontSize: 14, color: "var(--bz-texto-secundario)" }}>{children}</p>
    </div>
  );
}

function PartCheckbox({ name, label, required }) {
  return (
    <label htmlFor={"p-" + name} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--bz-texto-secundario)", fontSize: 14, cursor: "pointer" }}>
      <input id={"p-" + name} name={name} type="checkbox" value="Sí" required={required} style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--bz-verde-profundo)", flexShrink: 0 }} />
      <span>{label}{required && <span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span>}</span>
    </label>
  );
}

function PartCheckboxGroup({ name, label, options }) {
  const [selected, setSelected] = useStatePart([]);
  const firstOption = React.useRef(null);

  useEffectPart(() => {
    firstOption.current?.setCustomValidity(selected.length ? "" : "Seleccioná al menos una opción.");
  }, [selected]);

  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend style={partLabel}>{label}<span style={{ color: "var(--bz-navidad-rojo)", marginLeft: 4 }}>*</span></legend>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 10 }}>
        {options.map((option, index) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className="part-checkbox-option" style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: "var(--bz-radius-md)", border: checked ? "1.5px solid var(--bz-verde-profundo)" : "1px solid var(--bz-borde-suave)", background: checked ? "var(--bz-verde-pasto)" : "var(--bz-beige-hueso)", color: "var(--bz-texto-primario)", fontSize: 14, cursor: "pointer" }}>
              <input
                ref={index === 0 ? firstOption : undefined}
                type="checkbox"
                name={name}
                value={option}
                checked={checked}
                onChange={(event) => {
                  const next = event.target.checked
                    ? [...selected, option]
                    : selected.filter(item => item !== option);
                  firstOption.current?.setCustomValidity(next.length ? "" : "Seleccioná al menos una opción.");
                  setSelected(next);
                }}
                style={{ width: 18, height: 18, accentColor: "var(--bz-verde-profundo)", flexShrink: 0 }}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
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
  gastronomico: [["doc_hab_municipal", "Habilitación municipal"], ["doc_bromatologia", "Habilitación bromatológica"], ["doc_manipulacion", "Carnet de manipulación de alimentos", true, "Uno por cada persona que atienda el carro. Podés subir varios archivos."], ["doc_dni_frente", "DNI · frente"], ["doc_dni_dorso", "DNI · dorso"], ["doc_seguro_accidentes", "Póliza de seguro de accidentes personales (mínimo $40.000.000, con cláusula de no repetición a favor de JJCS SAS)."]],
};

function PageParticipa({ setPage, initialRole }) {
  useReveal();
  const [role, setRole] = useStatePart(initialRole || "expositor");
  const [status, setStatus] = useStatePart("idle");
  const [tipo, setTipo] = useStatePart("feriante");
  const [tipoStand, setTipoStand] = useStatePart("");
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
      const fields = {};
      for (const [name, value] of new FormData(form).entries()) {
        if (typeof value === "string" && value.trim()) {
          fields[name] = fields[name] ? `${fields[name]}, ${value.trim()}` : value.trim();
        }
      }
      const data = { tipo_participacion: r.label, rol: role, ...fields };
      await submitParticipationForm(data);
      setStatus("sent");
    } catch (error) {
      console.error("Participation form error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="page-enter">
      <SubPageHeader eyebrow={`Edición Navideña · ${BZ_DATE} · ${BZ_LOCATION}`} title={<>Participá.</>} sub="Abrimos la convocatoria para la Edición Navideña. Elegí cómo querés sumarte y te contactamos." />

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
              {r.fields.map(([n, l, req, textarea]) => (
                <React.Fragment key={n}>
                  {role === "expositor" && tipo === "gastronomico" && n === "rubro" && (
                    <PartSelect name="tipo_puesto_gastronomico" label="Tipo de puesto gastronómico" required options={["Comida", "Bebidas", "Comida y bebidas"]} />
                  )}
                  {role === "facilitador" && n === "requerimientos_especiales" && (
                    <>
                      <PartCheckboxGroup name="dias_disponibles" label="¿Qué día podés?" options={["Sábado 12", "Domingo 13"]} />
                      <PartField name="franja_horaria" label="Franja horaria preferida" hint="Horario del evento: 16 a 23 h." />
                      <PartField name="cupo_maximo" label="Cupo máximo de personas" type="number" min="1" step="1" required />
                    </>
                  )}
                  {role === "voluntario" && n === "disponibilidad" ? (
                    <PartCheckboxGroup name="disponibilidad" label="¿Qué días podés?" options={["Armado", "Sábado 12", "Domingo 13", "Desarme"]} />
                  ) : role === "voluntario" && n === "area" ? (
                    <PartSelect name="area" label={l} required options={["Armado", "Recepción", "Puntos verdes", "Acompañamiento", "Donde se necesite"]} />
                  ) : role === "publico" && n === "canal" ? (
                    <PartSelect name="canal" label={l} options={["Instagram", "Amigos", "Edición anterior", "Otro"]} />
                  ) : (
                    <PartField
                      name={n}
                      label={role === "expositor" && n === "rubro" && tipo === "gastronomico"
                        ? "Tu menú"
                        : l}
                      required={req}
                      textarea={textarea}
                      hint={role === "expositor" && n === "rubro" && tipo === "gastronomico"
                        ? "Hasta 3 productos de comida. La organización aprueba el menú para que el patio tenga variedad."
                        : role === "facilitador" && n === "requerimientos_especiales"
                          ? "Ej.: mats, sonido, sombra."
                          : undefined}
                    />
                  )}
                  {role === "tallerista" && n === "requerimientos" && (
                    <>
                      <PartSelect name="publico_objetivo" label="¿Para quién es?" required options={["Chicos", "Adultos", "Todo público"]} />
                      <PartField name="edad_minima" label="Edad mínima" type="number" min="0" step="1" />
                      <PartField name="cupo_maximo" label="Cupo máximo de personas" type="number" min="1" step="1" required />
                      <PartCheckboxGroup name="dias_disponibles" label="¿Qué día podés?" options={["Sábado 12", "Domingo 13"]} />
                      <PartField name="franja_horaria" label="Franja horaria preferida" hint="Horario del evento: 16 a 23 h." />
                      <PartField name="instagram" label="Instagram o web" required />
                    </>
                  )}
                  {role === "expositor" && tipo === "feriante" && n === "rubro" && (
                    <>
                      <PartCards
                        name="tipo_stand"
                        label="Tipo de stand"
                        value={tipoStand}
                        onChange={setTipoStand}
                        options={[
                          { title: "Stand 3x3", value: "Stand 3x3" },
                          { title: "Stand 3x3 destacado", value: "Stand 3x3 destacado" },
                          { title: "Stand 1,5x3", value: "Stand 1,5x3" },
                          { title: "Stand 1,5x3 destacado", value: "Stand 1,5x3 destacado" },
                        ]}
                        hint="Valores por ambos días. La ubicación final se elige según el mapa del predio, segun disponibilidad."
                      />
                      <PartField name="personas_stand" label="¿Cuántas personas atienden el stand?" type="number" min="1" step="1" required />
                    </>
                  )}
                  {role === "facilitador" && n === "requerimientos_especiales" && (
                    <PartField name="instagram" label="Instagram o web" required />
                  )}
                  {role === "voluntario" && n === "area" && (
                    <>
                      <PartSelect name="talle_remera" label="Talle de remera" required options={["S", "M", "L", "XL", "XXL"]} />
                      <PartCheckbox name="mayor_18" label="Soy mayor de 18 años" required />
                    </>
                  )}
                </React.Fragment>
              ))}
              {role === "expositor" && (<>
                {tipo === "gastronomico" && <>
                  <PartField name="carro_medidas" label="Medidas del carro (largo × ancho × alto, en metros)" required />
                  <PartInfo title="Vasos del evento">El evento es sin descartables. Las bebidas se sirven únicamente en los vasos oficiales de 500 y 750 cc, que la organización vende a $2.000 cada uno. Para bebidas calientes hay un vaso especial con precio a confirmar. Latas y botellas se sirven siempre en vaso: el envase no sale del puesto.</PartInfo>
                  <PartSelect name="cafe_bebidas_calientes" label="¿Vendés café o bebidas calientes?" required options={["Sí", "No"]} />
                  <PartInfo title="Vajilla">La organización vende la vajilla biodegradable oficial. No se permiten descartables propios (solo servilletas de papel).</PartInfo>
                </>}
                <div>
                  <PartField name="electricidad" label="¿Qué elementos usan electricidad?" required textarea />
                  <p style={{ fontSize: 12, color: "var(--bz-texto-terciario)", marginTop: 6 }}>Ej.: luces, heladera, plancha, cafetera. Si sabés la potencia (W), sumala. Si no usás, escribí &quot;Ninguno&quot;.{tipo === "feriante" && " Incluye hasta 500 W por stand. No se permiten pavas eléctricas."}{tipo === "gastronomico" && " No se permiten pavas eléctricas. Los equipos de cocción eléctricos requieren autorización previa."}</p>
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
              {role === "expositor" && tipo === "gastronomico" && (
                <PartCheckbox name="aceptacion_condiciones" label="Leí y acepto las condiciones de vasos, vajilla y menú del evento." required />
              )}
              <PartCheckbox name="consentimiento_datos" label="Acepto que BIORAIZ use mis datos para contactarme por esta convocatoria." required />
              {role === "expositor" && tipo === "feriante" && (
                <p style={{ background: "var(--bz-fondo-base)", border: "1px solid var(--bz-borde-suave)", borderRadius: "var(--bz-radius-md)", padding: "14px 16px", fontSize: 14, color: "var(--bz-texto-secundario)" }}>
                  Si tu inscripción queda confirmada, te enviamos el reglamento y los datos para pagar la seña del 50%.
                </p>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 6 }}>
                <button type="submit" className="btn btn-primary" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : role === "publico" ? "Avisame" : "Enviar inscripción"}</button>
                {status === "error" && <span style={{ fontSize: 13, color: "var(--bz-navidad-rojo)" }}>No se pudo enviar. Probá de nuevo o escribinos a {BZ_EMAIL}.</span>}
              </div>
            </form>
          )}
        </div>
      </section>
      <style>{`.part-input:focus{border-color:var(--bz-verde-profundo)!important}.part-file:hover{border-color:var(--bz-verde-profundo)!important}.part-card:focus-within{outline:2px solid var(--bz-verde-profundo);outline-offset:2px}`}</style>
    </div>
  );
}

export { PART_ROLES };
export default PageParticipa;
