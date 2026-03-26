import React, { useEffect, useState } from "react";
import { ApiUrl } from "../../services/apirest";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormularioCliente = ({
  modo,
  clienteSeleccionado,
  onGuardado,
  handleDelete,
  onCancelar,
}) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
  });

  useEffect(() => {
    if (modo === "editar" && clienteSeleccionado) {
      setCliente(clienteSeleccionado);
    } else {
      setCliente({ nombre: "", cedula: "", direccion: "" });
    }
  }, [modo, clienteSeleccionado]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cedula = parseInt(cliente.cedula);
    if (isNaN(cedula) || cedula <= 0) {
      toast.error("La cédula o RUC debe ser válida", {
        position: "bottom-right",
      });
      return;
    }

    if (modo === "editar") {
      axios.put(`${ApiUrl}clientes/${cliente.id}`, cliente).then(() => {
        toast.info("Cliente actualizado!", {
          position: "bottom-right",
        });
        onGuardado();
      });
    } else {
      axios.post(`${ApiUrl}clientes`, cliente).then(() => {
        toast.success("Cliente agregado!", {
          position: "bottom-right",
        });
        onGuardado();
      });
    }

    setCliente({ nombre: "", cedula: "", direccion: "" });
  };

  return (
    /* 1. Cambiamos 'card shadow border-0' por 'glass-card' */
    <div className="glass-card border-0">
      {/* 2. Suavizamos el header: quitamos bg-success/warning y usamos estilos en línea o clases sutiles */}
      <div
        className="card-header border-0 text-white"
        style={{
          backgroundColor: modo === "editar" ? "#d35400" : "#8fa382",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <h5 className="mb-0 py-1">
          {modo === "editar" ? "Editando Cliente" : " Nuevo Cliente"}
        </h5>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted small fw-bold">
              Nombre Completo
            </label>
            <div className="input-group">
              <span className="input-group-text border-0 bg-light">
                <i className="bi bi-person text-secondary"></i>
              </span>
              {/* 3. Añadimos 'border-0 bg-light' a los inputs para eliminar el borde negro fuerte */}
              <input
                name="nombre"
                className="form-control border-0 bg-light"
                placeholder="Ej. Juan Pérez"
                value={cliente.nombre}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small fw-bold">
              Cédula o RUC
            </label>
            <div className="input-group">
              <span className="input-group-text border-0 bg-light">
                <i className="bi bi-card-text text-secondary"></i>
              </span>
              <input
                name="cedula"
                className="form-control border-0 bg-light"
                placeholder="172xxxxxxx"
                value={cliente.cedula}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-muted small fw-bold">
              Dirección de Domicilio
            </label>
            <div className="input-group">
              <span className="input-group-text border-0 bg-light">
                <i className="bi bi-geo-alt text-secondary"></i>
              </span>
              <input
                name="direccion"
                className="form-control border-0 bg-light"
                placeholder="Calle Principal y Secundaria"
                value={cliente.direccion}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-grid gap-2">
            {modo === "editar" ? (
              <div className="row g-2">
                <div className="col-12">
                  <button className="btn btn-primary w-100 shadow-sm border-0">
                    Actualizar Cliente
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 border-2"
                    onClick={() => handleDelete(cliente)}
                  >
                    Eliminar
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-light w-100 border-0"
                    onClick={onCancelar}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              /* 4. Usamos la clase 'btn-pan' que definimos en el CSS */
              <button className="btn btn-pan btn-lg shadow-sm">
                Guardar Cliente
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCliente;
