import { useEffect, useState } from "react";
import "./assets/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./components/Dashboard.jsx";
import Nuevo from "./components/Nuevo.jsx";
import Actualizar from "./components/Actualizar.jsx";
import Eliminar from "./components/Eliminar.jsx";
import Producto from "./components/Producto.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nuevo" element={<Nuevo />} />
          <Route path="/actualizar" element={<Actualizar />} />
          <Route path="/eliminar" element={<Eliminar />} />
          <Route path="/producto" element={<Producto />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
