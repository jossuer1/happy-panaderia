import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
// Productos CRUD
import Producto from "./components/Producto/Producto.jsx";

import Header from "./template/Header.jsx";
import pan from "./assets/img/panaderia.jpg";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${pan})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/producto" element={<Producto />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
