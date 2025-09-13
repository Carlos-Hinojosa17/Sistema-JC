import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Lateral.css";
import { useNavigate } from "react-router-dom";


export default function Lateral() {
  // Simulación de usuario conectado
    const usuario = "Usuario Demo";

    const navigate=useNavigate();

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div
        className="p-3 shadow-lg text-white d-flex flex-column align-items-center"
        style={{ width: "240px", minHeight: "96vh" }}
      >
        <div className="mb-4 text-center">
          <img src="/src/assets/Logo.png" alt="Logo" className="lateral-logo" />
        </div>

        <div className="w-100 text-center mb-3 p-2 bg-warning bg-gradient rounded">
          <span className="fw-bold text-dark">Bienvenido,</span>
          <div className="text-dark">{usuario}</div>
        </div>
        
        <Nav className="flex-column w-100">
          <Nav.Link as={Link} to="/layouts/Principal" className="mb-2 sidebar-link">
            <span role="img" aria-label="Inicio">🏠</span> Inicio
          </Nav.Link>
          <Nav.Link as={Link} to="/layouts/Venta" className="mb-2 sidebar-link">
            <span role="img" aria-label="Ventas">🛒</span> Ventas
          </Nav.Link>
          <Nav.Link as={Link} to="#" className="mb-2 sidebar-link">
            <span role="img" aria-label="Cotizaciones">📝</span> Cotizaciones
          </Nav.Link>
          <Nav.Link as={Link} to="/layouts/Producto" className="mb-2 sidebar-link">
            <span role="img" aria-label="Productos">📦</span> Productos
          </Nav.Link>
          <Nav.Link as={Link} to="/layouts/Cliente" className="mb-2 sidebar-link">
            <span role="img" aria-label="Clientes">👥</span> Clientes
          </Nav.Link>
          <Nav.Link as={Link} to="/layouts/Almacen" className="mb-2 sidebar-link">
            <span role="img" aria-label="Almacén">🏬</span> Almacén
          </Nav.Link>
        </Nav>
        {/* Botón de salir */}
    <div className="w-100 mt-auto">
      <button className="btn btn-danger w-100" onClick={() => navigate("/")}>Salir</button>
    </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4 bg-warning bg-gradient" style={{ overflowY: "auto" }}>
        <Outlet /> {/* Aquí se cargará la página correspondiente */}
      </div>
    </div>
  );
}
