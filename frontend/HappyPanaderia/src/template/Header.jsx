import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Happy Panadería
        </Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/cliente">
            Clientes
          </Link>
          <Link className="btn btn-outline-light me-2" to="/producto">
            Productos
          </Link>
          <Link className="btn btn-outline-light" to="/venta">
            Ventas
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
