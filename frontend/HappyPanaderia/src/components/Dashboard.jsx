import React from "react";
import pan from "../assets/img/panaderia.jpg";

class Dashboard extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${pan})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "91.78vh",
          position: "relative",
        }}
      >
        {/* Capa oscura encima de la imagen */}
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Tarjeta principal */}
          <div className="card text-center p-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-3">Happy Panadería</h2>
            <p>
              Plataforma integral para la gestión comercial y operativa del
              negocio, diseñada para optimizar procesos de venta, control de
              productos y administración de clientes.
            </p>
            <p className="text-muted">
              Eficiencia, control y crecimiento en un solo lugar.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
