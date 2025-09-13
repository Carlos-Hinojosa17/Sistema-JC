import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const dataBar = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ventas",
      data: [120, 190, 300, 250, 400],
      backgroundColor: "#198754"
    }
  ]
};


// Simulación de cotizaciones/ventas por estado
const resumenEstados = [
  { tipo: "Cotización", estado: "Pendiente", montoPendiente: 120, montoTotal: 200 },
  { tipo: "Cotización", estado: "Cancelada", montoPendiente: 0, montoTotal: 150 },
  { tipo: "Cotización", estado: "Pagada", montoPendiente: 0, montoTotal: 300 },
  { tipo: "Venta", estado: "Pendiente", montoPendiente: 80, montoTotal: 500 },
  { tipo: "Venta", estado: "Cancelada", montoPendiente: 0, montoTotal: 250 },
  { tipo: "Venta", estado: "Pagada", montoPendiente: 0, montoTotal: 1000 }
];


// Simulación de productos (igual que Productos.jsx)
const productos = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  codigo: `Producto ${i + 1}`,
  descripcion: `Detalle mas largo para espacio ${i + 1}`,
  stock: 10 + i,
  preCompra: 50 + i * 10,
  preEspecial: 60 + i * 10,
  prePorMayor: 70 + i * 10,
  preGeneral: 90 + i * 10,
  estado: true,
  actualizado: i % 5 === 0 ? 5 + i : 0 // Simula ingresos recientes
}));

export default function Principal() {
  // Productos con nuevos ingresos (actualizados)
  const productosActualizados = useMemo(() =>
    productos.filter(p => p.actualizado > 0).slice(0, 6),
    []
  );
  // Productos con poco stock
  const productosBajoStock = useMemo(() =>
    productos.filter(p => p.stock < 10).slice(0, 6),
    []
  );

  return (
    <div className="container py-4">
      <style>{`.card-hover:hover { box-shadow: 0 0 0 0.25rem #19875433 !important; cursor: pointer; }
      .dashboard-header-bg {background: linear-gradient(90deg, #e9f7ef 0%, #f8fafc 100%);}
      .dashboard-header-icon {font-size: 3rem; color: #198754;}`}</style>
      <div className="dashboard-header-bg rounded-4 shadow-sm border border-2 border-success-subtle mb-4 p-4 d-flex align-items-center gap-4">
        <span className="dashboard-header-icon"><i className="bi bi-bar-chart-line"></i></span>
        <div>
          <h1 className="mb-1 fw-bold text-success">Panel principal</h1>
          <div className="text-secondary fs-5">Resumen de ventas, stock y cotizaciones</div>
        </div>
      </div>
      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <Link to="#" style={{ textDecoration: "none" }}>
            <div className="card shadow-sm rounded-4 p-3 card-hover">
              <h5 className="mb-3">Ventas mensuales</h5>
              <Bar data={dataBar} options={{ responsive: true, plugins: { legend: { display: false } } }} height={120} />
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="#" style={{ textDecoration: "none" }}>
            <div className="card shadow-sm rounded-4 p-3 card-hover">
              <h5 className="mb-3">Estado de cotizaciones y ventas</h5>
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th className="text-center">Monto (S/)</th>
                  </tr>
                </thead>
                <tbody>
                  {resumenEstados.map((r, idx) => (
                    <tr key={idx}>
                      <td>{r.tipo}</td>
                      <td>
                        <span className={
                          r.estado === "Pendiente"
                            ? "badge bg-warning text-dark"
                            : r.estado === "Cancelada"
                            ? "badge bg-danger"
                            : "badge bg-success"
                        }>
                          {r.estado}
                        </span>
                      </td>
                      <td className="text-center fw-bold">
                        {r.estado === "Cancelada"
                          ? <span className="text-muted">—</span>
                          : r.estado === "Pendiente"
                          ? r.montoPendiente.toLocaleString("es-PE", { minimumFractionDigits: 2 })
                          : r.montoTotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <Link to="/layouts/Producto" style={{ textDecoration: "none" }}>
            <div className="card shadow-sm rounded-4 p-3 h-100 card-hover">
              <h5 className="mb-3">Actualización de stock (últimos ingresos)</h5>
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th className="text-center">Ingreso</th>
                    <th className="text-center">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productosActualizados.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">Sin ingresos recientes</td></tr>
                  ) : (
                    productosActualizados.map(p => (
                      <tr key={p.id}>
                        <td>{p.codigo}</td>
                        <td>{p.descripcion}</td>
                        <td className="text-center text-success fw-bold">+{p.actualizado}</td>
                        <td className={`text-center fw-bold ${p.stock < 5 ? 'text-danger' : p.stock <= 15 ? 'text-warning' : 'text-success'}`}>{p.stock}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/layouts/Almacen" style={{ textDecoration: "none" }}>
            <div className="card shadow-sm rounded-4 p-3 h-100 card-hover">
              <h5 className="mb-3">Productos con poco stock</h5>
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th className="text-center">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productosBajoStock.length === 0 ? (
                    <tr><td colSpan="3" className="text-center">Sin productos con bajo stock</td></tr>
                  ) : (
                    productosBajoStock.map(p => (
                      <tr key={p.id}>
                        <td>{p.codigo}</td>
                        <td>{p.descripcion}</td>
                        <td className={`text-center fw-bold ${p.stock < 5 ? 'text-danger' : p.stock <= 15 ? 'text-warning' : 'text-success'}`}>{p.stock}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
