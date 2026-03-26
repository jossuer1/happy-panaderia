import React, { useEffect, useState } from "react";

import TablaProductos from "./TablaProductos";
import FormularioProducto from "./FormularioProductos";

import { ApiUrl } from "../../services/apirest";
import axios from "axios";

const Producto = () => {
  const [modo, setModo] = useState("crear");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [producto, setProducto] = useState([]);

  const handleEditar = (producto) => {
    setProductoSeleccionado(producto);
    setModo("editar");
  };

  const handleCancelar = () => {
    setModo("crear");
    setProductoSeleccionado(null);
  };

  useEffect(() => {
    axios.get(ApiUrl + "Productos").then((res) => {
      setProducto(res.data);
    });
  }, []);

  const recargar = () => {
    axios.get(ApiUrl + "Productos").then((res) => {
      setProducto(res.data);
      setModo("crear");
      setProductoSeleccionado(null);
    });
  };
  return (
    <div className="row">
      <div className="col-md-5">
        <br />
        <FormularioProducto
          modo={modo}
          productoSeleccionado={productoSeleccionado}
          onGuardado={recargar}
          onCancelar={handleCancelar}
        />
      </div>
      <div className="col-md-7">
        <TablaProductos onEditar={handleEditar} productos={producto} />
      </div>
    </div>
  );
};

export default Producto;
