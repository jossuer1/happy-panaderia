import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "../../services/apirest";
import FormularioCliente from "../Cliente/FormularioCliente";

const ModalPago = ({ onClose, onProcesar }) => {
  const [vista, setVista] = useState("pregunta_inicial"); // Controla qué pantalla vemos
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  // Cargar clientes solo si se necesita buscar
  useEffect(() => {
    if (vista === "buscar_registrado") {
      axios.get(ApiUrl + "clientes").then((res) => {
        setClientes(res.data);
      });
    }
  }, [vista]);

  // Filtro local por Cédula o Nombre
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.cedula.toString().includes(busqueda) ||
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Finalizar Venta</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body py-4">
              {/* PASO 1: ¿Registrado? */}
              {vista === "pregunta_inicial" && (
                <div className="text-center">
                  <p className="mb-4 fw-bold">
                    ¿El cliente ya está registrado?
                  </p>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-success btn-lg"
                      onClick={() => setVista("buscar_registrado")}
                    >
                      SÍ, buscar en el sistema
                    </button>
                    <button
                      className="btn btn-outline-primary btn-lg"
                      onClick={() => setVista("registrar_nuevo")}
                    >
                      NO, registrar ahora
                    </button>
                    <hr />
                    <button
                      className="btn btn-secondary"
                      onClick={() => onProcesar(null)}
                    >
                      Consumidor Final
                    </button>
                  </div>
                </div>
              )}

              {/* PASO 2A: Buscador con Filtro */}
              {vista === "buscar_registrado" && (
                <div className="animate__animated animate__fadeIn">
                  <label className="form-label fw-bold">
                    Buscar por Cédula o Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Escriba aquí..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />

                  <select
                    className="form-select mb-3"
                    size="5"
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                  >
                    {clientesFiltrados.length > 0 ? (
                      clientesFiltrados.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.cedula} - {c.nombre}
                        </option>
                      ))
                    ) : (
                      <option disabled>No se encontraron resultados</option>
                    )}
                  </select>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary w-100"
                      disabled={!clienteSeleccionado}
                      onClick={() => onProcesar(clienteSeleccionado)}
                    >
                      Seleccionar y Facturar
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => setVista("pregunta_inicial")}
                    >
                      Volver
                    </button>
                  </div>
                </div>
              )}

              {/* PASO 2B: Registrar Nuevo*/}
              {vista === "registrar_nuevo" && (
                <div className="animate__animated animate__fadeIn">
                  <FormularioCliente
                    modo="crear"
                    onGuardado={() => setVista("buscar_registrado")} // Al guardar, lo mandamos a buscarlo
                    onCancelar={() => setVista("pregunta_inicial")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPago;
