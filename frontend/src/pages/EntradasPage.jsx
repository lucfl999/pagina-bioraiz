import { useState, useRef, useEffect } from 'react';
import { useReveal, SectionHead, SubPageHeader, FaqItem } from '../components/shared.jsx';
import { TICKETS, FAQ, BZ_EMAIL, BZ_WHATSAPP_LINK, VENTA_ACTIVA } from '../data.js';
import { subscribeNewsletter, createTicketPreference } from '../services/api.js';

// ─── Compresión de foto a 200x200 con canvas ─────────────────────────────────
function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Solo se aceptan imágenes (JPG, PNG, WEBP)'));
    }
    if (file.size > 5 * 1024 * 1024) {
      return reject(new Error('La imagen debe ser menor a 5 MB'));
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 200, 200);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        0.85
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo cargar la imagen')); };
    img.src = url;
  });
}

function fmtARS(n) {
  return '$ ' + Number(n).toLocaleString('es-AR');
}

// ─── Modal de Términos y Condiciones ─────────────────────────────────────────
function TermsModal({ onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Términos y condiciones"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        background: 'rgba(10,20,10,0.85)',
        backdropFilter: 'blur(6px)',
        animation: 'bz-fade-in 250ms ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#1E3320',
        border: '1px solid #7A9E5A',
        borderRadius: 16,
        maxWidth: 560,
        width: '100%',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        animation: 'bz-modal-in 300ms cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div style={{ padding: '24px 28px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(122,158,90,0.3)' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A9E5A', fontFamily: 'var(--bz-font-mono)', marginBottom: 6 }}>BIORAIZ · Ley 25.326</div>
            <h3 style={{ color: '#FAF6ED', fontFamily: 'var(--bz-font-display)', fontSize: 20, fontWeight: 400, margin: 0 }}>Términos y Condiciones</h3>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', color: '#FAF6ED', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ padding: '24px 28px', overflowY: 'auto', color: '#C8D8C0', fontSize: 14, lineHeight: 1.75 }}>
          <p style={{ marginBottom: 16 }}>
            Al completar la compra, el titular de los datos personales presta conformidad para que <strong style={{ color: '#FAF6ED' }}>BIORAIZ</strong> utilice su información (nombre, DNI, fotografía y datos de contacto) con los siguientes fines:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Identificación y acreditación en el evento mediante sistema biométrico de control de acceso.</li>
            <li style={{ marginBottom: 8 }}>Emisión y validación de tickets personales e intransferibles.</li>
            <li style={{ marginBottom: 8 }}>Comunicaciones vinculadas al evento (cambios de fecha, novedades, instrucciones de ingreso).</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            La fotografía aportada será utilizada <strong style={{ color: '#FAF6ED' }}>únicamente</strong> para el sistema de acreditación biométrica del evento y no será compartida con terceros ni utilizada con fines comerciales.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong style={{ color: '#FAF6ED' }}>Autorización de imagen:</strong> el comprador autoriza expresamente el registro fotográfico y/o audiovisual de su imagen durante el evento para materiales de difusión y comunicación de BIORAIZ en medios digitales y/o impresos.
          </p>
          <p style={{ marginBottom: 16 }}>
            De conformidad con la <strong style={{ color: '#FAF6ED' }}>Ley N° 25.326 de Protección de Datos Personales</strong>, el titular podrá ejercer los derechos de acceso, rectificación y supresión de sus datos comunicándose a <a href="mailto:hola@bioraiz.net" style={{ color: '#7A9E5A' }}>hola@bioraiz.net</a>.
          </p>
          <p style={{ fontSize: 12, color: '#7A8A6A' }}>
            Las entradas son personales e intransferibles. El acceso al evento requiere presentación del ticket (impreso o digital) junto al DNI. BIORAIZ se reserva el derecho de admisión.
          </p>
        </div>
        <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(122,158,90,0.3)' }}>
          <button onClick={onClose} style={{
            width: '100%', padding: '14px', borderRadius: 100,
            background: '#7A9E5A', border: 'none', color: '#1E3320',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            transition: 'opacity 200ms',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal de Compra ──────────────────────────────────────────────────────────
function PurchaseModal({ ticket, onClose }) {
  const [dias, setDias] = useState('1');
  const [diaEspecifico, setDiaEspecifico] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoError, setFotoError] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const fotoInputRef = useRef(null);

  const precio = dias === '3' ? ticket.precioNum * 2 : ticket.precioNum;

  const isFormValid =
    nombre.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    telefono.trim().length >= 6 &&
    dni.trim().length >= 7 &&
    foto !== null &&
    (dias === '3' || diaEspecifico !== '') &&
    terminos;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        return value.trim().length >= 3 ? '' : 'Ingresá tu nombre completo';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email inválido';
      case 'telefono':
        return value.trim().length >= 6 ? '' : 'Ingresá un teléfono válido';
      case 'dni':
        return /^\d{7,9}$/.test(value.replace(/\D/g, '')) ? '' : 'DNI debe tener 7-9 dígitos';
      default:
        return '';
    }
  };

  const handleBlur = (name, value) => {
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFotoError('');
    try {
      const compressed = await compressPhoto(file);
      setFoto(compressed);
      setFotoPreview(compressed);
    } catch (err) {
      setFotoError(err.message);
      setFoto(null);
      setFotoPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    setError('');
    try {
      const { init_point } = await createTicketPreference({
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        dni: dni.replace(/\D/g, ''),
        tipo_entrada: ticket.id,
        dia_asistencia: dias === '3' ? 'Viernes 13, Sábado 14 y Domingo 15 Nov' : diaEspecifico,
        dias_seleccionados: parseInt(dias),
        foto_base64: foto,
      });
      window.location.href = init_point;
    } catch (err) {
      console.error(err);
      setError('No se pudo iniciar el pago. Verificá tu conexión e intentá de nuevo.');
      setLoading(false);
    }
  };

  const C = { fondo: '#1E3320', campo: '#253D27', borde: '#7A9E5A', texto: '#F5F0E8', label: '#9DC99F', error: '#E07070' };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '13px 16px',
    fontSize: 14,
    fontFamily: 'var(--bz-font-body)',
    background: C.campo,
    border: `1px solid ${hasError ? C.error : C.borde}`,
    borderRadius: 10,
    color: C.texto,
    outline: 'none',
    transition: 'border-color 200ms',
  });

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    fontFamily: 'var(--bz-font-mono)',
    color: C.label,
    marginBottom: 6,
  };

  const dias3precio = fmtARS(ticket.precioNum * 2);
  const dias1precio = fmtARS(ticket.precioNum);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Comprar entrada ${ticket.badge}`}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          background: 'rgba(10,20,10,0.88)',
          backdropFilter: 'blur(8px)',
          animation: 'bz-fade-in 220ms ease',
          overflowY: 'auto',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div style={{
          background: C.fondo,
          border: `1px solid ${C.borde}`,
          borderRadius: 20,
          maxWidth: 540,
          width: '100%',
          margin: 'auto',
          animation: 'bz-modal-in 320ms cubic-bezier(0.34,1.56,0.64,1)',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{ padding: '24px 28px 20px', borderBottom: `1px solid rgba(122,158,90,0.25)`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A9E5A', fontFamily: 'var(--bz-font-mono)', marginBottom: 6 }}>
                {ticket.badge}
              </div>
              <h2 style={{ color: '#FAF6ED', fontFamily: 'var(--bz-font-display)', fontSize: 22, fontWeight: 400, margin: 0 }}>
                Completá tus datos
              </h2>
            </div>
            <button onClick={onClose} aria-label="Cerrar" style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', color: '#FAF6ED', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
          </div>

          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Selector de días + precio */}
            <div>
              <div style={labelStyle}>¿Cuántos días vas?</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { val: '1', label: '1 día', sub: dias1precio },
                  { val: '3', label: '3 días · Promo 3×2', sub: dias3precio, tag: 'Ahorrás ' + fmtARS(ticket.precioNum) },
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setDias(opt.val)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: `2px solid ${dias === opt.val ? '#C8A647' : 'rgba(122,158,90,0.4)'}`,
                      background: dias === opt.val ? 'rgba(200,166,71,0.12)' : 'rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 200ms',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: dias === opt.val ? '#C8A647' : '#F5F0E8', marginBottom: 4 }}>{opt.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#FAF6ED', marginBottom: opt.tag ? 4 : 0 }}>{opt.sub}</div>
                    {opt.tag && <div style={{ fontSize: 10, color: '#7A9E5A', fontFamily: 'var(--bz-font-mono)', letterSpacing: '0.08em' }}>{opt.tag}</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Día específico (solo 1 día) */}
            {dias === '1' && (
              <div>
                <label style={labelStyle}>Día de asistencia <span style={{ color: C.error }}>*</span></label>
                <select
                  value={diaEspecifico}
                  onChange={e => setDiaEspecifico(e.target.value)}
                  style={{ ...inputStyle(false), appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%239DC99F\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 40 }}
                >
                  <option value="">Seleccioná un día</option>
                  <option value="Viernes 13 Nov">Viernes 13 Nov — Apertura</option>
                  <option value="Sábado 14 Nov">Sábado 14 Nov — Día completo</option>
                  <option value="Domingo 15 Nov">Domingo 15 Nov — Cierre y cosecha</option>
                </select>
              </div>
            )}

            {/* Nombre */}
            <div>
              <label style={labelStyle} htmlFor="pm-nombre">Nombre completo <span style={{ color: C.error }}>*</span></label>
              <input
                id="pm-nombre"
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                onBlur={e => handleBlur('nombre', e.target.value)}
                placeholder="María González"
                style={inputStyle(!!errors.nombre)}
              />
              {errors.nombre && <div style={{ fontSize: 12, color: C.error, marginTop: 4 }}>{errors.nombre}</div>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle} htmlFor="pm-email">Email <span style={{ color: C.error }}>*</span></label>
              <input
                id="pm-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={e => handleBlur('email', e.target.value)}
                placeholder="tu@correo.com"
                style={inputStyle(!!errors.email)}
              />
              {errors.email && <div style={{ fontSize: 12, color: C.error, marginTop: 4 }}>{errors.email}</div>}
              <div style={{ fontSize: 11, color: '#7A8A6A', marginTop: 4 }}>Te enviamos el ticket a este mail</div>
            </div>

            {/* Teléfono */}
            <div>
              <label style={labelStyle} htmlFor="pm-telefono">Teléfono <span style={{ color: C.error }}>*</span></label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ padding: '13px 14px', background: C.campo, border: `1px solid ${C.borde}`, borderRadius: 10, color: '#9DC99F', fontSize: 14, fontFamily: 'var(--bz-font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}>+54</div>
                <input
                  id="pm-telefono"
                  type="tel"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  onBlur={e => handleBlur('telefono', e.target.value)}
                  placeholder="9 299 555 0000"
                  style={{ ...inputStyle(!!errors.telefono), flex: 1 }}
                />
              </div>
              {errors.telefono && <div style={{ fontSize: 12, color: C.error, marginTop: 4 }}>{errors.telefono}</div>}
            </div>

            {/* DNI */}
            <div>
              <label style={labelStyle} htmlFor="pm-dni">DNI <span style={{ color: C.error }}>*</span></label>
              <input
                id="pm-dni"
                type="text"
                value={dni}
                onChange={e => setDni(e.target.value.replace(/\D/g, '').slice(0, 9))}
                onBlur={e => handleBlur('dni', e.target.value)}
                placeholder="12345678"
                maxLength={9}
                style={inputStyle(!!errors.dni)}
              />
              {errors.dni && <div style={{ fontSize: 12, color: C.error, marginTop: 4 }}>{errors.dni}</div>}
            </div>

            {/* Foto de perfil */}
            <div>
              <div style={labelStyle}>Foto de perfil <span style={{ color: C.error }}>*</span></div>
              <div style={{ fontSize: 11, color: '#7A8A6A', marginBottom: 10 }}>Se usa para la acreditación biométrica. Solo imágenes, máx 5 MB.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {fotoPreview ? (
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                      src={fotoPreview}
                      alt="Vista previa"
                      style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.borde}` }}
                    />
                    <button
                      type="button"
                      onClick={() => { setFoto(null); setFotoPreview(null); if (fotoInputRef.current) fotoInputRef.current.value = ''; }}
                      style={{ position: 'absolute', top: -6, right: -6, background: '#1E3320', border: `1px solid ${C.borde}`, borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', color: '#FAF6ED', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      aria-label="Quitar foto"
                    >×</button>
                  </div>
                ) : (
                  <div style={{ width: 72, height: 72, borderRadius: '50%', border: `2px dashed ${C.borde}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 24, color: '#7A9E5A' }}>📷</div>
                )}
                <label style={{ cursor: 'pointer', flex: 1 }}>
                  <div style={{ padding: '12px 18px', borderRadius: 10, border: `1px solid ${C.borde}`, background: 'rgba(122,158,90,0.1)', color: '#9DC99F', fontSize: 13, textAlign: 'center', transition: 'background 200ms' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(122,158,90,0.18)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(122,158,90,0.1)'}
                  >
                    {fotoPreview ? 'Cambiar foto' : 'Subir foto'}
                  </div>
                  <input
                    ref={fotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              {fotoError && <div style={{ fontSize: 12, color: C.error, marginTop: 8 }}>{fotoError}</div>}
            </div>

            {/* Términos */}
            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
              <div
                role="checkbox"
                aria-checked={terminos}
                tabIndex={0}
                onClick={() => setTerminos(t => !t)}
                onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') setTerminos(t => !t); }}
                style={{
                  width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  border: `2px solid ${terminos ? '#7A9E5A' : 'rgba(122,158,90,0.5)'}`,
                  background: terminos ? '#7A9E5A' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 200ms',
                }}
              >
                {terminos && <span style={{ color: '#1E3320', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ fontSize: 13, color: '#C8D8C0', lineHeight: 1.6 }}>
                Acepto los{' '}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTerms(true); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A9E5A', fontSize: 13, fontWeight: 600, padding: 0, textDecoration: 'underline' }}
                >
                  Términos y Condiciones
                </button>
                {' '}(autorización de registro de imagen y uso de datos según Ley 25.326) <span style={{ color: C.error }}>*</span>
              </span>
            </label>

            {/* Error general */}
            {error && (
              <div style={{ padding: '12px 16px', background: 'rgba(224,112,112,0.15)', border: '1px solid rgba(224,112,112,0.4)', borderRadius: 10, fontSize: 13, color: '#E07070' }}>
                {error}
              </div>
            )}

            {/* Resumen de precio */}
            <div style={{ padding: '16px', background: 'rgba(200,166,71,0.08)', border: '1px solid rgba(200,166,71,0.25)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#7A9E5A', fontFamily: 'var(--bz-font-mono)', letterSpacing: '0.12em', marginBottom: 4 }}>TOTAL A PAGAR</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#C8A647' }}>{fmtARS(precio)}</div>
                {dias === '3' && <div style={{ fontSize: 11, color: '#7A9E5A', marginTop: 2 }}>Promo 3×2 · 3 días por el precio de 2</div>}
              </div>
              <div style={{ fontSize: 11, color: '#6E9050', textAlign: 'right', fontFamily: 'var(--bz-font-mono)' }}>
                Pagás con<br />Mercado Pago
              </div>
            </div>

            {/* Botón continuar */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 100,
                border: 'none',
                background: isFormValid && !loading ? '#C8A647' : 'rgba(200,166,71,0.25)',
                color: isFormValid && !loading ? '#1E3320' : 'rgba(200,166,71,0.5)',
                fontSize: 15,
                fontWeight: 700,
                cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 250ms',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => { if (isFormValid && !loading) e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              {loading ? 'Redirigiendo a Mercado Pago…' : 'CONTINUAR AL PAGO →'}
            </button>

            <p style={{ fontSize: 11, color: '#6E9050', textAlign: 'center', fontFamily: 'var(--bz-font-mono)' }}>
              Pago 100% seguro · Visa · Mastercard · Amex · MP
            </p>
          </div>
        </div>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </>
  );
}

// ─── Tarjeta de Ticket ────────────────────────────────────────────────────────
function TicketCard({ ticket, index, onComprar }) {
  const PALETA = {
    'raices-early': {
      bg: 'var(--bz-ocre-calido)',
      fg: 'var(--bz-verde-profundo)',
      accent: 'var(--bz-verde-profundo)',
      accentSub: 'rgba(42,61,36,0.7)',
      border: 'var(--bz-ocre-tostado)',
      sepColor: 'rgba(42,61,36,0.15)',
      promoBg: 'rgba(42,61,36,0.1)',
      promoBorder: 'rgba(42,61,36,0.2)',
      btnBg: 'var(--bz-verde-profundo)',
      btnFg: 'var(--bz-beige-hueso)',
      successBg: 'var(--bz-verde-pasto)',
      successFg: 'var(--bz-verde-bosque)',
    },
    'bosque-early': {
      bg: '#2C1A0E',
      fg: '#F5ECD8',
      accent: '#C8A647',
      accentSub: 'rgba(200,166,71,0.65)',
      border: '#5C3A1E',
      sepColor: 'rgba(200,166,71,0.15)',
      promoBg: 'rgba(200,166,71,0.1)',
      promoBorder: 'rgba(200,166,71,0.25)',
      btnBg: '#C8A647',
      btnFg: '#2C1A0E',
      successBg: 'rgba(200,166,71,0.15)',
      successFg: '#C8A647',
    },
    'raices': {
      bg: 'var(--bz-verde-profundo)',
      fg: 'var(--bz-beige-hueso)',
      accent: 'var(--bz-ocre-calido)',
      accentSub: 'rgba(230,203,122,0.65)',
      border: 'var(--bz-verde-profundo)',
      sepColor: 'rgba(250,246,237,0.15)',
      promoBg: 'rgba(230,203,122,0.12)',
      promoBorder: 'rgba(230,203,122,0.25)',
      btnBg: 'var(--bz-ocre-calido)',
      btnFg: 'var(--bz-verde-profundo)',
      successBg: 'rgba(250,246,237,0.12)',
      successFg: 'var(--bz-beige-hueso)',
    },
    'bosque': {
      bg: 'var(--bz-beige-hueso)',
      fg: 'var(--bz-texto-primario)',
      accent: 'var(--bz-tierra-rojo)',
      accentSub: 'rgba(163,58,30,0.6)',
      border: 'var(--bz-borde-suave)',
      sepColor: 'var(--bz-borde-ligero)',
      promoBg: 'rgba(163,58,30,0.07)',
      promoBorder: 'rgba(163,58,30,0.18)',
      btnBg: 'var(--bz-verde-profundo)',
      btnFg: 'var(--bz-beige-hueso)',
      successBg: 'var(--bz-verde-pasto)',
      successFg: 'var(--bz-verde-bosque)',
    },
  };

  const p = PALETA[ticket.id] || PALETA['bosque'];
  const featured = ticket.destacado;
  const precio3 = ticket.precioNum * 2;

  const [notify, setNotify] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySent, setNotifySent] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);

  const onNotify = async (e) => {
    e.preventDefault();
    setNotifyLoading(true);
    try { await subscribeNewsletter(notifyEmail, 'entradas'); } catch (_) {}
    setNotifySent(true);
    setNotifyLoading(false);
  };

  return (
    <article
      className="reveal"
      style={{
        background: p.bg,
        color: p.fg,
        borderRadius: 20,
        border: `1px solid ${p.border}`,
        boxShadow: featured ? 'var(--bz-shadow-xl)' : 'var(--bz-shadow-sm)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        gap: 0,
        overflow: 'hidden',
        transition: 'transform 280ms var(--bz-ease), box-shadow 280ms var(--bz-ease)',
        transitionDelay: `${index * 70}ms`,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--bz-shadow-lg)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = featured ? 'var(--bz-shadow-xl)' : 'var(--bz-shadow-sm)'; }}
    >
      {/* Franja lateral de color */}
      <div style={{ width: 5, flexShrink: 0, background: p.accent, opacity: 0.7 }} />

      <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Header: badge + chips */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--bz-font-mono)', opacity: 0.65 }}>{ticket.badge}</div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {ticket.earlyBird && (
              <div style={{ background: p.accent, color: p.bg, padding: '3px 9px', borderRadius: 100, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--bz-font-mono)' }}>⚡ EARLY</div>
            )}
            {featured && (
              <div style={{ background: 'var(--bz-ocre-calido)', color: 'var(--bz-verde-profundo)', padding: '3px 9px', borderRadius: 100, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--bz-font-mono)' }}>★ TOP</div>
            )}
          </div>
        </div>

        {/* Nombre + precio */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: 'var(--bz-font-display)', fontSize: 30, lineHeight: 1, margin: 0 }}>{ticket.name}</h3>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--bz-font-display)', fontSize: 30, fontWeight: 400, color: p.accent, lineHeight: 1 }}>{ticket.precio}</span>
              <span style={{ fontSize: 11, opacity: 0.6, fontFamily: 'var(--bz-font-mono)' }}>{ticket.unidad}</span>
            </div>
            {ticket.precioOrig && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginTop: 4 }}>
                <span style={{ fontSize: 12, opacity: 0.45, textDecoration: 'line-through' }}>{ticket.precioOrig}</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 100, background: 'rgba(163,58,30,0.15)', color: '#A33A1E', fontFamily: 'var(--bz-font-mono)' }}>{ticket.descuento}</span>
              </div>
            )}
          </div>
        </div>

        {/* Separador */}
        <div style={{ height: 1, background: p.sepColor, marginBottom: 16 }} />

        {/* Beneficios */}
        <ul style={{ listStyle: 'none', margin: '0 0 18px', padding: 0, flex: 1 }}>
          {ticket.incluye.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: 10, paddingBottom: 9, fontSize: 13, lineHeight: 1.4, opacity: 0.88 }}>
              <span style={{ color: p.accent, flexShrink: 0, fontSize: 12, marginTop: 1 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Promo 3×2 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: p.promoBg, border: `1px solid ${p.promoBorder}`, marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--bz-font-mono)', opacity: 0.65 }}>3 días · 3×2</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: p.accent }}>
            {fmtARS(precio3)}
            <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.7, marginLeft: 5 }}>pagás 2</span>
          </div>
        </div>

        {/* CTA */}
        {VENTA_ACTIVA ? (
          <button onClick={() => onComprar(ticket)}
            style={{ padding: '13px 24px', borderRadius: 100, background: p.btnBg, color: p.btnFg, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', letterSpacing: '0.05em', transition: 'transform 200ms var(--bz-spring)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >COMPRAR →</button>
        ) : notifySent ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', borderRadius: 10, background: p.successBg, color: p.successFg, fontSize: 13, lineHeight: 1.5 }}>
            <span style={{ flexShrink: 0 }}>✓</span>
            <span>Listo. Te avisamos cuando salga:<br /><strong style={{ wordBreak: 'break-all' }}>{notifyEmail}</strong></span>
          </div>
        ) : notify ? (
          <form onSubmit={onNotify} style={{ display: 'flex', gap: 8 }}>
            <input type="email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} placeholder="tu@correo.com" autoFocus required
              style={{ flex: 1, padding: '12px 16px', fontSize: 13, fontFamily: 'var(--bz-font-body)', border: `1px solid ${p.border}`, borderRadius: 100, background: 'rgba(255,255,255,0.12)', color: p.fg, outline: 'none' }} />
            <button type="submit" disabled={notifyLoading}
              style={{ padding: '12px 20px', borderRadius: 100, background: p.btnBg, color: p.btnFg, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', opacity: notifyLoading ? 0.7 : 1 }}>
              {notifyLoading ? '...' : 'OK'}
            </button>
          </form>
        ) : (
          <button onClick={() => setNotify(true)}
            style={{ padding: '13px 24px', borderRadius: 100, background: p.btnBg, color: p.btnFg, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'transform 200ms var(--bz-spring)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >Avisame cuando salga</button>
        )}
      </div>
    </article>
  );
}

// ─── Página de Entradas ───────────────────────────────────────────────────────
export default function EntradasPage({ setPage }) {
  useReveal();
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Leer resultado de pago de la URL
  const pagoParam = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('pago')
    : null;

  const [pagoMsg, setPagoMsg] = useState(pagoParam);
  useEffect(() => {
    if (pagoParam) {
      const url = new URL(window.location.href);
      url.searchParams.delete('pago');
      window.history.replaceState({}, '', url);
    }
  }, []);

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Entradas · BIORAIZ 2026"
        title={<>Tu lugar.</>}
        sub={VENTA_ACTIVA
          ? "4 tipos de entrada. El precio es por día o aprovechá la promo 3×2 y venís los 3 días."
          : "4 tipos de entrada. El precio es por día. A la venta desde septiembre."}
      />

      {/* Mensaje de resultado de pago */}
      {pagoMsg && (
        <div style={{
          padding: '16px 24px',
          margin: '0',
          background: pagoMsg === 'exito' ? 'rgba(106,160,80,0.15)' : pagoMsg === 'error' ? 'rgba(224,112,112,0.15)' : 'rgba(200,166,71,0.15)',
          borderBottom: `1px solid ${pagoMsg === 'exito' ? 'rgba(106,160,80,0.3)' : pagoMsg === 'error' ? 'rgba(224,112,112,0.3)' : 'rgba(200,166,71,0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          fontSize: 14,
          color: pagoMsg === 'exito' ? '#2A5C1E' : pagoMsg === 'error' ? '#7A1E1E' : '#5C4A1E',
          textAlign: 'center',
        }}>
          {pagoMsg === 'exito' && <><strong>¡Pago recibido!</strong> Te enviamos el ticket por email. Revisá tu bandeja de entrada.🌿</>}
          {pagoMsg === 'error' && <><strong>Hubo un problema con el pago.</strong> Podés reintentar o escribirnos a <a href={`mailto:${BZ_EMAIL}`} style={{ color: 'inherit' }}>{BZ_EMAIL}</a>.</>}
          {pagoMsg === 'pendiente' && <><strong>Pago pendiente.</strong> Mercado Pago está procesando tu pago. Te avisamos por email cuando se confirme.</>}
        </div>
      )}

      {/* Promo banner — visible solo cuando la venta está activa */}
      {VENTA_ACTIVA && (
        <div style={{ background: '#1E3320', padding: '0' }}>
          <div className="container-narrow">
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0', flexWrap: 'wrap' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A9E5A', fontFamily: 'var(--bz-font-mono)', flexShrink: 0 }}>🎟 Promo 3×2</div>
              <div style={{ color: '#FAF6ED', fontSize: 14 }}>Comprá los <strong>3 días</strong> y pagás solo 2 — en cualquier tipo de entrada. Early Bird o General.</div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de tickets */}
      <section style={{ padding: '56px 0 80px', background: 'var(--bz-fondo-base)' }}>
        <div className="container-narrow" style={{ maxWidth: 960 }}>

          {/* Sección Early Bird */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--bz-font-mono)', color: 'var(--bz-ocre-tostado)', whiteSpace: 'nowrap' }}>⚡ Early Bird · cupos limitados</div>
            <div style={{ flex: 1, height: 1, background: 'var(--bz-borde-ligero)' }} />
          </div>
          <div className="bz-tickets-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            {TICKETS.filter(t => t.earlyBird).map((t, i) => (
              <TicketCard key={t.id} ticket={t} index={i} onComprar={setSelectedTicket} />
            ))}
          </div>

          {/* Sección General */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--bz-font-mono)', color: 'var(--bz-texto-terciario)', whiteSpace: 'nowrap' }}>Entradas generales</div>
            <div style={{ flex: 1, height: 1, background: 'var(--bz-borde-ligero)' }} />
          </div>
          <div className="bz-tickets-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {TICKETS.filter(t => !t.earlyBird).map((t, i) => (
              <TicketCard key={t.id} ticket={t} index={i + 2} onComprar={setSelectedTicket} />
            ))}
          </div>

        </div>
        <style>{`
          @media (max-width: 640px) { .bz-tickets-grid { grid-template-columns: 1fr !important; } }
          @keyframes bz-modal-in {
            from { opacity: 0; transform: scale(0.92) translateY(20px); }
            to   { opacity: 1; transform: scale(1)    translateY(0);    }
          }
        `}</style>
      </section>

      {/* Métodos de pago */}
      <section style={{ padding: '0 0 80px', background: 'var(--bz-fondo-base)' }}>
        <div className="container-narrow">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, padding: '24px 36px', background: 'var(--bz-beige-hueso)', border: '0.5px solid var(--bz-borde-ligero)', borderRadius: 'var(--bz-radius-lg)', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 11, color: 'var(--bz-texto-terciario)', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--bz-font-mono)' }}>Pagás con</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              {['Visa', 'Mastercard', 'Amex', 'Mercado Pago', 'Modo', 'Transferencia'].map(m => (
                <span key={m} style={{ padding: '6px 14px', background: 'var(--bz-fondo-base)', borderRadius: 'var(--bz-radius-pill)', fontSize: 12, color: 'var(--bz-texto-secundario)', fontWeight: 500 }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '60px 0 120px', background: 'var(--bz-fondo-alt)' }}>
        <div className="container-narrow">
          <SectionHead
            eyebrow="Preguntas frecuentes"
            title={<>Lo que <em>siempre</em> nos preguntan.</>}
            sub={`Si tu duda no está acá, escribinos a ${BZ_EMAIL}. Respondemos en menos de 48 hs.`}
          />
          <div style={{ marginTop: 56 }}>
            {FAQ.map((item, i) => (
              <FaqItem key={i} item={item} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section style={{ padding: '100px 0', background: 'var(--bz-fondo-base)' }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="eyebrow eyebrow-tierra" style={{ marginBottom: 18 }}>¿Te quedaste con dudas?</div>
            <h3 className="display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 18, color: 'var(--bz-texto-primario)', lineHeight: 1.15 }}>
              Escribinos directamente.
            </h3>
            <p style={{ fontSize: 15, color: 'var(--bz-texto-secundario)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
              Te responde alguien del equipo, en persona, en menos de 48 hs.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`mailto:${BZ_EMAIL}`} className="btn btn-primary">{BZ_EMAIL}</a>
              <a href={BZ_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de compra — solo activo cuando VENTA_ACTIVA = true */}
      {VENTA_ACTIVA && selectedTicket && (
        <PurchaseModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
