import React, { useEffect, useState } from "react";
import { ApiUrl } from "../../services/apirest";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormularioProducto = ({
  modo,
  productoSeleccionado,
  onGuardado,
  onCancelar,
}) => {
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "Panadería",
    precio: "",
  });

  // Cargar datos cuando es edición
  useEffect(() => {
    if (modo === "editar" && productoSeleccionado) {
      setProducto(productoSeleccionado);
    }
  }, [modo, productoSeleccionado]);

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
      toast.error("El precio debe ser entre 0 y 100", {
        position: "bottom-right",
      });
      return;
    }

    if (modo === "editar") {
      axios.put(`${ApiUrl}productos/${producto.id}`, producto).then(() => {
        toast.info("Producto actualizado!", {
          position: "bottom-right",
        });
        onGuardado();
      });
    } else {
      axios.post(`${ApiUrl}productos`, producto).then(() => {
        toast.success("Producto agregado!", {
          position: "bottom-right",
        });
        onGuardado();
      });
    }

    setProducto({ nombre: "", categoria: "Panadería", precio: "" });
  };

  const handleCancelar = () => {
    setProducto({ nombre: "", categoria: "Panadería", precio: "" });
    onCancelar();
  };

  const handleDelete = () => {
    if (!producto.id) return;

    if (window.confirm("¿Eliminar producto?")) {
      axios.delete(`${ApiUrl}productos/${producto.id}`).then(() => {
        toast.error("Producto eliminado!", {
          position: "bottom-right",
        });
        onGuardado();
      });
    }
  };

  return (
    <div>
      <h4>{modo === "editar" ? " Editando producto" : "Nuevo producto"}</h4>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          className="form-control mb-2"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
        />

        <select
          name="categoria"
          className="form-select mb-2"
          value={producto.categoria}
          onChange={handleChange}
        >
          <option value="Panadería">Panadería</option>
          <option value="Repostería">Repostería</option>
          <option value="Bebidas">Bebidas</option>
        </select>

        <input
          name="precio"
          type="number"
          className="form-control mb-3"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
        />

        {modo === "editar" ? (
          <>
            <button className="btn btn-primary me-2">Actualizar</button>

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
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button className="btn btn-success">Guardar</button>
        )}
      </form>
    </div>
  );
};

export default FormularioProducto;
