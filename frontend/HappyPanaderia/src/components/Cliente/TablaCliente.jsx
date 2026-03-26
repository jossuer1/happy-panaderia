import React from "react";

const TablaCliente = ({ clientes, onEditar }) => {
  return (
    // Envolvemos todo en la clase de efecto vidrio
    <div className="glass-card p-3 mt-4">
      <h5 className="mb-3" style={{ color: "#5d4037" }}>
        Lista de Clientes
      </h5>
      <div className="table-responsive">
        {/* Aplicamos table-custom para suavizar los colores de las filas */}
        <table className="table table-custom table-hover mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((value) => (
              <tr
                key={value.id}
                onClick={() => onEditar(value)}
                style={{ cursor: "pointer" }}
              >
                <td>{value.id}</td>
                <td>{value.nombre}</td>
                <td>{value.cedula}</td>
                <td>{value.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCliente;
