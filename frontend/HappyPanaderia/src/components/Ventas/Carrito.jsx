const Carrito = ({ carrito, setCarrito, onPagar }) => {
  const aumentar = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
      ),
    );
  };

  const disminuir = (id) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // LÓGICA DE CÁLCULOS
  const subtotalBase = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
  const iva = subtotalBase * 0.15; // IVA al 15%
  const totalFinal = subtotalBase + iva;

  return (
    <div className="glass-card p-4 shadow-sm">
      <h5
        className="mb-4"
        style={{
          color: "#5d4037",
          borderBottom: "2px dashed #d3d3d3",
          paddingBottom: "10px",
        }}
      >
        Resumen de Compra
      </h5>

      {carrito.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted italic">El carrito está vacío</p>
        </div>
      ) : (
        <>
          <div
            className="mb-3"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <ul className="list-group list-group-flush">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-light"
                >
                  <div className="me-auto">
                    <span
                      className="fw-bold d-block"
                      style={{ color: "#5d4037" }}
                    >
                      {item.nombre}
                    </span>
                    <small className="text-muted">
                      ${item.precio.toFixed(2)} x {item.cantidad}
                    </small>
                  </div>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-warning me-1"
                      style={{
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        padding: "0",
                      }}
                      onClick={() => disminuir(item.id)}
                    >
                      -
                    </button>
                    <span className="fw-bold mx-2">{item.cantidad}</span>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      style={{
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        padding: "0",
                      }}
                      onClick={() => aumentar(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-link text-danger p-0"
                      onClick={() => eliminar(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* SECCIÓN DE TOTALES DESGLOSADOS */}
          <div
            className="mt-4 pt-3"
            style={{ borderTop: "2px dashed #d3d3d3" }}
          >
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Subtotal:</span>
              <span>${subtotalBase.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between small text-muted mb-2">
              <span>IVA (15%):</span>
              <span>${iva.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="h5 mb-0 fw-bold" style={{ color: "#5d4037" }}>
                Total:
              </span>
              <span className="h4 mb-0 fw-bold text-success">
                ${totalFinal.toFixed(2)}
              </span>
            </div>

            <button
              className="btn btn-pan w-100 py-2 fw-bold shadow-sm"
              onClick={onPagar}
            >
              PAGAR AHORA
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
