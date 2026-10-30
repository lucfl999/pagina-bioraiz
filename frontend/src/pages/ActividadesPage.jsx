import { useState } from 'react';
import { LeafShape, SubPageHeader, useReveal } from '../components/shared.jsx';
import { ACTIVITIES_SCHEDULE } from '../data.js';
import { submitActivityRegistration } from '../services/api.js';

const ACTIVITY_CHANNELS = ["Instagram", "Un amigo", "Un sponsor", "Radio o prensa", "Otro"];

const PZ = {
  fondo: "#1E3320",
  campo: "#2C2418",
  borde: "#7A9E5A",
  texto: "#F5F0E8",
  label: "#C8B87A",
};

const fieldLabel = {
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

const fieldStyle = {
  width: "100%",
  background: PZ.campo,
  border: "1px solid rgba(122,158,90,0.45)",
  borderRadius: "var(--bz-radius-md)",
  padding: "13px 16px",
  fontSize: 15,
  fontFamily: "var(--bz-font-body)",
  color: PZ.texto,
  outline: "none",
};

function ActivitySection({ number, label, title, description, last = false, children }) {
  return (
    <section style={{
      paddingBottom: last ? 0 : 44,
      marginBottom: last ? 0 : 44,
      borderBottom: last ? "none" : "1px solid rgba(122,158,90,0.16)",
    }}>
      <div style={{ marginBottom: 26 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 13, fontWeight: 600, color: PZ.borde }}>{number}</span>
          <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.42)" }}>{label}</span>
        </div>
        <h2 className="display" style={{ fontSize: "clamp(22px, 2.6vw, 28px)", color: PZ.texto, lineHeight: 1.15, marginBottom: description ? 8 : 0 }}>{title}</h2>
        {description && <p style={{ fontSize: 14.5, color: "rgba(245,240,232,0.6)", lineHeight: 1.55, maxWidth: 620 }}>{description}</p>}
      </div>
      <div style={{ display: "grid", gap: 22 }}>{children}</div>
    </section>
  );
}

function ActivityOption({ checked, onChange, name, value, round = false, required = false, children }) {
  return (
    <label style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "13px 16px",
      borderRadius: "var(--bz-radius-md)",
      background: checked ? "rgba(122,158,90,0.12)" : PZ.campo,
      border: `1px solid ${checked ? PZ.borde : "rgba(122,158,90,0.28)"}`,
      cursor: "pointer",
      transition: "background 160ms var(--bz-ease), border-color 160ms var(--bz-ease)",
    }}>
      <input
        type={round ? "radio" : "checkbox"}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
      />
      <span aria-hidden="true" style={{
        flexShrink: 0,
        width: 19,
        height: 19,
        borderRadius: round ? "50%" : 5,
        border: `2px solid ${checked ? PZ.borde : "rgba(122,158,90,0.5)"}`,
        background: checked ? PZ.borde : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {checked && (round
          ? <span style={{ width: 7, height: 7, borderRadius: "50%", background: PZ.fondo }} />
          : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={PZ.fondo} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>)}
      </span>
      {children}
    </label>
  );
}

function ActividadesForm() {
  const [selected, setSelected] = useState([]);
  const [channel, setChannel] = useState("");
  const [consent, setConsent] = useState(false);
  const [contact, setContact] = useState({ nombre: "", whatsapp: "", email: "", salud: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const toggleActivity = (activity) => {
    setSelected(current => current.includes(activity)
      ? current.filter(item => item !== activity)
      : [...current, activity]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selected.length === 0) {
      setError("Elegí al menos una actividad.");
      return;
    }
    if (!channel) {
      setError("Contanos cómo te enteraste de BIORAIZ.");
      return;
    }
    if (!consent) {
      setError("Necesitamos que aceptes el consentimiento para inscribirte.");
      return;
    }
    setError("");
    setStatus("sending");

    try {
      await submitActivityRegistration({
        ...contact,
        actividades: selected,
        canal: channel,
        consentimiento: consent,
      });
      setStatus("sent");
    } catch (requestError) {
      console.error("Activity registration form error:", requestError);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setSelected([]);
    setChannel("");
    setConsent(false);
    setContact({ nombre: "", whatsapp: "", email: "", salud: "" });
    setError("");
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div role="status" style={{ textAlign: "center", padding: "80px 24px", animation: "bz-fade-up 500ms var(--bz-ease) both" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <LeafShape size={80} color={PZ.borde} rotate={-8} />
        </div>
        <h2 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: PZ.texto, lineHeight: 1.25, maxWidth: 620, margin: "0 auto" }}>
          ¡Listo! Recibimos tu inscripción y enviamos la confirmación a {contact.email}.
        </h2>
        <button type="button" onClick={resetForm} style={{ marginTop: 34, padding: "11px 22px", borderRadius: "var(--bz-radius-pill)", border: "1px solid rgba(122,158,90,0.5)", background: "transparent", color: PZ.texto, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          Hacer otra inscripción
        </button>
      </div>
    );
  }

  const inputStyle = { ...fieldStyle, boxSizing: "border-box" };
  const selectedCount = selected.length;

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={status === "sending"} style={{ border: "none", margin: 0, padding: 0, minInlineSize: "auto" }}>
        <ActivitySection number="01" label="Datos de contacto" title="¿Quién se anota?">
          <div>
            <label style={fieldLabel} htmlFor="activity-name">Nombre y apellido<span style={{ color: PZ.borde, marginLeft: 4 }}>*</span></label>
            <input id="activity-name" name="nombre" autoComplete="name" required maxLength={120} value={contact.nombre} onChange={(event) => setContact({ ...contact, nombre: event.target.value })} style={inputStyle} />
          </div>
          <div className="activity-contact-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "22px 24px" }}>
            <div>
              <label style={fieldLabel} htmlFor="activity-whatsapp">WhatsApp<span style={{ color: PZ.borde, marginLeft: 4 }}>*</span></label>
              <input id="activity-whatsapp" name="whatsapp" type="tel" autoComplete="tel" required maxLength={40} placeholder="+54 9 299 …" value={contact.whatsapp} onChange={(event) => setContact({ ...contact, whatsapp: event.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={fieldLabel} htmlFor="activity-email">Email<span style={{ color: PZ.borde, marginLeft: 4 }}>*</span></label>
              <input id="activity-email" name="email" type="email" autoComplete="email" required maxLength={254} value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} style={inputStyle} />
            </div>
          </div>
        </ActivitySection>

        <ActivitySection number="02" label="La inscripción" title="¿A qué actividades te querés anotar?" description="Podés elegir varias.">
          {ACTIVITIES_SCHEDULE.map((day) => (
            <div key={day.day}>
              <h3 className="display" style={{ fontSize: 20, color: PZ.texto, marginBottom: 12 }}>{day.day}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 9 }}>
                {day.activities.map((activity) => {
                  const value = `${day.day} · ${activity.time} · ${activity.name}`;
                  const checked = selected.includes(value);
                  return (
                    <ActivityOption key={value} name="actividad" value={value} checked={checked} onChange={() => toggleActivity(value)}>
                      <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 12.5, color: PZ.label, minWidth: 92, flexShrink: 0 }}>{activity.time}</span>
                      <span style={{ fontSize: 14.5, color: PZ.texto, lineHeight: 1.4 }}>{activity.name}</span>
                    </ActivityOption>
                  );
                })}
              </div>
            </div>
          ))}
          <div>
            <label style={fieldLabel} htmlFor="activity-health">¿Tenés alguna lesión, embarazo o condición que el instructor deba saber?</label>
            <textarea id="activity-health" name="salud" rows={3} maxLength={1000} value={contact.salud} onChange={(event) => setContact({ ...contact, salud: event.target.value })} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }} />
            <p style={{ fontSize: 12.5, color: "rgba(245,240,232,0.5)", lineHeight: 1.5, marginTop: 8 }}>Opcional. Para yoga, pilates y biodanza es clave.</p>
          </div>
        </ActivitySection>

        <ActivitySection number="03" label="Para cerrar" title="Un último paso" last>
          <div>
            <span style={fieldLabel}>¿Cómo te enteraste de BIORAIZ?<span style={{ color: PZ.borde, marginLeft: 4 }}>*</span></span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))", gap: 9 }}>
              {ACTIVITY_CHANNELS.map((option, index) => (
                <ActivityOption key={option} round name="canal" value={option} checked={channel === option} required={index === 0} onChange={() => setChannel(option)}>
                  <span style={{ fontSize: 14.5, color: PZ.texto }}>{option}</span>
                </ActivityOption>
              ))}
            </div>
          </div>
          <ActivityOption name="consentimiento" value="si" checked={consent} onChange={() => setConsent(value => !value)}>
            <span style={{ fontSize: 14.5, color: PZ.texto, lineHeight: 1.45 }}>Participo bajo mi responsabilidad y acepto recibir información de BIORAIZ por WhatsApp o email.</span>
          </ActivityOption>
        </ActivitySection>
      </fieldset>

      <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <button type="submit" disabled={status === "sending"} style={{
          padding: "15px 32px",
          borderRadius: "var(--bz-radius-pill)",
          background: PZ.borde,
          color: PZ.fondo,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.08em",
          fontFamily: "var(--bz-font-mono)",
          textTransform: "uppercase",
          cursor: status === "sending" ? "wait" : "pointer",
          border: "none",
          opacity: status === "sending" ? 0.8 : 1,
        }}>
          {status === "sending" ? "Enviando…" : "Inscribirme"}
        </button>
        <span style={{ fontSize: 12, color: "rgba(245,240,232,0.5)", fontFamily: "var(--bz-font-mono)" }}>
          * Campos obligatorios{selectedCount > 0 && ` · ${selectedCount} actividad${selectedCount === 1 ? "" : "es"} elegida${selectedCount === 1 ? "" : "s"}`}
        </span>
      </div>

      {(error || status === "error") && (
        <p role="alert" style={{ marginTop: 18, padding: "12px 16px", borderRadius: "var(--bz-radius-md)", background: "rgba(168,58,46,0.14)", border: "1px solid #C0392B", fontSize: 13.5, color: "#E5736A", fontFamily: "var(--bz-font-mono)" }}>
          {error || "No pudimos enviar tu inscripción. Intentá de nuevo o escribinos a hola@bioraiz.net."}
        </p>
      )}

      <style>{`
        input:focus, textarea:focus { border-color: ${PZ.borde} !important; box-shadow: 0 0 0 3px rgba(122,158,90,0.16); }
        input::placeholder { color: rgba(245,240,232,0.35); }
      `}</style>
    </form>
  );
}

export default function ActividadesPage() {
  useReveal();

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Actividades · BIORAIZ 2026"
        title={<>Anotate a<br />las clases.</>}
        sub="Yoga, pilates, biodanza, terapias de sonido y más. Elegí tus actividades y reservá tu lugar."
      />
      <section style={{ background: PZ.fondo, padding: "48px 0 120px" }}>
        <div className="container-narrow">
          <ActividadesForm />
        </div>
      </section>
    </div>
  );
}
