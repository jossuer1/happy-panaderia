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

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  return (
    <div>
      <h5>Carrito</h5>

      {carrito.length === 0 ? (
        <p className="text-muted">🛒 Carrito vacío</p>
      ) : (
        <>
          <ul className="list-group">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.nombre} <br />
                  <small>
                    ${item.precio} x {item.cantidad}
                  </small>
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-success me-1"
                    onClick={() => aumentar(item.id)}
                  >
                    ➕
                  </button>

                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => disminuir(item.id)}
                  >
                    ➖
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminar(item.id)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h5 className="mt-3">Total: ${total.toFixed(2)}</h5>

          {/*  BOTÓN CLAVE */}
          <button className="btn btn-primary w-100 mt-3" onClick={onPagar}>
            Pagar
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
