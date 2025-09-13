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


  return (
    <div className="venta-container">
      <h1 className="venta-titulo">🛒 Página de Ventas</h1>
      {/* Selector de cliente */}
      <ClienteSelector cliente={cliente} setCliente={setCliente} />
      <div className="venta-flex">
        {/* Sección productos */}
        <div className="venta-card">
          <div className="mb-4 flex gap-6 items-center">
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
          <div className="mb-3">
            <input
              type="text"
              className="border p-2 rounded w-full max-w-md"
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
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => cambiarPagina(pagina - 1)}
              disabled={pagina === 1}
            >
              Anterior
            </button>
            <span>Página {pagina} de {totalPaginas}</span>
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
        </div>
      </div>
    </div>
  );
}