import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      // Cambiamos navbar-dark bg-dark por navbar-custom y añadimos sticky-top
      <nav className="navbar navbar-expand-lg sticky-top navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white" to="/">
            🥖 Happy Panadería
          </Link>
          <div className="d-flex">
            {/* Usamos enlaces más limpios y el botón resaltado para Ventas */}
            <Link
              className="btn btn-link text-white-50 text-decoration-none me-3"
              to="/cliente"
            >
              Clientes
            </Link>
            <Link
              className="btn btn-link text-white-50 text-decoration-none me-3"
              to="/producto"
            >
              Productos
            </Link>
            <Link
              className="btn btn-outline-warning px-4"
              to="/venta"
              style={{ borderRadius: "20px" }}
            >
              Ventas
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
