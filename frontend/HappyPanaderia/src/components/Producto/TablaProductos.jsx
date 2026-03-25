import React from "react";

const TablaProductos = ({ productos, onEditar }) => {
  return (
    <table className="table table-hover mt-4">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Precio</th>
        </tr>
      </thead>

      <tbody>
        {productos.map((value) => (
          <tr
            key={value.id}
            style={{ cursor: "pointer" }}
            onClick={() => onEditar(value)}
          >
            <td>{value.id}</td>
            <td>{value.nombre}</td>
            <td>{value.categoria}</td>
            <td>{value.precio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProductos;
