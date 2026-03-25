import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../services/apirest";
import axios from "axios";

const Nuevo = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio") {
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
      .post(`${ApiUrl}productos`, producto)
      .then(() => {
        alert("Producto agregado!");
        navigate("/"); // vuelve al Dashboard
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Nuevo Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3 align-items-center">
          <label className="col-sm-2 col-form-label fs-4 fw-bold">
            Nombre :
          </label>
          <div className="col-sm-10">
            <input
              name="nombre"
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={producto.nombre}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <label className="col-sm-2 col-form-label fs-4 fw-bold">
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
          <label className="col-sm-2 col-form-label fs-4 fw-bold">
            Precio :
          </label>
          <div className="col-sm-10">
            <input
              name="precio"
              type="number"
              step="0.01"
              min="0"
              max="100"
              className="form-control"
              placeholder="Precio"
              value={producto.precio}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-success me-2">
              Guardar
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

export default Nuevo;
