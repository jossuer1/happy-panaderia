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
        toast.info("Producto actualizado!", { position: "bottom-right" });
        onGuardado();
      });
    } else {
      axios.post(`${ApiUrl}productos`, producto).then(() => {
        toast.success("Producto agregado!", { position: "bottom-right" });
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
        toast.error("Producto eliminado!", { position: "bottom-right" });
        onGuardado();
      });
    }
  };

  return (
    /* 1. Usamos glass-card para el efecto de transparencia */
    <div className="glass-card border-0">
      <div
        className="card-header border-0 text-white"
        style={{
          backgroundColor: modo === "editar" ? "#d35400" : "#8fa382",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <h5 className="mb-0 py-1">
          {modo === "editar" ? " Editando producto" : "Nuevo producto"}
        </h5>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label text-muted small fw-bold">
              Nombre del Producto
            </label>
            <input
              name="nombre"
              className="form-control border-0 bg-light"
              placeholder="Ej. Pan de ambato"
              value={producto.nombre}
              onChange={handleChange}
            />
          </div>

          {/* Categoría */}
          <div className="mb-3">
            <label className="form-label text-muted small fw-bold">
              Categoría
            </label>
            <select
              name="categoria"
              className="form-select border-0 bg-light"
              value={producto.categoria}
              onChange={handleChange}
            >
              <option value="Panadería">Panadería</option>
              <option value="Repostería">Repostería</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>

          {/* Precio */}
          <div className="mb-4">
            <label className="form-label text-muted small fw-bold">
              Precio ($)
            </label>
            <input
              name="precio"
              type="number"
              step="0.01"
              className="form-control border-0 bg-light"
              placeholder="0.00"
              value={producto.precio}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid gap-2">
            {modo === "editar" ? (
              <div className="row g-2">
                <div className="col-12">
                  <button className="btn btn-primary w-100 shadow-sm border-0">
                    Actualizar
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              /* 2. Usamos la clase btn-pan para el botón principal */
              <button className="btn btn-pan btn-lg shadow-sm">
                Guardar Producto
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioProducto;
