import React from "react";

export default function TablaAgregados({ productosAgregados, handleEditAgregado, handleEliminarAgregado }) {
  // Altura estimada de una fila: 44px (ajustar si es necesario)
  const maxRows = 5;
  const rowHeight = 100;
  const maxHeight = productosAgregados.length > 0 ? Math.min(productosAgregados.length, maxRows) * rowHeight : rowHeight;

  return (
    <div className="overflow-x-auto">
      <table className="venta-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th style={{width: '80px'}}>Precio</th>
            <th style={{width: '70px'}}>Cantidad</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
      </table>
      <div style={{ maxHeight: rowHeight * maxRows, overflowY: 'auto' }}>
        <table className="venta-table" style={{ margin: 0 }}>
          <tbody>
            {productosAgregados.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-2">No hay productos agregados</td>
              </tr>
            ) : (
              productosAgregados.map((prod, idx) => (
                <tr key={idx}>
                  <td>{prod.codigo}</td>
                  <td>{prod.descripcion}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={prod.precio}
                      onChange={e => handleEditAgregado(idx, "precio", e.target.value)}
                      style={{ width: '70px', textAlign: 'center' }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={prod.cantidad}
                      onChange={e => handleEditAgregado(idx, "cantidad", e.target.value)}
                      style={{ width: '60px', textAlign: 'center' }}
                    />
                  </td>
                  <td className="font-bold">S/{(prod.precio * prod.cantidad).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEliminarAgregado(idx)} style={{ color: 'white', background: '#dc2626', border: 'none', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
