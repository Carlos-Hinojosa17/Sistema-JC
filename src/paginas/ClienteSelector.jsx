import React, { useState, useRef } from "react";

export default function ClienteSelector({ cliente, setCliente }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  // Simulación de clientes
  const clientes = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    nombre: `Cliente ${i + 1}`,
    documento: `DNI${10000000 + i}`,
    telefono: `999000${i.toString().padStart(2, "0")}`
  }));
  const sugerencias = cliente.length > 0
    ? clientes.filter(c =>
        c.nombre.toLowerCase().includes(cliente.toLowerCase()) ||
        c.documento.toLowerCase().includes(cliente.toLowerCase())
      )
    : [];

  // Obtener el teléfono del cliente seleccionado
  let telefonoSeleccionado = "";
  const match = cliente.match(/\((DNI\d+)\)/);
  if (match) {
    const doc = match[1];
    const encontrado = clientes.find(c => c.documento === doc);
    if (encontrado) telefonoSeleccionado = encontrado.telefono;
  }

  return (
    <div className="venta-cliente-box" style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <label htmlFor="cliente" style={{ fontWeight: 600 }}>Cliente:</label>
        <input
          id="cliente"
          type="text"
          ref={inputRef}
          value={cliente}
          onChange={e => {
            setCliente(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder="Nombre o DNI del cliente"
          style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', minWidth: 220 }}
          autoComplete="off"
        />
        {showDropdown && sugerencias.length > 0 && (
          <ul style={{
            position: 'absolute',
            top: 38,
            left: 90,
            zIndex: 10,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: 4,
            width: 260,
            maxHeight: 180,
            overflowY: 'auto',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            {sugerencias.map(c => (
              <li
                key={c.id}
                style={{ padding: '8px 12px', cursor: 'pointer' }}
                onMouseDown={() => {
                  setCliente(`${c.nombre} (${c.documento})`);
                  setShowDropdown(false);
                  inputRef.current.blur();
                }}
              >
                <div>
                  <span style={{ fontWeight: 500 }}>{c.nombre}</span> <span style={{ color: '#888', fontSize: 13 }}>({c.documento})</span>
                </div>
                <div style={{ color: '#16a34a', fontSize: 13, marginTop: 2 }}>Teléfono: {c.telefono}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label style={{ fontWeight: 600, minWidth: 70 }}>Teléfono:</label>
        <input
          type="text"
          value={telefonoSeleccionado}
          readOnly
          style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', minWidth: 180, background: '#f3f4f6' }}
        />
      </div>
    </div>
  );
}
