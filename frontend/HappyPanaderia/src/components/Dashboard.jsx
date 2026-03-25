import React, { useEffect } from "react";
import pan from "../assets/img/panaderia.jpg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  useEffect(() => {
    toast.info("Toca una fila para editar o eliminar un Producto o Cliente", {
      toastId: "dashboard-info",
      position: "bottom-right",
    });
  }, []);

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
      {/* Capa oscura */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Tarjeta */}
        <div className="card text-center p-4" style={{ maxWidth: "500px" }}>
          <h2 className="mb-3">Happy Panadería</h2>
          <p>
            Plataforma integral para la gestión comercial y operativa del
            negocio.
          </p>
          <p className="text-muted">
            Eficiencia, control y crecimiento en un solo lugar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
