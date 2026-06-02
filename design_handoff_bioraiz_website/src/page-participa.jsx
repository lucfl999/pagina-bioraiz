// ─── BIORAIZ — Participá del Festival ─────────────────────────────
// Renderer de los formularios. Los SCHEMAS y los TABS viven en
// participa-forms.jsx (window.FORM_SCHEMAS / window.PARTICIPA_TABS).
//
// ── EMAILJS (envío desde el frontend, sin backend) ───────────────
// 1. Creá cuenta en https://emailjs.com y conectá el Gmail del evento
//    (Email Services → te da un SERVICE_ID).
// 2. Creá una template por cada tipo de formulario (Email Templates →
//    cada una te da un TEMPLATE_ID). En el cuerpo usá las variables
//    {{nombre_del_campo}} que coinciden con los `name` de los inputs.
// 3. Copiá tu Public Key (Account → API Keys) y pegá todo en EMAILJS_CONFIG.
// 4. Pegá el templateId de cada tab en PARTICIPA_TABS (participa-forms.jsx).
// El SDK de EmailJS se carga en BIORAIZ.html (cdn.jsdelivr → @emailjs/browser).

// ── Credenciales de EmailJS (REEMPLAZAR por las tuyas) ───────────
const EMAILJS_CONFIG = {
  publicKey: "REEMPLAZAR_PUBLIC_KEY",   // Account → API Keys → Public Key
  serviceId: "REEMPLAZAR_SERVICE_ID",   // Email Services → Service ID (Gmail)
};

if (typeof window !== "undefined" && window.emailjs && !window.__bzEmailjsInit) {
  window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  window.__bzEmailjsInit = true;
}

// ── Paleta exacta de la sección (specs del usuario) ──────────────
const PZ = {
  fondo:   "#1E3320", // fondo de la sección
  campo:   "#2C2418", // fondo de los campos
  borde:   "#7A9E5A", // borde de campos + tab activo + botón (color hoja)
  texto:   "#F5F0E8", // texto de los campos
  label:   "#C8B87A", // labels (DM Mono)
};

// ── Helper: **negrita** dentro de un texto plano ─────────────────
function richText(text) {
  if (!text) return null;
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: PZ.label, fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// ── Estilos base reutilizables ───────────────────────────────────
const pzLabel = {
  display: "block",
  fontFamily: "var(--bz-font-mono)",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: PZ.label,
  marginBottom: 9,
  lineHeight: 1.45,
};

const pzHint = {
  fontSize: 12.5,
  color: "rgba(245,240,232,0.5)",
  lineHeight: 1.5,
  marginTop: 8,
};

// ── Grupo de opciones (radio / checkbox) como tarjetas ───────────
function OptionGroup({ field }) {
  const multi = field.type === "checkbox";
  const opts = field.options.map(o => (typeof o === "string" ? { t: o } : o));
  const [val, setVal] = useState(multi ? [] : "");

  const isOn = (t) => (multi ? val.includes(t) : val === t);
  const toggle = (t) => {
    if (multi) setVal(v => (v.includes(t) ? v.filter(x => x !== t) : [...v, t]));
    else setVal(t);
  };

  return (
    <div style={{ display: "grid", gap: 9 }}>
      {opts.map(o => {
        const on = isOn(o.t);
        return (
          <label key={o.t} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 13,
            padding: "13px 16px",
            borderRadius: "var(--bz-radius-md)",
            background: on ? "rgba(122,158,90,0.12)" : PZ.campo,
            border: `1px solid ${on ? PZ.borde : "rgba(122,158,90,0.28)"}`,
            cursor: "pointer",
            transition: "background 160ms var(--bz-ease), border-color 160ms var(--bz-ease)",
          }}>
            <input
              type={multi ? "checkbox" : "radio"}
              name={field.name}
              value={o.t}
              checked={on}
              onChange={() => toggle(o.t)}
              required={field.required && !multi}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            />
            <span aria-hidden="true" style={{
              flexShrink: 0,
              width: 19, height: 19,
              marginTop: 1,
              borderRadius: multi ? 5 : "50%",
              border: `2px solid ${on ? PZ.borde : "rgba(122,158,90,0.5)"}`,
              background: on ? PZ.borde : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 160ms var(--bz-ease)",
            }}>
              {on && (multi
                ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={PZ.fondo} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                : <span style={{ width: 7, height: 7, borderRadius: "50%", background: PZ.fondo }} />)}
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "block", fontSize: 14.5, color: PZ.texto, lineHeight: 1.45 }}>{o.t}</span>
              {o.s && <span style={{ display: "block", fontSize: 12.5, color: "rgba(245,240,232,0.52)", lineHeight: 1.45, marginTop: 3 }}>{o.s}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// ── Campo de formulario ──────────────────────────────────────────
function ParticipaField({ field }) {
  const [focus, setFocus] = useState(false);

  const baseStyle = {
    width: "100%",
    background: PZ.campo,
    border: `1px solid ${focus ? PZ.borde : "rgba(122,158,90,0.45)"}`,
    borderRadius: "var(--bz-radius-md)",
    padding: "13px 16px",
    fontSize: 15,
    fontFamily: "var(--bz-font-body)",
    color: PZ.texto,
    outline: "none",
    transition: "border-color 200ms var(--bz-ease), box-shadow 200ms var(--bz-ease)",
    boxShadow: focus ? "0 0 0 3px rgba(122,158,90,0.16)" : "none",
  };

  const common = {
    id: `pz-${field.name}`,
    name: field.name,
    required: field.required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    placeholder: field.placeholder || "",
  };

  let control;
  if (field.type === "radio" || field.type === "checkbox") {
    control = <OptionGroup field={field} />;
  } else if (field.type === "textarea") {
    control = <textarea {...common} rows={field.rows || 4} style={{ ...baseStyle, resize: "vertical", minHeight: (field.rows || 4) * 26, lineHeight: 1.55 }} />;
  } else if (field.type === "select") {
    control = (
      <div style={{ position: "relative" }}>
        <select {...common} defaultValue="" style={{ ...baseStyle, appearance: "none", WebkitAppearance: "none", paddingRight: 40, cursor: "pointer" }}>
          <option value="" disabled hidden>Seleccioná…</option>
          {field.options.map(o => <option key={o} value={o} style={{ background: PZ.campo, color: PZ.texto }}>{o}</option>)}
        </select>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PZ.borde} strokeWidth="2" style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    );
  } else {
    control = <input {...common} type={field.type} style={baseStyle} />;
  }

  return (
    <div>
      <label style={pzLabel} htmlFor={`pz-${field.name}`}>
        {field.label}{field.required && <span style={{ color: PZ.borde, marginLeft: 4 }}>*</span>}
      </label>
      {control}
      {field.hint && <p style={pzHint}>{field.hint}</p>}
    </div>
  );
}

// ── Una sección del formulario ───────────────────────────────────
function ParticipaSection({ section, last }) {
  return (
    <div style={{ paddingBottom: last ? 0 : 44, marginBottom: last ? 0 : 44, borderBottom: last ? "none" : "1px solid rgba(122,158,90,0.16)" }}>
      <div style={{ marginBottom: 26 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 13, fontWeight: 600, color: PZ.borde, letterSpacing: "0.05em" }}>{section.num}</span>
          <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.42)" }}>{section.label}</span>
        </div>
        {section.title && <h3 className="display" style={{ fontSize: "clamp(22px, 2.6vw, 28px)", color: PZ.texto, lineHeight: 1.15, marginBottom: section.desc ? 8 : 0 }}>{section.title}</h3>}
        {section.desc && <p style={{ fontSize: 14.5, color: "rgba(245,240,232,0.6)", lineHeight: 1.55, maxWidth: 620 }}>{section.desc}</p>}
      </div>

      <div style={{ display: "grid", gap: 22 }}>
        {section.items.map((item, i) => {
          if (item.row) {
            return (
              <div key={i} className="pz-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px 24px" }}>
                {item.row.map(f => <ParticipaField key={f.name} field={f} />)}
              </div>
            );
          }
          return <ParticipaField key={item.name} field={item} />;
        })}
      </div>
    </div>
  );
}

// ── Formulario completo de un tab ────────────────────────────────
function ParticipaForm({ tab }) {
  const schema = FORM_SCHEMAS[tab.id];
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!window.emailjs) { setStatus("error"); return; }

    setStatus("sending");
    try {
      await window.emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        tab.templateId,
        form,
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  // ── Confirmación (fondo #1E3320 · hoja · Playfair Display) ──
  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px", animation: "bz-fade-up 500ms var(--bz-ease) both" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <LeafShape size={80} color={PZ.borde} rotate={-8} />
        </div>
        <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: PZ.texto, lineHeight: 1.25, maxWidth: 560, margin: "0 auto" }}>
          ¡Recibimos tu solicitud! Te contactaremos en los próximos días.
        </h3>
        <button onClick={() => setStatus("idle")} style={{
          marginTop: 34,
          padding: "11px 22px", borderRadius: "var(--bz-radius-pill)",
          border: "1px solid rgba(122,158,90,0.5)", background: "transparent",
          color: PZ.texto, fontSize: 13, fontWeight: 500, cursor: "pointer",
        }}>Enviar otra solicitud</button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit}>
      {/* Meta para la template de EmailJS */}
      <input type="hidden" name="_subject" value={tab.subject} />
      <input type="hidden" name="tipo_participacion" value={tab.label} />

      {/* Nota de la convocatoria */}
      {schema.note && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 14,
          padding: "18px 22px", marginBottom: 44,
          background: "rgba(122,158,90,0.08)",
          borderRadius: "var(--bz-radius-md)",
          border: "1px solid rgba(122,158,90,0.22)",
        }}>
          <div style={{ flexShrink: 0, marginTop: 1 }}><LeafShape size={26} color={PZ.borde} rotate={-6} /></div>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,0.78)", lineHeight: 1.6 }}>{richText(schema.note)}</p>
        </div>
      )}

      <fieldset disabled={sending} style={{ border: "none", margin: 0, padding: 0, minInlineSize: "auto" }}>
        {schema.sections.map((s, i) => (
          <ParticipaSection key={i} section={s} last={i === schema.sections.length - 1} />
        ))}
      </fieldset>

      {/* Nota de cierre */}
      {schema.submitNote && (
        <p style={{ marginTop: 44, padding: "16px 20px", background: "rgba(245,240,232,0.04)", borderRadius: "var(--bz-radius-md)", fontSize: 13.5, color: "rgba(245,240,232,0.62)", lineHeight: 1.6 }}>
          {richText(schema.submitNote)}
        </p>
      )}

      <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <button type="submit" className="pz-submit" disabled={sending} style={{
          display: "inline-flex", alignItems: "center", gap: 11,
          padding: "15px 32px",
          borderRadius: "var(--bz-radius-pill)",
          background: PZ.borde,
          color: PZ.fondo,
          fontSize: 14, fontWeight: 600,
          letterSpacing: "0.08em",
          fontFamily: "var(--bz-font-mono)",
          textTransform: "uppercase",
          opacity: sending ? 0.85 : 1,
          cursor: sending ? "wait" : "pointer",
          transition: "transform 200ms var(--bz-spring), filter 200ms var(--bz-ease)",
        }}
        onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(1.08)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}>
          {sending && <span className="pz-spinner" aria-hidden="true" />}
          {sending ? "Enviando…" : "Enviar solicitud"}
        </button>
        <span style={{ fontSize: 12, color: "rgba(245,240,232,0.5)", fontFamily: "var(--bz-font-mono)" }}>
          * Campos obligatorios
        </span>
      </div>

      {status === "error" && (
        <div role="alert" style={{
          marginTop: 22, display: "flex", alignItems: "flex-start", gap: 12,
          padding: "14px 18px",
          borderRadius: "var(--bz-radius-md)",
          background: "rgba(168,58,46,0.14)",
          border: "1px solid #C0392B",
          animation: "bz-fade-up 350ms var(--bz-ease) both",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5736A" strokeWidth="2.2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16.5v.5" />
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13.5, color: "#E5736A", fontFamily: "var(--bz-font-mono)", lineHeight: 1.5 }}>
              No pudimos enviar tu solicitud. Revisá tu conexión e intentá de nuevo, o escribinos a hola@bioraiz.ar.
            </p>
            <button type="submit" style={{
              marginTop: 10, padding: "8px 18px",
              borderRadius: "var(--bz-radius-pill)",
              border: "1px solid #C0392B", background: "transparent",
              color: "#E5736A", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase",
              fontFamily: "var(--bz-font-mono)", cursor: "pointer",
            }}>Reintentar</button>
          </div>
        </div>
      )}
    </form>
  );
}

// ── Página / Sección ─────────────────────────────────────────────
function PageParticipa({ setPage }) {
  useReveal();
  const [active, setActive] = useState(PARTICIPA_TABS[0].id);
  const tab = PARTICIPA_TABS.find(t => t.id === active);
  const schema = FORM_SCHEMAS[tab.id];

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Sumate · BIORAIZ 2026"
        title={<>Participá del<br />Festival.</>}
        sub="Feriantes, cocineros, artistas, oradores, facilitadores, marcas y prensa: hay un lugar para vos. Elegí cómo querés sumarte y dejanos tus datos."
      />

      <section style={{ background: PZ.fondo, padding: "0 0 120px" }}>
        <div className="container-narrow">
          {/* Selector — todos los botones visibles (grilla que envuelve) */}
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: PZ.label, marginBottom: 16 }}>
              ¿A qué querés postular?
            </p>
            <div className="pz-tabs" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {PARTICIPA_TABS.map(t => {
                const on = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 11,
                      padding: "16px 18px",
                      textAlign: "left",
                      fontSize: 14.5,
                      fontWeight: on ? 600 : 500,
                      fontFamily: "var(--bz-font-body)",
                      color: on ? PZ.texto : "rgba(245,240,232,0.6)",
                      background: on ? "rgba(122,158,90,0.14)" : PZ.campo,
                      border: `1.5px solid ${on ? PZ.borde : "rgba(122,158,90,0.26)"}`,
                      borderRadius: "var(--bz-radius-md)",
                      cursor: "pointer",
                      transition: "color 180ms var(--bz-ease), background 180ms var(--bz-ease), border-color 180ms var(--bz-ease)",
                    }}
                    onMouseEnter={e => { if (!on) { e.currentTarget.style.color = PZ.texto; e.currentTarget.style.borderColor = "rgba(122,158,90,0.5)"; } }}
                    onMouseLeave={e => { if (!on) { e.currentTarget.style.color = "rgba(245,240,232,0.6)"; e.currentTarget.style.borderColor = "rgba(122,158,90,0.26)"; } }}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{t.emoji}</span>
                    <span style={{ lineHeight: 1.25 }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div key={active} style={{ paddingTop: 48, animation: "bz-fade-up 450ms var(--bz-ease) both" }}>
            <div style={{ marginBottom: 40, maxWidth: 640 }}>
              <h2 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: PZ.texto, marginBottom: 14, lineHeight: 1.1 }}>
                <span style={{ marginRight: 12 }}>{tab.emoji}</span>{tab.label}
              </h2>
              <p style={{ fontSize: 16, color: "rgba(245,240,232,0.68)", lineHeight: 1.6, marginBottom: schema.pills ? 20 : 0 }}>{tab.intro}</p>
              {schema.pills && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {schema.pills.map(p => (
                    <span key={p} style={{
                      padding: "6px 14px",
                      borderRadius: "var(--bz-radius-pill)",
                      border: "1px solid rgba(122,158,90,0.35)",
                      background: "rgba(122,158,90,0.08)",
                      fontSize: 12, fontWeight: 500,
                      fontFamily: "var(--bz-font-mono)",
                      letterSpacing: "0.03em",
                      color: PZ.label,
                    }}>{p}</span>
                  ))}
                </div>
              )}
            </div>

            <ParticipaForm tab={tab} />
          </div>
        </div>
      </section>

      <style>{`
        .pz-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(30,51,32,0.35);
          border-top-color: ${PZ.fondo};
          border-radius: 50%;
          display: inline-block;
          animation: pz-spin 0.7s linear infinite;
        }
        @keyframes pz-spin { to { transform: rotate(360deg); } }
        select[id^="pz-"]:invalid { color: rgba(245,240,232,0.45); }
        textarea::placeholder, input::placeholder { color: rgba(245,240,232,0.38); }
        @media (max-width: 640px) {
          .pz-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

window.PageParticipa = PageParticipa;
