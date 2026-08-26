import { useState, useEffect } from 'react';
import { BzLogo } from './shared.jsx';
import { NAV_LINKS } from '../data.js';

export default function Header({ page, setPage, transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [page]);

  const isLight = !transparent || scrolled;

  const headerStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    transition: "background 300ms var(--bz-ease), border-color 300ms var(--bz-ease), padding 300ms var(--bz-ease)",
    background: isLight ? "rgba(250, 246, 237, 0.86)" : "transparent",
    backdropFilter: isLight ? "blur(10px) saturate(140%)" : "none",
    WebkitBackdropFilter: isLight ? "blur(10px) saturate(140%)" : "none",
    borderBottom: isLight ? "0.5px solid var(--bz-borde-ligero)" : "0.5px solid transparent",
    padding: scrolled ? "12px 0" : "20px 0",
  };

  return (
    <header style={headerStyle}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center" }}>
          <BzLogo size={26} color={!isLight ? "var(--bz-beige-hueso)" : undefined} />
        </button>

        <nav className="bz-nav-desktop" style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              style={{
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: !isLight ? "var(--bz-beige-hueso)" : (page === link.id ? "var(--bz-verde-profundo)" : "var(--bz-texto-secundario)"),
                borderRadius: "var(--bz-radius-pill)",
                position: "relative",
                transition: "color 200ms var(--bz-ease)",
              }}
            >
              {link.label}
              {page === link.id && (
                <span style={{
                  position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%",
                  background: !isLight ? "var(--bz-ocre-calido)" : "var(--bz-tierra-rojo)",
                }} />
              )}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className="bz-burger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menú"
            style={{
              display: "none", width: 36, height: 36, alignItems: "center", justifyContent: "center",
              borderRadius: "50%", color: !isLight ? "var(--bz-beige-hueso)" : "var(--bz-verde-profundo)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <><path d="M6 6l12 12"/><path d="M18 6l-12 12"/></> : <><path d="M3 7h18"/><path d="M3 17h18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          background: "var(--bz-beige-hueso)",
          borderTop: "0.5px solid var(--bz-borde-ligero)",
          padding: "16px 0",
          animation: "bz-slide-down 240ms var(--bz-ease)",
        }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                style={{
                  padding: "12px 8px",
                  fontSize: 16,
                  textAlign: "left",
                  color: page === link.id ? "var(--bz-verde-profundo)" : "var(--bz-texto-secundario)",
                  fontWeight: page === link.id ? 600 : 400,
                  borderBottom: "0.5px solid var(--bz-borde-ligero)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .bz-nav-desktop { display: none !important; }
          .bz-cta-desktop { display: none !important; }
          .bz-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
