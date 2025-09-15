// Ejemplo en un componente React
import { useEffect, useState } from "react";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/clientes")
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  return (
    <ul>
      {clientes.map(c => (
        <li key={c.id}>{c.nombre}</li>
      ))}
    </ul>
  );
}

export default Clientes;