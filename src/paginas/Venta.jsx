import React, { useState } from "react";

import TablaProductos from "./TablaProductos";
import TablaAgregados from "./TablaAgregados";
import ClienteSelector from "./ClienteSelector";
import "./VentaTablas.css";

export default function Ventas() {
  const [busqueda, setBusqueda] = useState("");
  const [tipoPrecio, setTipoPrecio] = useState("general");
  const [pagina, setPagina] = useState(1);
  const [cantidadAgregar, setCantidadAgregar] = useState({});
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [cliente, setCliente] = useState("");
  // Para resetear ClienteSelector
  const [resetCliente, setResetCliente] = useState(0);

  // Simulación de productos
  const productos = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    codigo: `Producto ${i + 1}`,
    descripcion: `Detalle mas largo para espacio ${i + 1}`,
    stock: 10 + i,
    preCompra: 50 + i * 10,
    preEspecial: 60 + i * 10,
    prePorMayor: 70 + i * 10,
    preGeneral: 90 + i * 10,
    estado: true
  }));

  // Filtrado y paginación
  const productosFiltrados = productos.filter(p =>
    p.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );
  const porPagina = 5;
  const totalPaginas = Math.ceil(productosFiltrados.length / porPagina);
  const productosPagina = productosFiltrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  // Handlers
  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };
  const cambiarPagina = (nueva) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPagina(nueva);
  };
  // Editar precio/cantidad en agregados
  const handleEditAgregado = (idx, campo, valor) => {
    setProductosAgregados(prev => prev.map((prod, i) =>
      i === idx ? { ...prod, [campo]: campo === "precio" || campo === "cantidad" ? Number(valor) : valor } : prod
    ));
  };

  // Eliminar producto agregado
  const handleEliminarAgregado = (idx) => {
    setProductosAgregados(prev => prev.filter((_, i) => i !== idx));
  };

  // Estado y cálculo para adelanto
  const [usarAdelanto, setUsarAdelanto] = React.useState(false);
  const [montoAdelantado, setMontoAdelantado] = React.useState(0);
  const total = productosAgregados.reduce((sum, p) => sum + (p.precio || 0) * (p.cantidad || 1), 0);
  const diferencia = total - (usarAdelanto ? Number(montoAdelantado) : 0);

  return (
    <div className="venta-container">
      <div className="d-flex justify-content-between align-items-center mb-4 p-4 rounded-4 shadow-sm bg-white border border-2 border-success-subtle" style={{background: 'linear-gradient(90deg, #e9f7ef 0%, #f8fafc 100%)'}}>
        <div className="d-flex align-items-center gap-3">
          <span className="fs-1 text-primary"><i className="bi bi-cart3"></i></span>
          <div>
            <h2 className="mb-0 fw-bold text-primary">Ventas</h2>
            <div className="text-secondary small">Gestión y registro de ventas, clientes y productos</div>
          </div>
        </div>
      </div>
  {/* Selector de cliente */}
  <ClienteSelector cliente={cliente} setCliente={setCliente} resetCliente={resetCliente} />
      <div className="venta-flex">
        {/* Sección productos */}
        <div className="venta-card ">
          {/* Selector tipo de precio */}
          <div className="mb-3 d-flex justify-content-evenly gap-6 items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="tipoPrecio" value="especial" checked={tipoPrecio === "especial"} onChange={() => setTipoPrecio("especial")} />
              Precio Especial
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="tipoPrecio" value="mayor" checked={tipoPrecio === "mayor"} onChange={() => setTipoPrecio("mayor")} />
              Precio por Mayor
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="tipoPrecio" value="general" checked={tipoPrecio === "general"} onChange={() => setTipoPrecio("general")} />
              Precio General
            </label>
          </div>
          {/* Buscador y tabla productos */}
          <div className="mb-3 w-full">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={handleBusqueda}
            />
          </div>
          <TablaProductos
            productosPagina={productosPagina}
            tipoPrecio={tipoPrecio}
            cantidadAgregar={cantidadAgregar}
            setCantidadAgregar={setCantidadAgregar}
            setProductosAgregados={setProductosAgregados}
            productosAgregados={productosAgregados}
          />
          {/* Paginación */}
          <div className="d-flex justify-content-evenly gap-2 mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => cambiarPagina(pagina - 1)}
              disabled={pagina === 1}
            >
              Anterior
            </button>
            <span className="
             ">Página {pagina} de {totalPaginas}</span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => cambiarPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        </div>
        {/* Tabla productos agregados */}
        <div className="venta-card">
          <h2 className="venta-titulo-tabla">Productos agregados</h2>
          <TablaAgregados productosAgregados={productosAgregados} handleEditAgregado={handleEditAgregado} handleEliminarAgregado={handleEliminarAgregado} />
          {/* Monto total, adelanto y diferencia */}
          <div style={{ borderTop: '1.5px solid #e5e7eb', marginTop: 18, paddingTop: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>Monto total a cancelar:</span>
                  <span style={{ fontSize: 20, color: '#16a34a' }}>S/ {total.toFixed(2)}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, color: '#6366f1', cursor: 'pointer' }}>
                    <input type="checkbox" checked={usarAdelanto} onChange={e => setUsarAdelanto(e.target.checked)} />
                    ¿Registrar monto adelantado?
                  </label>
                </div>
                {usarAdelanto && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#64748b', fontWeight: 500 }}>Monto adelantado:</span>
                      <input
                        type="number"
                        min={0}
                        max={total}
                        value={montoAdelantado}
                        onChange={e => setMontoAdelantado(e.target.value)}
                        style={{ border: '1.5px solid #a5b4fc', borderRadius: 6, padding: '4px 10px', width: 110 }}
                      />
                    </div>
                    <div style={{ fontWeight: 600, color: diferencia > 0 ? '#b91c1c' : '#16a34a', fontSize: 17 }}>
                      Diferencia por cancelar: <span style={{ fontWeight: 700 }}>S/ {diferencia.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Botones Cotizar, Confirmar, Limpiar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
              <button type="button" className="btn btn-outline-primary fw-semibold" onClick={() => alert('Cotización generada (demo)')}>Cotizar</button>
              <button type="button" className="btn btn-success fw-semibold" onClick={() => alert('Venta confirmada (demo)')}>Confirmar</button>
              <button
                type="button"
                className="btn btn-danger fw-semibold"
                onClick={() => {
                  setCliente("");
                  setProductosAgregados([]);
                  setCantidadAgregar({});
                  setBusqueda("");
                  setTipoPrecio("general");
                  setUsarAdelanto(false);
                  setMontoAdelantado(0);
                  setResetCliente(prev => prev + 1); // Cambia para forzar reset
                }}
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}