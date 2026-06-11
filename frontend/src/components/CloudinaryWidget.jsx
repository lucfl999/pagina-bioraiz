import React, { useEffect, useState } from 'react';

export function CloudinaryWidget({ field, onImageUpload, fileName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState(fileName || '');

  useEffect(() => {
    // Cargar script de Cloudinary
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/latest/index.js';
      script.async = true;
      script.onload = () => {
        console.log('Cloudinary upload widget loaded');
      };
      document.body.appendChild(script);
    }
  }, []);

  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      alert('El widget de Cloudinary aún está cargando. Por favor, intenta nuevamente.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dfge6bxvb', // Tu cloud name
        uploadPreset: 'bioraiz_unsigned', // Deberá existir en Cloudinary
        multiple: false,
        clientAllowedFormats: ['image/png', 'image/jpeg', 'image/jpg'],
        maxFileSize: 5000000, // 5MB
        maxImageWidth: 3000,
        maxImageHeight: 3000,
        folder: 'bioraiz-participaciones', // Carpeta en Cloudinary
        showAdvancedOptions: false,
        cropping: false,
        sources: ['local', 'url', 'camera'],
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A28D',
            tabIcon: '#6E9050',
            menuIcons: '#6E9050',
            textDark: '#2A3D24',
            textLight: '#6E9050',
            link: '#6E9050',
            action: '#6E9050',
            inactiveTabIcon: '#B3C4A3',
            error: '#F76D59',
            inProgress: '#4A90E2',
            complete: '#20B44B',
            sourceBg: '#F5F0E8',
          },
          fonts: {
            default: null,
            "'Helvetica Neue', 'Helvetica', sans-serif": {
              url: null,
              active: true,
            },
          },
        },
      },
      (error, result) => {
        if (error) {
          console.error('Error en upload:', error);
          alert('Error al subir imagen: ' + error.message);
          setIsLoading(false);
          return;
        }

        if (result.event === 'success') {
          const imageUrl = result.info.secure_url;
          const imageName = result.info.original_filename || 'Imagen subida';
          setDisplayName(imageName);
          setIsLoading(false);
          onImageUpload(imageUrl, imageName);
          console.log('Imagen subida exitosamente:', imageUrl);
        }

        if (result.event === 'queued') {
          setIsLoading(true);
        }
      }
    );

    widget.open();
  };

  const PZ = {
    borde: '#7A9E5A',
    texto: '#F5F0E8',
    campo: '#2A3D24',
  };

  return (
    <div>
      <button
        type="button"
        onClick={openCloudinaryWidget}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: '22px 16px',
          borderRadius: 'var(--bz-radius-md)',
          border: `2px dashed ${PZ.borde}`,
          background: 'rgba(122,158,90,0.05)',
          cursor: isLoading ? 'wait' : 'pointer',
          transition: 'all 200ms var(--bz-ease)',
          width: '100%',
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(245,240,232,0.68)',
          opacity: isLoading ? 0.7 : 1,
        }}
        disabled={isLoading}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.target.style.borderColor = PZ.borde;
            e.target.style.background = 'rgba(122,158,90,0.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(122,158,90,0.35)';
          e.target.style.background = 'rgba(122,158,90,0.05)';
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={PZ.borde}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>{isLoading ? 'Subiendo...' : displayName || 'Subir imagen (PNG/JPG)'}</span>
      </button>
    </div>
  );
}

export default CloudinaryWidget;
