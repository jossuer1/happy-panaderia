import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componentes
import Dashboard from "./components/Dashboard.jsx";
import Producto from "./components/Producto/Producto.jsx";
import Cliente from "./components/Cliente/Cliente.jsx";
import Venta from "./components/Ventas/Venta.jsx";
import Header from "./template/Header.jsx";

// Estilos
import "./assets/css/App.css";
import pan from "./assets/img/panaderia.jpg";

function App() {
  return (
    <Router>
      <div
        className="app-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${pan})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Esto hace que el fondo se quede quieto al hacer scroll
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Header />

        {/* Contenedor principal con padding para que el contenido no pegue al header */}
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/producto" element={<Producto />} />
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/venta" element={<Venta />} />
          </Routes>
        </main>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
