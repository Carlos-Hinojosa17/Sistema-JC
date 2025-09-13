import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ProductosTabla.css";

export default function Almacen() {
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nuevoItem, setNuevoItem] = useState({ codigo: "", descripcion: "", stock: "", estado: true });
  const [codigoNoExiste, setCodigoNoExiste] = useState(false);
  // Simulación de base de datos local para búsqueda por código
  const [itemsDB] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      codigo: `A${i + 1}`,
      descripcion: `Artículo de almacén ${i + 1}`,
      stock:  - i * 2,
      estado: i % 2 === 0
    }))
  );

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleChange = e => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "estado") {
      setNuevoItem({ ...nuevoItem, estado: value === "true" });
    } else {
      setNuevoItem({ ...nuevoItem, [name]: value });
    }
  };

  // Buscar producto por código y autocompletar
  const handleCodigoBlur = () => {
    const encontrado = itemsDB.find(item => item.codigo.toLowerCase() === nuevoItem.codigo.trim().toLowerCase());
    if (encontrado) {
      setNuevoItem({
        codigo: encontrado.codigo,
        descripcion: encontrado.descripcion,
        stock: encontrado.stock,
        estado: encontrado.estado
      });
      setCodigoNoExiste(false);
    } else {
      setCodigoNoExiste(true);
      setNuevoItem({ ...nuevoItem, descripcion: "" });
    }
  };
  const handleRegistrar = e => {
    e.preventDefault();
    handleClose();
    setNuevoItem({ codigo: "", descripcion: "", stock: "", estado: true });
  };

  // Simulación de items de almacén
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    codigo: `A${i + 1}`,
    descripcion: `Artículo de almacén ${i + 1}`,
    stock: 100 - i * 2,
    estado: i % 2 === 0
  }));
  const itemsFiltrados = items.filter(item =>
    item.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;
  const totalPaginas = Math.ceil(itemsFiltrados.length / porPagina);
  const itemsPagina = itemsFiltrados.slice((pagina - 1) * porPagina, pagina * porPagina);
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
          <span className="fs-1 text-success"><i className="bi bi-archive"></i></span>
          <div>
            <h2 className="mb-0 fw-bold text-success">Almacén</h2>
            <div className="text-secondary small">Gestión y consulta de stock de almacén</div>
          </div>
        </div>
        <Button variant="success" size="lg" className="px-4 py-2 fw-semibold shadow-sm" onClick={handleShow}>
          <i className="bi bi-plus-circle me-2"></i>Registrar ítem
        </Button>
      </div>

      {/* Modal para registrar ítem */}
      <Modal show={showModal} onHide={handleClose} centered contentClassName="border-0 rounded-4 shadow-lg">
        <Modal.Header closeButton className="bg-success bg-gradient text-white rounded-top-4 border-0">
          <Modal.Title className="fw-bold">
            <span role="img" aria-label="Almacen">🏷️</span> Registrar ítem
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRegistrar}>
          <Modal.Body className="bg-light">
            <div className="mb-4 text-center">
              <span className="fs-1 text-success"><i className="bi bi-archive"></i></span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Código</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={nuevoItem.codigo}
                onChange={handleChange}
                onBlur={handleCodigoBlur}
                required
                placeholder="Ej: A001"
                autoFocus
              />
              <Form.Text className="text-muted">Si el código existe, los datos se autocompletarán.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={nuevoItem.descripcion}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>
            {codigoNoExiste && (
              <div className="alert alert-warning py-2" role="alert">
                El código ingresado no existe en el almacén.
              </div>
            )}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={nuevoItem.stock}
                onChange={handleChange}
                required
                min="0"
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
                checked={nuevoItem.estado === true}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Deshabilitado"
                name="estado"
                type="radio"
                id="estado-deshabilitado"
                value="false"
                checked={nuevoItem.estado === false}
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
          placeholder="Buscar por código o descripción..."
          value={busqueda}
          onChange={handleBusqueda}
        />
      </div>

      {/* Tabla de almacén */}
      <div className="table-responsive">
        <table className="table table-hover align-middle tabla-productos">
          <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th className="text-center">Código</th>
              <th className="text-center">Descripción</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {itemsPagina.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron ítems</td>
              </tr>
            ) : (
              itemsPagina.map(item => (
                <tr key={item.id} className="table-row-custom">
                  <td className="text-center fw-semibold">{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className={`text-center fw-bold ${item.stock < 5 ? 'text-danger' : item.stock <= 15 ? 'text-warning' : 'text-success'}`}>{item.stock}</td>
                  <td className="text-center">
                    <button className={`btn btn-sm ${item.estado ? "btn-success" : "btn-secondary"}`} disabled>
                      {item.estado ? "Habilitado" : "Deshabilitado"}
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-primary">Nuevo ingreso</button>
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
