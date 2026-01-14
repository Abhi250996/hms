// src/admin/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { reportsRepository } from "../../reports/repository/reports.repository";
import Loader from "../../shared/components/Loader";
import Table from "../../shared/components/Table";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayCollection: 0,
    monthlyCollection: 0,
    opdCount: 0,
    ipdCount: 0,
    totalPatients: 0,
    bedOccupancy: 0,
    lowStockMedicines: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [daily, patientStats, bedOcc, inventory] = await Promise.all([
        reportsRepository.dailyCollection(),
        reportsRepository.patientStats(),
        reportsRepository.bedOccupancy(),
        reportsRepository.inventoryReport(),
      ]);

      setStats({
        todayCollection: daily.data.today,
        monthlyCollection: daily.data.month,
        opdCount: patientStats.data.opd,
        ipdCount: patientStats.data.ipd,
        totalPatients: patientStats.data.totalPatients,
        bedOccupancy: bedOcc.data.percentage,
        lowStockMedicines: inventory.data.lowStock || [],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">
            Hospital overview & real-time insights
          </p>
        </div>

        {/* KPI GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Kpi title="Today Collection" value={`₹ ${stats.todayCollection}`} />
          <Kpi
            title="Monthly Collection"
            value={`₹ ${stats.monthlyCollection}`}
          />
          <Kpi title="OPD Visits" value={stats.opdCount} />
          <Kpi title="IPD Admissions" value={stats.ipdCount} />
          <Kpi title="Total Patients" value={stats.totalPatients} />
          <Kpi title="Bed Occupancy" value={`${stats.bedOccupancy}%`} />
        </div>

        {/* LOW STOCK */}
        <section className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-4">
            ⚠ Low Stock Medicines
          </h2>

          {stats.lowStockMedicines.length === 0 ? (
            <p className="text-sm text-slate-500">No low stock alerts</p>
          ) : (
            <Table
              columns={[
                { key: "name", label: "Medicine" },
                { key: "batch", label: "Batch" },
                { key: "quantity", label: "Quantity" },
                { key: "expiryDate", label: "Expiry" },
              ]}
              data={stats.lowStockMedicines}
            />
          )}
        </section>

        {/* QUICK ACTIONS */}
        <section className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-wrap gap-3">
            <Action
              label="➕ Register Patient"
              onClick={() => navigate("/patients/new")}
            />
            <Action
              label="👨‍⚕️ Add Doctor"
              onClick={() => navigate("/doctors/new")}
            />
            <Action
              label="💊 Add Medicine"
              onClick={() => navigate("/pharmacy/medicines")}
            />
            <Action
              label="📊 View Reports"
              onClick={() => navigate("/reports/daily-collection")}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

/* ---------- COMPONENTS ---------- */

const Kpi = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <p className="text-xs text-slate-500">{title}</p>
    <p className="text-xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Action = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
  >
    {label}
  </button>
);

export default AdminDashboard;
