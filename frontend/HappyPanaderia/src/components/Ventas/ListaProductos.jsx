import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../services/apirest";

const ListaProductos = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(ApiUrl + "productos").then((res) => {
      setProductos(res.data);
    });
  }, []);

  return (
    /* 1. Usamos glass-card para que combine con el fondo */
    <div className="glass-card p-3 shadow-sm">
      <h5 className="mb-3" style={{ color: "#5d4037" }}>
        Seleccionar Productos
      </h5>

      {/* 2. Añadimos un scroll interno por si la lista es muy larga */}
      <div
        className="table-responsive"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <table className="table table-custom table-hover mb-0">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-end pe-3">Precio</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr
                key={p.id}
                onClick={() => agregarAlCarrito(p)}
                style={{ cursor: "pointer", transition: "0.2s" }}
              >
                <td>
                  <div className="fw-bold">{p.nombre}</div>
                  <small className="text-muted">{p.categoria}</small>
                </td>
                <td className="text-end pe-3 align-middle">
                  <span className="badge bg-light text-success border fw-bold">
                    ${p.precio.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaProductos;
