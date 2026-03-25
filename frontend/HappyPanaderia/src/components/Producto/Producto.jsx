import React, { useEffect, useState } from "react";

import { ApiUrl } from "../../services/apirest";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [producto, setProducto] = useState([]);
  const navigate = useNavigate();

  const clicProducto = (producto) => {
    navigate("/actualizar/" + producto.id, { state: { producto } });
  };

  useEffect(() => {
    axios.get(ApiUrl + "productos").then((response) => {
      setProducto(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="mt-3">Tabla Productos</h1>

      <p> * Para poder editar un producto, haga clic en su fila. * </p>

      <div className="col-sm-6">
        <button className="btn btn-success" onClick={() => navigate("/nuevo")}>
          Nuevo Producto
        </button>
      </div>

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
          {producto.map((value) => (
            <tr
              key={value.id}
              style={{ cursor: "pointer" }}
              onClick={() => clicProducto(value)}
            >
              <td>{value.id}</td>
              <td>{value.nombre}</td>
              <td>{value.categoria}</td>
              <td>{value.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
