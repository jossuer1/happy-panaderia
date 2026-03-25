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
    <div className="container">
      <h3>Lista de Productos</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id} onClick={() => agregarAlCarrito(p)}>
              <td>{p.nombre}</td>
              <td>${p.precio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
