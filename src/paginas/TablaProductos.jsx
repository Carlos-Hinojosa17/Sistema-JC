import React from "react";

export default function TablaProductos({ productosPagina, tipoPrecio, cantidadAgregar, setCantidadAgregar, setProductosAgregados, productosAgregados }) {

  return (
    <div className="overflow-x-auto">
      <table className="venta-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Stock</th>
            {tipoPrecio === "especial" && <th>Precio Especial</th>}
            {tipoPrecio === "mayor" && <th>Precio por Mayor</th>}
            {tipoPrecio === "general" && <th>Precio General</th>}
            <th>Cantidad</th>
            <th>Agregar</th>
          </tr>
        </thead>
        <tbody>
          {productosPagina.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-2">No se encontraron productos</td>
            </tr>
          ) : (
            productosPagina.map((p) => (
              <tr key={p.id}>
                <td>{p.codigo}</td>
                <td>{p.descripcion}</td>
                <td className={p.stock < 5 ? "venta-stock-bajo" : p.stock <= 15 ? "venta-stock-medio" : "venta-stock-alto"}>{p.stock}</td>
                {tipoPrecio === "especial" && <td>S/{p.preEspecial}</td>}
                {tipoPrecio === "mayor" && <td>S/{p.prePorMayor}</td>}
                {tipoPrecio === "general" && <td>S/{p.preGeneral}</td>}
                <td>
                  <input
                    type="number"
                    min="1"
                    max={p.stock}
                    value={cantidadAgregar[p.id] || ""}
                    onChange={e => setCantidadAgregar({ ...cantidadAgregar, [p.id]: e.target.value })}
                    placeholder="Cant."
                  />
                </td>
                <td>
                  <button
                    className="venta-btn-agregar"
                    onClick={() => {
                      const cantidad = Number(cantidadAgregar[p.id]) || 1;
                      if (cantidad < 1 || cantidad > p.stock) return;
                      setProductosAgregados([
                        ...productosAgregados,
                        { ...p, cantidad,
                          precio: tipoPrecio === "especial" ? p.preEspecial : tipoPrecio === "mayor" ? p.prePorMayor : p.preGeneral }
                      ]);
                      setCantidadAgregar({ ...cantidadAgregar, [p.id]: "" });
                    }}
                    disabled={p.stock < 1}
                  >
                    Agregar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}