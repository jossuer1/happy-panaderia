import React from "react";

const TablaCliente = ({ clientes, onEditar }) => {
  return (
    <table className="table table-hover mt-4">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cedula</th>
          <th>Dirrecion</th>
        </tr>
      </thead>

      <tbody>
        {clientes.map((value) => (
          <tr
            key={value.id}
            style={{ cursor: "pointer" }}
            onClick={() => onEditar(value)}
          >
            <td>{value.id}</td>
            <td>{value.nombre}</td>
            <td>{value.cedula}</td>
            <td>{value.direccion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaCliente;
