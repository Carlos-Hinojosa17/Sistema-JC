import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Lateral from "./layouts/Lateral";
import Principal from "./paginas/Principal";
import Ventas from "./paginas/Venta";
import Productos from "./paginas/Productos";
import Clientes from "./paginas/Clientes";
import Almacen from "./paginas/Almacen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layouts" element={<Lateral />}>
          <Route path="principal" element={<Principal />} />
          <Route path="Venta" element={<Ventas />} />
          <Route path="Producto" element={<Productos />} />
          <Route path="Cliente" element={<Clientes />} />
          <Route path="Almacen" element={<Almacen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;