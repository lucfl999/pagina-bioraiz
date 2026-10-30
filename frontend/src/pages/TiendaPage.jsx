import { useEffect, useState } from 'react';
import { SubPageHeader, useReveal } from '../components/shared.jsx';
import { BZ_DATE } from '../data.js';
import { createStorePreference, getStoreOrderStatus } from '../services/api.js';

const DESCUENTO = 0.15;
const PRODUCTOS = [
  { id: "banderas", nombre: "Plaza de las Banderas", medida: "500 ml", precio: 4000, foto: "/tienda/vaso-banderas.jpg", fondo: "#efebe4" },
  { id: "san-martin", nombre: "Monumento San Martín", medida: "500 ml", precio: 4000, foto: "/tienda/vaso-san-martin.jpg", fondo: "#e4e4e2", contain: true },
  { id: "confluencia", nombre: "La Confluencia", medida: "500 ml", precio: 4000, foto: "/tienda/vaso-confluencia.jpg", fondo: "#efebe4" },
];

const precio = (valor) => `$${valor.toLocaleString("es-AR")}`;
const precioWeb = (valor) => Math.round(valor * (1 - DESCUENTO));

function QuantityControl({ name, value, onChange }) {
  const buttonStyle = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid var(--bz-borde-suave)",
    background: "transparent",
    color: "var(--bz-texto-primario)",
    fontSize: 18,
    lineHeight: 1,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button type="button" aria-label={`Quitar un vaso ${name}`} style={buttonStyle} onClick={() => onChange(Math.max(0, value - 1))}>−</button>
      <span aria-live="polite" style={{ minWidth: 20, textAlign: "center", fontFamily: "var(--bz-font-mono)", fontSize: 15 }}>{value}</span>
      <button type="button" aria-label={`Agregar un vaso ${name}`} style={buttonStyle} onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

function ProductCard({ product, quantity, onQuantityChange }) {
  return (
    <article style={{ background: "var(--bz-beige-hueso)", borderRadius: "var(--bz-radius-lg)", overflow: "hidden", border: "0.5px solid var(--bz-borde-suave)", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", aspectRatio: "4 / 3", background: product.fondo }}>
        <img
          src={product.foto}
          alt={`Vaso ${product.nombre}`}
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: product.contain ? "contain" : "cover" }}
        />
        <span style={{ position: "absolute", top: 14, right: 14, background: "var(--bz-ocre-calido)", color: "var(--bz-fondo-dark)", fontFamily: "var(--bz-font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", padding: "6px 12px", borderRadius: "var(--bz-radius-pill)" }}>−15%</span>
      </div>
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        <div>
          <h2 className="display" style={{ fontSize: 24, lineHeight: 1.2, color: "var(--bz-texto-primario)" }}>{product.nombre}</h2>
          <div style={{ marginTop: 6, fontSize: 13, color: "var(--bz-texto-secundario)" }}>Vaso · {product.medida}</div>
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span className="display" style={{ fontSize: 26, color: "var(--bz-verde-profundo)" }}>{precio(precioWeb(product.precio))}</span>
              <span style={{ fontSize: 14, color: "var(--bz-texto-terciario)", textDecoration: "line-through" }}>{precio(product.precio)}</span>
            </div>
            <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bz-verde-musgo)" }}>15% off por la web</span>
          </div>
          {quantity > 0
            ? <QuantityControl name={product.nombre} value={quantity} onChange={onQuantityChange} />
            : <button type="button" className="btn btn-primary" onClick={() => onQuantityChange(1)}>Agregar</button>}
        </div>
      </div>
    </article>
  );
}

export default function TiendaPage() {
  useReveal();
  const [cart, setCart] = useState({});
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState("");
  const [checkoutState, setCheckoutState] = useState({ kind: "idle", message: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentResult = params.get("tienda_pago");
    const orderCode = params.get("pedido");
    if (!paymentResult || !orderCode) return undefined;

    let cancelled = false;
    let timeout;
    let attempts = 0;
    setCheckoutState({ kind: "checking", message: "Estamos verificando el estado de tu pago con Mercado Pago…" });

    const checkStatus = async () => {
      try {
        const order = await getStoreOrderStatus(orderCode);
        if (cancelled) return;
        if (order.estado === "approved") {
          setCheckoutState({ kind: "approved", message: `¡Pago acreditado! Te enviamos la confirmación al email que ingresaste. Número de pedido: ${order.order_code}.` });
          return;
        }
        if (["rejected", "cancelled", "refunded", "charged_back"].includes(order.estado)) {
          setCheckoutState({ kind: "failed", message: "El pago no se completó. Podés volver a intentarlo con tu pedido." });
          return;
        }
        if (attempts >= 5) {
          setCheckoutState({ kind: "pending", message: "Mercado Pago todavía está procesando el pago. No vuelvas a pagar; actualizaremos el pedido cuando llegue la confirmación." });
          return;
        }
        attempts += 1;
        timeout = window.setTimeout(checkStatus, 1500);
      } catch {
        if (!cancelled) {
          setCheckoutState({ kind: "pending", message: "Volviste de Mercado Pago. Estamos esperando la confirmación del pago; no vuelvas a pagar por ahora." });
        }
      }
    };

    checkStatus();
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  const setQuantity = (id, quantity) => {
    setCart(current => {
      const next = { ...current };
      if (quantity > 0) next[id] = quantity;
      else delete next[id];
      return next;
    });
    setError("");
  };

  const items = PRODUCTOS.filter(product => cart[product.id] > 0)
    .map(product => ({ ...product, quantity: cart[product.id] }));
  const subtotal = items.reduce((total, item) => total + item.quantity * item.precio, 0);
  const total = items.reduce((sum, item) => sum + item.quantity * precioWeb(item.precio), 0);
  const savings = subtotal - total;
  const units = items.reduce((sum, item) => sum + item.quantity, 0);

  const sendOrder = async () => {
    if (!items.length) {
      setError("Agregá al menos un vaso a tu pedido.");
      return;
    }
    if (!nombre.trim()) {
      setError("Escribí tu nombre y apellido.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Ingresá un email válido para recibir la confirmación de compra.");
      return;
    }
    if ((whatsapp.match(/\d/g) || []).length < 8) {
      setError("Ingresá un número de WhatsApp válido para coordinar el retiro.");
      return;
    }

    setError("");
    setCheckoutState({ kind: "creating", message: "" });
    try {
      const { init_point } = await createStorePreference({
        nombre: nombre.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        items: items.map(item => ({ id: item.id, quantity: item.quantity })),
      });
      window.location.assign(init_point);
    } catch (requestError) {
      setCheckoutState({ kind: "idle", message: "" });
      setError(requestError.response?.data?.error || "No pudimos iniciar el pago. Intentá nuevamente.");
    }
  };

  return (
    <div className="page-enter">
      <SubPageHeader
        eyebrow="Tienda"
        title={<>Colección de vasos.</>}
        sub="Tres diseños de Neuquén. Vaso de 500 ml. Armá tu pedido, pagalo con Mercado Pago y retiralo en la feria."
      />
      <section style={{ padding: "56px 0 96px", background: "var(--bz-fondo-base)" }}>
        <div className="container bz-tienda">
          <div className="bz-tienda-grid">
            {PRODUCTOS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onQuantityChange={quantity => setQuantity(product.id, quantity)}
              />
            ))}
          </div>
          <aside className="bz-tienda-cart" aria-label="Resumen del pedido">
            {checkoutState.message && (
              <div role="status" aria-live="polite" style={{
                padding: 14,
                borderRadius: "var(--bz-radius-md)",
                background: checkoutState.kind === "approved" ? "rgba(157,201,159,0.16)" : "rgba(230,203,122,0.14)",
                color: checkoutState.kind === "approved" ? "var(--bz-verde-claro)" : "var(--bz-ocre-calido)",
                fontSize: 14,
                lineHeight: 1.5,
              }}>{checkoutState.message}</div>
            )}
            <div style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.6)" }}>Tu pedido</div>
            {items.length === 0
              ? <p style={{ fontSize: 15, color: "rgba(245,240,232,0.7)", lineHeight: 1.5, margin: 0 }}>Todavía no agregaste vasos.</p>
              : <div style={{ display: "flex", flexDirection: "column" }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "6px 12px", alignItems: "center", padding: "14px 0", borderBottom: "0.5px solid rgba(245,240,232,0.15)" }}>
                      <span style={{ fontSize: 15, lineHeight: 1.3 }}>{item.nombre}</span>
                      <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 14 }}>{precio(item.quantity * precioWeb(item.precio))}</span>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <QuantityControl name={item.nombre} value={item.quantity} onChange={quantity => setQuantity(item.id, quantity)} />
                      </div>
                    </div>
                  ))}
                </div>}
            {savings > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--bz-ocre-calido)" }}>
                <span>Descuento web 15%</span>
                <span style={{ fontFamily: "var(--bz-font-mono)" }}>−{precio(savings)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 14, color: "rgba(245,240,232,0.7)" }}>Total{units ? ` · ${units} ${units === 1 ? "vaso" : "vasos"}` : ""}</span>
              <span className="display" style={{ fontSize: 30 }}>{precio(total)}</span>
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.6)" }}>Nombre y apellido</span>
              <input
                autoComplete="name"
                value={nombre}
                onChange={event => setNombre(event.target.value)}
                style={{ background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.25)", borderRadius: "var(--bz-radius-md)", padding: "12px 14px", fontSize: 15, color: "var(--bz-beige-hueso)", fontFamily: "var(--bz-font-body)", outline: "none" }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.6)" }}>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                style={{ background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.25)", borderRadius: "var(--bz-radius-md)", padding: "12px 14px", fontSize: 15, color: "var(--bz-beige-hueso)", fontFamily: "var(--bz-font-body)", outline: "none" }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--bz-font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.6)" }}>WhatsApp</span>
              <input
                type="tel"
                autoComplete="tel"
                value={whatsapp}
                onChange={event => setWhatsapp(event.target.value)}
                style={{ background: "rgba(245,240,232,0.06)", border: "1px solid rgba(245,240,232,0.25)", borderRadius: "var(--bz-radius-md)", padding: "12px 14px", fontSize: 15, color: "var(--bz-beige-hueso)", fontFamily: "var(--bz-font-body)", outline: "none" }}
              />
            </label>
            <div style={{ fontSize: 13.5, color: "rgba(245,240,232,0.75)", lineHeight: 1.5 }}>Retiro en la feria · {BZ_DATE}. Te enviaremos la confirmación de pago por email y podremos coordinar el retiro por WhatsApp.</div>
            {error && <div role="alert" style={{ fontSize: 13.5, color: "var(--bz-ocre-calido)" }}>{error}</div>}
            <button type="button" className="btn" onClick={sendOrder} disabled={checkoutState.kind === "creating"} style={{ background: "var(--bz-ocre-calido)", color: "var(--bz-fondo-dark)", justifyContent: "center", width: "100%", opacity: checkoutState.kind === "creating" ? 0.65 : 1 }}>
              {checkoutState.kind === "creating" ? "Preparando el pago…" : "Pagar con Mercado Pago"}
            </button>
          </aside>
        </div>
      </section>
      <style>{`
        .bz-tienda { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 32px; align-items: start; }
        .bz-tienda-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 24px; }
        .bz-tienda-cart { position: sticky; top: 100px; background: var(--bz-fondo-dark); color: var(--bz-beige-hueso); border-radius: var(--bz-radius-lg); padding: 28px; display: flex; flex-direction: column; gap: 20px; }
        .bz-tienda-cart button { color: var(--bz-beige-hueso); border-color: rgba(245,240,232,0.3); }
        @media (max-width: 960px) {
          .bz-tienda { grid-template-columns: minmax(0, 1fr); }
          .bz-tienda-cart { position: static; }
        }
      `}</style>
    </div>
  );
}
