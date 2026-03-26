import { useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../services/apirest";

import ListaProductos from "./ListaProductos";
import Carrito from "./Carrito";
import ModalPago from "./ModalPago";
import Factura from "./Factura";

const Venta = () => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [factura, setFactura] = useState(null);

  // AGREGAR PRODUCTO
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p,
        ),
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // PROCESAR VENTA
  const procesarVenta = async (clienteId = null) => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const data = {
      ClienteId: clienteId,
      Detalles: carrito.map((item) => ({
        ProductoId: item.id,
        Cantidad: item.cantidad,
      })),
    };

    try {
      const res = await axios.post(ApiUrl + "Facturas", data);

      setFactura(res.data); // guardar factura
      setCarrito([]); // limpiar carrito
      setMostrarPago(false); // cerrar modal
    } catch (error) {
      console.error(
        "Detalle del error:",
        error.response?.data || error.message,
      );
      alert("Error al procesar venta. Revisa la consola.");
    }
  };

  // NUEVA VENTA
  const nuevaVenta = () => {
    setFactura(null);
  };

  // SI HAY FACTURA → MOSTRAR
  if (factura) {
    return <Factura venta={factura} onNuevaVenta={nuevaVenta} />;
  }

  // SI NO → SISTEMA NORMAL
  return (
    <div className="row">
      <div className="col-md-5">
        <Carrito
          carrito={carrito}
          setCarrito={setCarrito}
          onPagar={() => setMostrarPago(true)}
        />
      </div>

      {mostrarPago && (
        <ModalPago
          carrito={carrito}
          onClose={() => setMostrarPago(false)}
          onProcesar={procesarVenta} // Aquí se llama a la función que procesa la venta
        />
      )}

      <div className="col-md-7">
        <ListaProductos agregarAlCarrito={agregarAlCarrito} />
      </div>
    </div>
  );
};

export default Venta;
