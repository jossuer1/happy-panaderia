import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../services/apirest";
import FormularioCliente from "../Cliente/FormularioCliente";

const ModalPago = ({ onClose, onProcesar }) => {
  const [vista, setVista] = useState("pregunta_inicial");
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  useEffect(() => {
    if (vista === "buscar_registrado") {
      axios.get(ApiUrl + "clientes").then((res) => {
        setClientes(res.data);
      });
    }
  }, [vista]);

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.cedula.toString().includes(busqueda) ||
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <>
      {/* Fondo oscuro con desenfoque */}
      <div
        className="modal-backdrop fade show"
        style={{
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      ></div>

      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          {/* 1. Cambiamos modal-content por glass-card */}
          <div className="modal-content glass-card border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold" style={{ color: "#5d4037" }}>
                Finalizar Venta
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body py-4">
              {/* PASO 1: ¿Registrado? */}
              {vista === "pregunta_inicial" && (
                <div className="text-center animate__animated animate__fadeIn">
                  <p className="mb-4 text-muted">
                    ¿Cómo desea registrar esta venta?
                  </p>
                  <div className="d-grid gap-3">
                    <button
                      className="btn btn-pan btn-lg py-3 shadow-sm fw-bold"
                      onClick={() => setVista("buscar_registrado")}
                    >
                      <i className="bi bi-search me-2"></i>
                      Cliente Registrado
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-lg py-3 fw-bold"
                      style={{ borderStyle: "dashed", borderWidth: "2px" }}
                      onClick={() => setVista("registrar_nuevo")}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Nuevo Cliente
                    </button>

                    <div className="d-flex align-items-center my-2 text-muted">
                      <hr className="flex-grow-1" />{" "}
                      <span className="mx-2 small">O</span>{" "}
                      <hr className="flex-grow-1" />
                    </div>

                    <button
                      className="btn btn-light btn-lg text-secondary fw-bold"
                      onClick={() => onProcesar(null)}
                    >
                      <i className="bi bi-person-dash me-2"></i>
                      Consumidor Final
                    </button>
                  </div>
                </div>
              )}

              {/* PASO 2A: Buscador */}
              {vista === "buscar_registrado" && (
                <div className="animate__animated animate__fadeIn">
                  <label className="form-label small fw-bold text-muted">
                    BUSCAR POR CÉDULA O NOMBRE:
                  </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text border-0 bg-light">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 bg-light"
                      placeholder="Ej: 172xxxxxxx"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>

                  <select
                    className="form-select border-0 bg-light mb-3 shadow-inner"
                    size="5"
                    style={{ borderRadius: "12px" }}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                  >
                    {clientesFiltrados.length > 0 ? (
                      clientesFiltrados.map((c) => (
                        <option key={c.id} value={c.id} className="py-2">
                          📌 {c.cedula} - {c.nombre}
                        </option>
                      ))
                    ) : (
                      <option disabled>No se encontraron resultados</option>
                    )}
                  </select>

                  <div className="d-flex gap-2 pt-2">
                    <button
                      className="btn btn-pan w-100 fw-bold"
                      disabled={!clienteSeleccionado}
                      onClick={() => onProcesar(clienteSeleccionado)}
                    >
                      FACTURAR AHORA
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

              {/* PASO 2B: Registrar Nuevo */}
              {vista === "registrar_nuevo" && (
                <div className="animate__animated animate__fadeIn">
                  {/* El FormularioCliente ya tiene sus propios estilos de glass-card internos */}
                  <FormularioCliente
                    modo="crear"
                    onGuardado={() => setVista("buscar_registrado")}
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
