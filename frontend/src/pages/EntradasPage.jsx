import { useState } from 'react';
import { useReveal, SectionHead, SubPageHeader, TicketCard, FaqItem } from '../components/shared.jsx';
import { TICKETS, FAQ } from '../data.js';

export default function EntradasPage({ setPage }) {
  useReveal();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Entradas · BIORAIZ 2026"
        title={<>Tu lugar.</>}
        sub="3 tipos de entrada. Hasta 3 cuotas sin interés con tarjetas seleccionadas."
      />

      <section style={{ padding: "60px 0 80px", background: "var(--bz-fondo-base)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }} className="bz-tickets-grid">
            {TICKETS.map((t, i) => (
              <TicketCard key={t.id} ticket={t} index={i} />
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .bz-tickets-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <section style={{ padding: "32px 0 100px", background: "var(--bz-fondo-base)" }}>
        <div className="container-narrow">
          <div className="reveal" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, padding: "28px 40px", background: "var(--bz-beige-hueso)", border: "0.5px solid var(--bz-borde-ligero)", borderRadius: "var(--bz-radius-lg)", flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, color: "var(--bz-texto-terciario)", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--bz-font-mono)" }}>Pagás con</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {["Visa", "Mastercard", "Amex", "Mercado Pago", "Modo", "Transferencia"].map(m => (
                <span key={m} style={{ padding: "6px 14px", background: "var(--bz-fondo-base)", borderRadius: "var(--bz-radius-pill)", fontSize: 12, color: "var(--bz-texto-secundario)", fontWeight: 500 }}>{m}</span>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--bz-verde-musgo)", fontFamily: "var(--bz-font-mono)", letterSpacing: "0.04em" }}>· hasta 3 cuotas s/interés</div>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0 120px", background: "var(--bz-fondo-alt)" }}>
        <div className="container-narrow">
          <SectionHead
            eyebrow="Preguntas frecuentes"
            title={<>Lo que <em>siempre</em> nos preguntan.</>}
            sub="Si tu duda no está acá, escribinos a hola@bioraiz.net. Respondemos en menos de 48 hs."
          />
          <div style={{ marginTop: 56 }}>
            {FAQ.map((item, i) => (
              <FaqItem key={i} item={item} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: "var(--bz-fondo-base)" }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 18 }}>¿Te quedaste con dudas?</div>
            <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 18, color: "var(--bz-texto-primario)", lineHeight: 1.15 }}>
              Escribinos directamente.
            </h3>
            <p style={{ fontSize: 15, color: "var(--bz-texto-secundario)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Atendemos personas, no formularios. Te responde alguien del equipo en menos de 48 hs.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:hola@bioraiz.net" className="btn btn-primary">hola@bioraiz.net</a>
              <a href="https://wa.me/5492995781006" className="btn btn-secondary">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
