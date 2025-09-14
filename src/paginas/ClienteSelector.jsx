import React, { useState, useRef } from "react";

// Iconos SVG simples
const UserIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#2563eb" strokeWidth="2"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" stroke="#2563eb" strokeWidth="2"/></svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6.5 3.5A2 2 0 0 1 8.5 2h7a2 2 0 0 1 2 1.5l1.5 6a2 2 0 0 1-1.5 2.5l-2 .5a2 2 0 0 0-1.5 2.5l.5 2a2 2 0 0 1-2.5 1.5l-6-1.5A2 2 0 0 1 2 15.5v-7a2 2 0 0 1 1.5-2l6-1.5z" stroke="#16a34a" strokeWidth="2"/></svg>
);

export default function ClienteSelector({ cliente, setCliente, resetCliente }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  // Estado para habilitar inputs adicionales
  const [habilitarDatosExtra, setHabilitarDatosExtra] = useState(false);
  const [datosExtra, setDatosExtra] = useState({ campo1: "", campo2: "", campo3: "" });

  // Efecto para resetear campos cuando cambia resetCliente
  React.useEffect(() => {
    setHabilitarDatosExtra(false);
    setDatosExtra({ campo1: "", campo2: "", campo3: "" });
  }, [resetCliente]);
  const agencias = [
    "Shalom",
    "Olva Courier",
    "Marvisur",
    "Flores",
    "Civa",
    "Otra"
  ];
  // Simulación de clientes
  const clientes = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    nombre: `Cliente ${i + 1}`,
    documento: `DNI${10000000 + i}`,
    telefono: `999000${i.toString().padStart(2, "0")}`
  }));
  const sugerencias = cliente && cliente.length > 0
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
    <div className="venta-cliente-box" style={{
      marginBottom: 24,
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      position: 'relative',
      alignItems: 'flex-start',
      background: '#f8fafc',
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      padding: 20,
      border: '1.5px solid #e0e7ef',
      minWidth: 350
    }}>
      <div className="d-flex flex-column gap-3" style={{ minWidth: 350 }}>
        {/* Selector de cliente */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%' }}>
          <UserIcon />
          <label htmlFor="cliente" style={{ fontWeight: 600, fontSize: 16, color: '#2563eb' }}>Cliente</label>
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
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1.5px solid #cbd5e1',
              minWidth: 240,
              fontSize: 15,
              boxShadow: '0 1px 4px rgba(37,99,235,0.06)',
              outline: 'none',
              transition: 'border 0.2s',
              background: '#fff',
            }}
            autoComplete="off"
          />
          {showDropdown && sugerencias.length > 0 && (
            <ul style={{
              position: 'absolute',
              top: 54,
              left: 60,
              zIndex: 20,
              background: 'white',
              border: '1.5px solid #cbd5e1',
              borderRadius: 8,
              width: 320,
              maxHeight: 220,
              overflowY: 'auto',
              margin: 0,
              padding: 0,
              listStyle: 'none',
              boxShadow: '0 4px 16px rgba(37,99,235,0.10)'
            }}>
              {sugerencias.map(c => (
                <li
                  key={c.id}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f1f5f9',
                    background: '#fff',
                    transition: 'background 0.15s',
                  }}
                  onMouseDown={() => {
                    setCliente(`${c.nombre} (${c.documento})`);
                    setShowDropdown(false);
                    inputRef.current.blur();
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#e0e7ef'}
                  onMouseOut={e => e.currentTarget.style.background = '#fff'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <UserIcon />
                    <span style={{ fontWeight: 500, fontSize: 15 }}>{c.nombre}</span>
                    <span style={{ color: '#64748b', fontSize: 13 }}>({c.documento})</span>
                  </div>
                  <div style={{ color: '#16a34a', fontSize: 13, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <PhoneIcon /> Tel: {c.telefono}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Mostrar teléfono del cliente seleccionado */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#e0fce0',
          borderRadius: 8,
          padding: '8px 14px',
          marginTop: 2,
          minWidth: 220,
          boxShadow: '0 1px 4px rgba(22,163,74,0.06)'
        }}>
          <PhoneIcon />
          <span style={{ fontWeight: 600, color: '#16a34a', fontSize: 15 }}>Teléfono:</span>
          <span style={{ fontSize: 15 }}>{telefonoSeleccionado || <span style={{ color: '#888' }}>No seleccionado</span>}</span>
        </div>
      </div>
      {/* Checkbox para habilitar datos extra */}
      <div style={{
        marginTop: 0,
        marginBottom: 0,
        padding: '12px 18px',
        background: '#e0e7ff',
        borderRadius: 10,
        boxShadow: '0 1px 6px rgba(37,99,235,0.07)',
        width: '100%',
        gap: 20,
        border: '1.5px solid #c7d2fe',
        alignSelf: 'flex-start'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500, fontSize: 15, color: '#3730a3' }}>
          <input
            type="checkbox"
            checked={habilitarDatosExtra}
            onChange={e => setHabilitarDatosExtra(e.target.checked)}
            style={{ accentColor: '#6366f1', width: 18, height: 18 }}
          />
          Agregar datos para envio
        </label>
        {habilitarDatosExtra && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: '16px',
            marginTop: '8px',
            width: '100%',
            flexWrap: 'nowrap'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 140 }}>
              <label style={{ fontSize: 13, color: '#6366f1', fontWeight: 500 }}>Agencia de Encomienda</label>
              <select
                value={datosExtra.campo1}
                onChange={e => setDatosExtra({ ...datosExtra, campo1: e.target.value })}
                style={{
                  border: '1.5px solid #a5b4fc',
                  borderRadius: 7,
                  padding: '8px 10px',
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  boxShadow: '0 1px 3px rgba(99,102,241,0.06)'
                }}
              >
                <option value="">Selecciona agencia</option>
                {agencias.map(agencia => (
                  <option key={agencia} value={agencia}>{agencia}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 180 }}>
              <label style={{ fontSize: 13, color: '#6366f1', fontWeight: 500 }}>Destino</label>
              <input
                type="text"
                placeholder="Ej: Trujillo - Calle Liverpoll"
                value={datosExtra.campo2}
                onChange={e => setDatosExtra({ ...datosExtra, campo2: e.target.value })}
                style={{
                  border: '1.5px solid #a5b4fc',
                  borderRadius: 7,
                  padding: '8px 10px',
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  boxShadow: '0 1px 3px rgba(99,102,241,0.06)'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 100 }}>
              <label style={{ fontSize: 13, color: '#6366f1', fontWeight: 500 }}>Clave</label>
              <input
                type="number"
                placeholder="Ej: 0106"
                value={datosExtra.campo3}
                onChange={e => setDatosExtra({ ...datosExtra, campo3: e.target.value })}
                style={{
                  border: '1.5px solid #a5b4fc',
                  borderRadius: 7,
                  padding: '8px 10px',
                  fontSize: 15,
                  outline: 'none',
                  background: '#fff',
                  boxShadow: '0 1px 3px rgba(99,102,241,0.06)'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
