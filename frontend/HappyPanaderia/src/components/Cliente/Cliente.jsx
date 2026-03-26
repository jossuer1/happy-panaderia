import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "../../services/apirest";

import TablaCliente from "./TablaCliente";
import FormularioCliente from "./FormularioCliente";

const Cliente = () => {
  const [modo, setModo] = useState("crear");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clientes, setClientes] = useState([]);

  const handleEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setModo("editar");
  };

  const handleCancelar = () => {
    setModo("crear");
    setClienteSeleccionado(null);
  };

  const obtenerClientes = () => {
    axios.get(ApiUrl + "Clientes").then((res) => {
      setClientes(res.data);
    });
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const recargar = () => {
    obtenerClientes();
    setModo("crear");
    setClienteSeleccionado(null);
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <br />
        <FormularioCliente
          modo={modo}
          clienteSeleccionado={clienteSeleccionado}
          onGuardado={recargar}
          onCancelar={handleCancelar}
        />
      </div>
      <div className="col-md-7">
        <TablaCliente onEditar={handleEditar} clientes={clientes} />
      </div>
    </div>
  );
};

export default Cliente;
