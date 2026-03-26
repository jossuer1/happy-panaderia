import React from "react";

const TablaProductos = ({ productos, onEditar }) => {
  return (
    /* 1. Envolvemos en glass-card para la transparencia y desenfoque */
    <div className="glass-card p-3 mt-4">
      <div className="d-flex align-items-center mb-3">
        <h5 className="mb-0" style={{ color: "#5d4037" }}>
          Inventario de Productos
        </h5>
      </div>

      <div className="table-responsive">
        {/* 2. Aplicamos la clase personalizada table-custom */}
        <table className="table table-custom table-hover mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th className="text-end pe-4">Precio</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((value) => (
              <tr
                key={value.id}
                style={{ cursor: "pointer" }}
                onClick={() => onEditar(value)}
              >
                <td className="text-muted">#{value.id}</td>
                <td className="fw-bold">{value.nombre}</td>
                <td>
                  {/* Un pequeño badge para las categorías le da un toque profesional */}
                  <span className="badge bg-light text-dark border">
                    {value.categoria}
                  </span>
                </td>
                <td className="text-end pe-4 fw-bold text-success">
                  {/* Formateo de precio con símbolo de dólar */}$
                  {parseFloat(value.precio).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaProductos;
