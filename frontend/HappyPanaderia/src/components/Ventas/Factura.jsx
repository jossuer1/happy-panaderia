import React from "react";

const Factura = ({ venta, onNuevaVenta }) => {
  if (!venta) return null;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="text-success">🧾 Venta Exitosa</h2>
          <p className="mb-0">Happy Panadería</p>
          <small className="text-muted">
            Fecha: {new Date(venta.fecha).toLocaleString()}
          </small>
        </div>

        {/* CLIENTE */}
        <div className="mb-3">
          <strong>Cliente:</strong> {venta.nombreCliente}
        </div>

        {/* TABLA */}
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {venta.detalles.map((d, i) => (
              <tr key={i}>
                <td>{d.nombreProducto}</td>
                <td>{d.cantidad}</td>
                <td>${d.precioUnitario.toFixed(2)}</td>
                <td>${d.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALES */}
        <div className="text-end">
          <p>
            <strong>IVA:</strong> ${venta.iva.toFixed(2)}
          </p>
          <h4>
            <strong>Total: ${venta.total.toFixed(2)}</strong>
          </h4>
        </div>

        {/* BOTÓN */}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={onNuevaVenta}>
            Nueva Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Factura;
