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
    <div>
      <h4>{modo === "editar" ? "Editando cliente" : "Nuevo cliente"}</h4>

      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          className="form-control mb-2"
          placeholder="Nombre"
          value={cliente.nombre}
          onChange={handleChange}
        />

        <input
          name="cedula"
          className="form-control mb-2"
          placeholder="Cedula o RUC"
          value={cliente.cedula}
          onChange={handleChange}
        />

        <input
          name="direccion"
          className="form-control mb-3"
          placeholder="Dirección"
          value={cliente.direccion}
          onChange={handleChange}
        />

        {modo === "editar" ? (
          <>
            <button className="btn btn-primary me-2">Actualizar</button>

            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={() => handleDelete(cliente)}
            >
              Eliminar
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelar}
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

export default FormularioCliente;
