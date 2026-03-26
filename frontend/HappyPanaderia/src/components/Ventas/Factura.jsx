import React from "react";

const Factura = ({ venta, onNuevaVenta }) => {
  if (!venta) return null;

  return (
    <div className="container mt-4 animate__animated animate__zoomIn">
      {/* 1. Aplicamos glass-card y un ancho máximo para que parezca un ticket real */}
      <div
        className="glass-card p-4 shadow-lg mx-auto"
        style={{ maxWidth: "500px", border: "1px solid rgba(255,255,255,0.3)" }}
      >
        {/* HEADER ESTILO TICKET */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#5d4037" }}>
            Happy Panadería
          </h2>
          <p className="mb-0 text-muted small">RUC: 172XXXXXXX001</p>
          <p className="mb-0 text-muted small">Quito, Ecuador</p>
          <hr style={{ borderTop: "2px dashed #ccc" }} />
          <h5 className="text-success fw-bold">VENTA EXITOSA</h5>
          <small className="text-muted">
            {new Date(venta.fecha).toLocaleString()}
          </small>
        </div>

        {/* DATOS DEL CLIENTE */}
        <div
          className="mb-4 p-2"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "8px",
          }}
        >
          <div className="small text-muted fw-bold">CLIENTE:</div>
          <div className="fw-bold" style={{ color: "#5d4037" }}>
            {venta.nombreCliente || "Consumidor Final"}
          </div>
        </div>

        {/* TABLA DE PRODUCTOS SIMPLIFICADA */}
        <div className="table-responsive">
          <table className="table table-borderless table-sm">
            <thead>
              <tr
                className="border-bottom"
                style={{ borderColor: "#d3d3d3 !important" }}
              >
                <th className="text-muted small">DESCRIPCIÓN</th>
                <th className="text-center text-muted small">CANT.</th>
                <th className="text-end text-muted small">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {venta.detalles.map((d, i) => (
                <tr key={i} className="align-middle">
                  <td className="py-2">
                    <span
                      className="fw-bold d-block"
                      style={{ color: "#5d4037" }}
                    >
                      {d.nombreProducto}
                    </span>
                    <small className="text-muted">
                      ${d.precioUnitario.toFixed(2)} c/u
                    </small>
                  </td>
                  <td className="text-center">{d.cantidad}</td>
                  <td className="text-end fw-bold">${d.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALES CON ESTILO DE RECIBO */}
        <div className="mt-3 pt-3" style={{ borderTop: "2px dashed #ccc" }}>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-muted">Subtotal:</span>
            <span>${(venta.total - venta.iva).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span className="text-muted">IVA (15%):</span>
            <span>${venta.iva.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="h5 fw-bold mb-0" style={{ color: "#5d4037" }}>
              TOTAL:
            </span>
            <span className="h4 fw-bold mb-0 text-success">
              ${venta.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* PIE DE PÁGINA */}
        <div className="text-center mt-4 pt-3">
          <p className="small text-muted italic">
            ¡Gracias por preferir nuestro pan siempre fresco!
          </p>
          <button
            className="btn btn-pan w-100 py-2 mt-2 shadow-sm fw-bold"
            onClick={onNuevaVenta}
          >
            NUEVA VENTA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Factura;
