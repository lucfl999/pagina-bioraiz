import { useEffect, useState } from 'react';
import { LeafShape, IconInstagram } from './shared.jsx';
import api from '../services/api.js';

// Fallback con datos de ejemplo si Instagram API falla
const FALLBACK_REELS = [
  {
    id: "fallback_1",
    thumbnail: "https://images.unsplash.com/photo-1609599810694-b8deed3b3ebe?w=400&h=500&fit=crop",
    permalink: "https://instagram.com/bioraiz.nqn",
    caption: "Así empieza nuestro viaje: con raíces que tocan tierra.",
  },
  {
    id: "fallback_2",
    thumbnail: "https://images.unsplash.com/photo-1577720643272-265f434a3f1d?w=400&h=500&fit=crop",
    permalink: "https://instagram.com/bioraiz.nqn",
    caption: "La cocina abierta es el corazón de BIORAIZ.",
  },
  {
    id: "fallback_3",
    thumbnail: "https://images.unsplash.com/photo-1542059749-1a574759b721?w=400&h=500&fit=crop",
    permalink: "https://instagram.com/bioraiz.nqn",
    caption: "Cada stand cuenta una historia de origen y cuidado.",
  },
];

export default function InstagramReels() {
  const [reels, setReels] = useState(FALLBACK_REELS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reels desde la API
  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/instagram/reels');
        const data = response.data;
        
        // Verificar que hay datos
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setReels(data.data);
          console.log(`✅ Instagram Reels cargados: ${data.data.length} posts`);
        } else {
          console.warn('⚠️ Sin datos de Instagram, usando fallback');
          setReels(FALLBACK_REELS);
        }
      } catch (err) {
        console.error('Error fetching Instagram reels:', err);
        setError(err.message);
        setReels(FALLBACK_REELS);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
    
    // Revalidar cada 1 minuto (tiempo real)
    const interval = setInterval(fetchReels, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--bz-fondo-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hojas decorativas */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "2%",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      >
        <LeafShape size={240} color="var(--bz-verde-musgo)" rotate={-15} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "1%",
          opacity: 0.14,
          pointerEvents: "none",
        }}
      >
        <LeafShape size={220} color="var(--bz-ocre-tostado)" rotate={165} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="bz-insta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: 72,
            alignItems: "center",
          }}
        >
          {/* Columna izquierda: voz personal */}
          <VoiceColumn />

          {/* Columna derecha: collage polaroid */}
          <CollageColumn reels={reels.slice(0, 3)} loading={loading} error={error} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .bz-insta-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .bz-insta-collage {
            flex-wrap: wrap !important;
            gap: 24px !important;
          }
          .bz-insta-card {
            margin-left: 0 !important;
            margin-top: 0 !important;
          }
        }

        @media (max-width: 640px) {
          .bz-insta-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .bz-insta-collage {
            flex-direction: column !important;
            align-items: center !important;
            gap: 28px !important;
          }
          .bz-insta-card {
            width: 214px !important;
            min-width: 214px !important;
            margin-left: 0 !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

function VoiceColumn() {
  return (
    <div>
      <div className="eyebrow reveal" style={{ marginBottom: 18 }}>
        Desde nuestro feed
      </div>
      <h2
        className="display reveal reveal-delay-1"
        style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          color: "var(--bz-texto-primario)",
          marginBottom: 24,
          lineHeight: 1.1,
        }}
      >
        Así se vive <em>BIORAIZ.</em>
      </h2>
      <p
        className="reveal reveal-delay-2"
        style={{
          fontSize: 16,
          color: "var(--bz-texto-secundario)",
          lineHeight: 1.7,
          maxWidth: 420,
          marginBottom: 40,
        }}
      >
        La magia sucede cuando el origen se encuentra con la comunidad. Cada
        momento, capturado para compartir el espíritu de lo que nace en
        nuestras manos.
      </p>

      <a
        href="https://instagram.com/bioraiz.nqn"
        target="_blank"
        rel="noopener noreferrer"
        className="reveal reveal-delay-3"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          transition: "all 300ms var(--bz-ease)",
        }}
        onMouseEnter={(e) => {
          const arrow = e.currentTarget.querySelector(".insta-arrow");
          if (arrow) arrow.style.transform = "translateX(4px)";
        }}
        onMouseLeave={(e) => {
          const arrow = e.currentTarget.querySelector(".insta-arrow");
          if (arrow) arrow.style.transform = "translateX(0)";
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "var(--bz-ocre-calido)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconInstagram size={22} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--bz-font-display)",
              fontSize: 24,
              color: "var(--bz-texto-primario)",
              fontStyle: "italic",
            }}
          >
            @bioraiz.nqn
          </span>
          <span
            className="insta-arrow"
            style={{
              transition: "transform 300ms var(--bz-ease)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            →
          </span>
        </div>
      </a>
    </div>
  );
}

function CollageColumn({ reels, loading, error }) {
  return (
    <div
      className="bz-insta-collage"
      style={{
        display: "flex",
        position: "relative",
        height: "fit-content",
      }}
    >
      {loading && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <p style={{ color: "var(--bz-texto-secundario)" }}>Cargando...</p>
        </div>
      )}
      {!loading && error && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <p style={{ color: "var(--bz-tierra-rojo)", fontSize: 12 }}>⚠️ {error}</p>
        </div>
      )}
      {!loading && reels.map((reel, i) => (
        <PolaroidCard key={reel.id} reel={reel} index={i} />
      ))}
    </div>
  );
}

function PolaroidCard({ reel, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const rotations = [-3.5, 2.5, -1.5];
  const verticalOffsets = [0, 56, 18];
  const horizontalOffsets = [0, -26, -26];

  const rotation = rotations[index] || 0;
  const verticalOffset = verticalOffsets[index] || 0;
  const horizontalOffset = horizontalOffsets[index] || 0;
  const zIndex = index + 10;

  return (
    <a
      href={reel.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="bz-insta-card reveal in"
      style={{
        width: 240,
        minWidth: 240,
        background: "var(--bz-beige-hueso)",
        padding: "12px",
        paddingBottom: 16,
        borderRadius: "var(--bz-radius-lg)",
        border: "0.5px solid var(--bz-borde-ligero)",
        boxShadow: "var(--bz-shadow-md)",
        textDecoration: "none",
        color: "inherit",
        opacity: 1,
        transform: `rotate(${rotation}deg) translateX(${horizontalOffset}px) translateY(${verticalOffset}px) ${
          isHovered ? "rotate(0deg) translateY(-10px) scale(1.025)" : "scale(1)"
        }`,
        transformOrigin: "center",
        transition: "all 400ms var(--bz-ease)",
        transitionDelay: `${index * 120}ms`,
        zIndex: isHovered ? zIndex + 100 : zIndex,
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "9 / 16",
          overflow: "hidden",
          borderRadius: "calc(var(--bz-radius-lg) - 6px)",
          background: "var(--bz-borde-suave)",
          marginBottom: 12,
        }}
      >
        <img
          src={reel.thumbnail}
          alt={reel.caption}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Play button solo para videos */}
        {(reel.media_type === 'VIDEO' || reel.media_type === 'REELS') && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "var(--bz-ocre-calido)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: isHovered ? "scale(1)" : "scale(0.82)",
                opacity: isHovered ? 1 : 0.92,
                transition: "all 400ms var(--bz-ease)",
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="var(--bz-verde-profundo)"
                style={{ marginLeft: 2 }}
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <p
        style={{
          fontFamily: "var(--bz-font-display)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--bz-texto-secundario)",
          lineHeight: 1.5,
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {reel.caption}
      </p>
    </a>
  );
}
