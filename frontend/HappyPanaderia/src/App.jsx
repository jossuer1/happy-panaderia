import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Componentes
import Dashboard from "./components/Dashboard.jsx";
// Productos CRUD
import Producto from "./components/Producto/Producto.jsx";
// Clientes CRUD
import Cliente from "./components/Cliente/Cliente.jsx";
// Ventas CRUD
import Venta from "./components/Ventas/Venta.jsx";

import Header from "./template/Header.jsx";
import pan from "./assets/img/panaderia.jpg";

function App() {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${pan})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/producto" element={<Producto />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/venta" element={<Venta />} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
