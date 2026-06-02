import { useState } from 'react';
import { BzLogo, IconInstagram, IconFacebook } from './shared.jsx';
import { NAV_LINKS, ECO_PHRASES, BZ_DATE_FULL, BZ_LOCATION, BZ_EMAIL, BZ_WHATSAPP_LABEL, BZ_WHATSAPP_LINK, BZ_INSTAGRAM, BZ_FACEBOOK } from '../data.js';

export default function Footer({ setPage }) {
  const [eco] = useState(() => ECO_PHRASES[Math.floor(Math.random() * ECO_PHRASES.length)]);

  const colTitle = { fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--bz-ocre-calido)", marginBottom: 16, fontFamily: "var(--bz-font-mono)" };
  const colLink = { display: "block", padding: "5px 0", fontSize: 14, color: "rgba(242, 239, 230, 0.78)", transition: "color 200ms var(--bz-ease)", cursor: "pointer" };

  return (
    <footer style={{ background: "var(--bz-fondo-dark)", color: "var(--bz-crema-texto)", marginTop: 80 }}>
      <div className="container" style={{ padding: "72px 32px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }} className="bz-footer-grid">
          <div>
            <BzLogo size={28} color="var(--bz-beige-hueso)" />
            <p style={{ marginTop: 20, fontFamily: "var(--bz-font-display)", fontStyle: "italic", fontSize: 18, lineHeight: 1.45, color: "var(--bz-verde-claro)" }}>
              Donde la tierra<br />florece y la comunidad crece.
            </p>
            <p style={{ marginTop: 24, fontSize: 13, color: "rgba(242, 239, 230, 0.65)", lineHeight: 1.7 }}>
              {BZ_DATE_FULL}<br />{BZ_LOCATION}
            </p>
          </div>

          <div>
            <div style={colTitle}>Navegar</div>
            {NAV_LINKS.slice(1).map(l => (
              <a key={l.id} style={colLink} onClick={e => { e.preventDefault(); setPage(l.id); }} href="#"
                 onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
                 onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>{l.label}</a>
            ))}
          </div>

          <div>
            <div style={colTitle}>Comunidad</div>
            <a href="#" style={colLink} onClick={e => { e.preventDefault(); setPage("participa"); }}
               onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
               onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>Postulate como expositor</a>
            <a href="#" style={colLink} onClick={e => { e.preventDefault(); setPage("participa"); }}
               onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
               onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>Voluntariado</a>
            <a href="#" style={colLink} onClick={e => { e.preventDefault(); setPage("feria"); }}
               onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
               onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>Sustentabilidad</a>
          </div>

          <div>
            <div style={colTitle}>Contacto</div>
            <a href={`mailto:${BZ_EMAIL}`} style={colLink}
               onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
               onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>{BZ_EMAIL}</a>
            <a href={BZ_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={colLink}
               onMouseEnter={e => e.target.style.color = "var(--bz-ocre-calido)"}
               onMouseLeave={e => e.target.style.color = "rgba(242, 239, 230, 0.78)"}>WhatsApp {BZ_WHATSAPP_LABEL}</a>
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              {[
                { label: "Instagram", href: BZ_INSTAGRAM, Icon: IconInstagram },
                { label: "Facebook",  href: BZ_FACEBOOK,  Icon: IconFacebook },
              ].map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(242, 239, 230, 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--bz-crema-texto)",
                  transition: "all 200ms var(--bz-ease)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--bz-ocre-calido)"; e.currentTarget.style.color = "var(--bz-verde-profundo)"; e.currentTarget.style.borderColor = "var(--bz-ocre-calido)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--bz-crema-texto)"; e.currentTarget.style.borderColor = "rgba(242, 239, 230, 0.2)"; }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "0.5px solid rgba(242, 239, 230, 0.15)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap",
          fontSize: 12, color: "rgba(242, 239, 230, 0.5)", fontFamily: "var(--bz-font-mono)",
        }}>
          <div>🌱 {eco}</div>
          <div>© 2026 BIORAIZ · Neuquén, Argentina</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bz-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 520px) {
          .bz-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
