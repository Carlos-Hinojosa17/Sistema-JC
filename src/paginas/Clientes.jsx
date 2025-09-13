import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ProductosTabla.css";

export default function Clientes() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", documento: "", telefono: "", estado: true });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleChange = e => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "estado") {
      setNuevoCliente({ ...nuevoCliente, estado: value === "true" });
    } else {
      setNuevoCliente({ ...nuevoCliente, [name]: value });
    }
  };
  const handleRegistrar = e => {
    e.preventDefault();
    handleClose();
    setNuevoCliente({ nombre: "", documento: "", telefono: "", estado: true });
  };

  // Simulación de clientes
  const clientes = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    nombre: `Cliente ${i + 1}`,
    documento: `DNI${10000000 + i}`,
    telefono: `999000${i.toString().padStart(2, "0")}`,
    estado: i % 2 === 0
  }));
  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.documento.toLowerCase().includes(busqueda.toLowerCase())
  );
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;
  const totalPaginas = Math.ceil(clientesFiltrados.length / porPagina);
  const clientesPagina = clientesFiltrados.slice((pagina - 1) * porPagina, pagina * porPagina);
  const cambiarPagina = (nueva) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPagina(nueva);
  };
  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  return (
    <div className="container-fluid">
      <div className="encabezado-productos d-flex justify-content-between align-items-center mb-4 p-4 rounded-4 shadow-sm bg-white border border-2 border-success-subtle">
        <div className="d-flex align-items-center gap-3">
          <span className="fs-1 text-success"><i className="bi bi-people"></i></span>
          <div>
            <h2 className="mb-0 fw-bold text-success">Clientes</h2>
            <div className="text-secondary small">Gestión y consulta de clientes registrados</div>
          </div>
        </div>
        <Button variant="success" size="lg" className="px-4 py-2 fw-semibold shadow-sm" onClick={handleShow}>
          <i className="bi bi-plus-circle me-2"></i>Registrar cliente
        </Button>
      </div>

      {/* Modal para registrar cliente */}
      <Modal show={showModal} onHide={handleClose} centered contentClassName="border-0 rounded-4 shadow-lg">
        <Modal.Header closeButton className="bg-success bg-gradient text-white rounded-top-4 border-0">
          <Modal.Title className="fw-bold">
            <span role="img" aria-label="Cliente">🧑‍💼</span> Registrar cliente
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRegistrar}>
          <Modal.Body className="bg-light">
            <div className="mb-4 text-center">
              <span className="fs-1 text-success"><i className="bi bi-person-plus"></i></span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoCliente.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Juan Pérez"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Documento</Form.Label>
              <Form.Control
                type="text"
                name="documento"
                value={nuevoCliente.documento}
                onChange={handleChange}
                required
                placeholder="Ej: DNI o RUC"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={nuevoCliente.telefono}
                onChange={handleChange}
                required
                placeholder="Ej: 999888777"
              />
            </Form.Group>
            <div className="mb-3">
              <Form.Label className="fw-semibold me-3">Estado:</Form.Label>
              <Form.Check
                inline
                label="Habilitado"
                name="estado"
                type="radio"
                id="estado-habilitado"
                value="true"
                checked={nuevoCliente.estado === true}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Deshabilitado"
                name="estado"
                type="radio"
                id="estado-deshabilitado"
                value="false"
                checked={nuevoCliente.estado === false}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-light border-0 rounded-bottom-4">
            <Button variant="secondary" onClick={handleClose} className="px-4">Cancelar</Button>
            <Button variant="success" type="submit" className="px-4">Registrar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Buscador */}
      <div className="mb-3 position-relative buscador-productos">
        <span className="lupa-buscador"><i className="bi bi-search"></i></span>
        <input
          type="text"
          className="form-control ps-5"
          placeholder="Buscar por nombre o documento..."
          value={busqueda}
          onChange={handleBusqueda}
        />
      </div>

      {/* Tabla de clientes */}
      <div className="table-responsive">
        <table className="table table-hover align-middle tabla-productos">
          <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th className="text-center">Nombre</th>
              <th className="text-center">Documento</th>
              <th className="text-center">Teléfono</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesPagina.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron clientes</td>
              </tr>
            ) : (
              clientesPagina.map(c => (
                <tr key={c.id} className="table-row-custom">
                  <td className="text-center fw-semibold">{c.nombre}</td>
                  <td className="text-center">{c.documento}</td>
                  <td className="text-center">{c.telefono}</td>
                  <td className="text-center">
                    <button className={`btn btn-sm ${c.estado ? "btn-success" : "btn-secondary"}`} disabled>
                      {c.estado ? "Habilitado" : "Deshabilitado"}
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-primary">Editar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item${pagina === 1 ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => cambiarPagina(pagina - 1)}>&laquo;</button>
            </li>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <li key={i} className={`page-item${pagina === i + 1 ? " active" : ""}`}>
                <button className="page-link" onClick={() => cambiarPagina(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${pagina === totalPaginas ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => cambiarPagina(pagina + 1)}>&raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
