import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ApiUrl } from "../../services/apirest";
import axios from "axios";

const Actualizar = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(
    location.state?.producto || { nombre: "", categoria: "", precio: "" },
  );

  useEffect(() => {
    if (!location.state?.producto) {
      axios
        .get(`${ApiUrl}productos/${id}`)
        .then((response) => setProducto(response.data))
        .catch((error) => console.log(error));
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio") {
      // Reemplaza coma por punto y asegura solo números positivos <= 100
      let val = parseFloat(value.replace(",", "."));
      if (isNaN(val) || val < 0) val = 0;
      if (val > 100) val = 100;
      setProducto((prev) => ({ ...prev, [name]: val }));
    } else {
      setProducto((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const precio = parseFloat(producto.precio);
    if (isNaN(precio) || precio < 0 || precio > 100) {
      alert("El precio debe ser un número entre 0 y 100");
      return;
    }

    axios
      .put(`${ApiUrl}productos/${id}`, producto)
      .then(() => {
        alert("Producto actualizado!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro que deseas eliminar este producto?")) {
      axios
        .delete(`${ApiUrl}productos/${id}`)
        .then(() => {
          alert("Producto eliminado!");
          navigate("/"); // Redirige a la página principal
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Editar Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3 align-items-center">
          <label
            htmlFor="nombre"
            className="col-sm-2 col-form-label fs-4 fw-bold"
          >
            Nombre :
          </label>
          <div className="col-sm-10">
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={producto.nombre}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <label
            htmlFor="categoria"
            className="col-sm-2 col-form-label fs-4 fw-bold"
          >
            Categoría :
          </label>
          <div className="col-sm-10">
            <select
              name="categoria"
              className="form-select"
              value={producto.categoria}
              onChange={handleChange}
            >
              <option value="Panadería">Panadería</option>
              <option value="Repostería">Repostería</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>
        </div>

        <div className="row mb-4 align-items-center">
          <label
            htmlFor="precio"
            className="col-sm-2 col-form-label fs-4 fw-bold"
          >
            Precio :
          </label>
          <div className="col-sm-10">
            <input
              id="precio"
              name="precio"
              step="0.01" // permite decimales
              min="0" // no permite negativos
              max="100" // máximo permitido
              type="number"
              className="form-control"
              placeholder="Precio"
              value={producto.precio}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary me-2">
              Actualizar
            </button>
            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={handleDelete}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.history.back()}
            >
              Volver
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Actualizar;
