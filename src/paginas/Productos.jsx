import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ProductosTabla.css";

export default function Productos() {
  // Estado para el buscador y productos de ejemplo
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  // Estado para el formulario de registro (simulado)
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", categoria: "", precio: "", estado: true });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleChange = e => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "estado") {
      setNuevoProducto({ ...nuevoProducto, estado: value === "true" });
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };
  const handleRegistrar = e => {
    e.preventDefault();
    // Aquí iría la lógica para registrar el producto
    handleClose();
    setNuevoProducto({ nombre: "", categoria: "", precio: "" });
    // Podrías mostrar un mensaje de éxito o actualizar la lista
  };

  // Simulación de más productos para paginación
  const productos = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    codigo: `Producto ${i + 1}`,
    descripcion: `Detalle mas largo para espacio ${i + 1}`,
    stock: 10 + i,
    preCompra: 50 + i * 10,
    preEspecial: 60 + i * 10,
    prePorMayor: 70 + i * 10,
    preGeneral: 90 + i * 10,
    estado: true // habilitado por defecto
  }));

  const productosFiltrados = productos.filter(p =>
    p.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación
  const [pagina, setPagina] = useState(1);
  const porPagina = 15;
  const totalPaginas = Math.ceil(productosFiltrados.length / porPagina);
  const productosPagina = productosFiltrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  const cambiarPagina = (nueva) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPagina(nueva);
  };

  // Cuando el usuario escribe en el buscador, siempre vuelve a la página 1
  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  return (
    <div className="container-fluid">
      {/* Encabezado y botón de registrar */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-4 rounded-4 shadow-sm bg-white border border-2 border-success-subtle" style={{background: 'linear-gradient(90deg, #e9f7ef 0%, #f8fafc 100%)'}}>
        <div className="d-flex align-items-center gap-3">
          <span className="fs-1 text-success"><i className="bi bi-box-seam"></i></span>
          <div>
            <h2 className="mb-0 fw-bold text-success">Productos</h2>
            <div className="text-secondary small">Gestión y consulta de productos registrados</div>
          </div>
        </div>
        <Button variant="success" size="lg" className="px-4 py-2 fw-semibold shadow-sm" onClick={handleShow}>
          <i className="bi bi-plus-circle me-2"></i>Registrar producto
        </Button>
      </div>

      {/* Modal para registrar producto */}
      <Modal show={showModal} onHide={handleClose} centered contentClassName="border-0 rounded-4 shadow-lg">
        <Modal.Header closeButton className="bg-success bg-gradient text-white rounded-top-4 border-0">
          <Modal.Title className="fw-bold">
            <span role="img" aria-label="Caja">📦</span> Registrar producto
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRegistrar}>
          <Modal.Body className="bg-light">
            <div className="mb-4 text-center">
              <span className="fs-1 text-success"><i className="bi bi-box-seam"></i></span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Código</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={nuevoProducto.codigo}
                onChange={handleChange}
                required
                placeholder="Ej: P001"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
                required
                placeholder="Ej: Mouse inalámbrico Logitech"
              />
            </Form.Group>
            <div className="row">
              <div className="mb-3">
                <Form.Label className="fw-semibold me-3">Estado:</Form.Label>
                <Form.Check
                  inline
                  label="Habilitado"
                  name="estado"
                  type="radio"
                  id="estado-habilitado"
                  value="true"
                  checked={nuevoProducto.estado === true}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Deshabilitado"
                  name="estado"
                  type="radio"
                  id="estado-deshabilitado"
                  value="false"
                  checked={nuevoProducto.estado === false}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Precio de Compra</Form.Label>
                  <Form.Control
                    type="number"
                    name="preCompra"
                    value={nuevoProducto.preCompra}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="Ej: 50"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Precio Especial</Form.Label>
                  <Form.Control
                    type="number"
                    name="preEspecial"
                    value={nuevoProducto.preEspecial}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="Ej: 60"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Precio por Mayor</Form.Label>
                  <Form.Control
                    type="number"
                    name="prePorMayor"
                    value={nuevoProducto.prePorMayor}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="Ej: 70"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Precio General</Form.Label>
                  <Form.Control
                    type="number"
                    name="preGeneral"
                    value={nuevoProducto.preGeneral}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="Ej: 90"
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-light border-0 rounded-bottom-4">
            <Button variant="secondary" onClick={handleClose} className="px-4">Cancelar</Button>
            <Button variant="success" type="submit" className="px-4">Registrar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por código o descripción..."
          value={busqueda}
          onChange={handleBusqueda}
        />
      </div>

      {/* Tabla de productos */}
      <div className="table-responsive">
        <table className="table table-hover align-middle tabla-productos">
          <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th className="text-center">Código</th>
              <th className="text-center">Descripción</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Precio Compra</th>
              <th className="text-center">Precio Especial</th>
              <th className="text-center">Precio por Mayor</th>
              <th className="text-center">Precio General</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosPagina.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">No se encontraron productos</td>
              </tr>
            ) : (
              productosPagina.map(p => (
                <tr key={p.id} className="table-row-custom">
                  <td className="text-center fw-semibold">{p.codigo}</td>
                  <td>{p.descripcion}</td>
                  <td className={`text-center fw-bold ${p.stock < 5 ? 'text-danger' : p.stock <= 15 ? 'text-warning' : 'text-success'}`}>{p.stock}</td>
                  <td className="text-center">S/{p.preCompra}</td>
                  <td className="text-center">S/{p.preEspecial}</td>
                  <td className="text-center">S/{p.prePorMayor}</td>
                  <td className="text-center">S/{p.preGeneral}</td>
                  <td className="text-center">
                    <button className={`btn btn-sm ${p.estado ? "btn-success" : "btn-secondary"}`} disabled>
                      {p.estado ? "Habilitado" : "Deshabilitado"}
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
