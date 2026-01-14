import { NavLink } from "react-router-dom";

const linkStyle =
  "block p-4 rounded bg-white shadow hover:bg-blue-50 border";

export default function ReportsDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NavLink to="/admin/reports/bed-occupancy" className={linkStyle}>
          🛏️ Bed Occupancy
        </NavLink>

        <NavLink to="/admin/reports/daily-collection" className={linkStyle}>
          💰 Daily Collection
        </NavLink>

        <NavLink to="/admin/reports/department-revenue" className={linkStyle}>
          🏥 Department Revenue
        </NavLink>

        <NavLink to="/admin/reports/doctor-revenue" className={linkStyle}>
          👨‍⚕️ Doctor Revenue
        </NavLink>

        <NavLink to="/admin/reports/inventory" className={linkStyle}>
          📦 Inventory Report
        </NavLink>

        <NavLink to="/admin/reports/patient-stats" className={linkStyle}>
          👥 Patient Statistics
        </NavLink>
      </div>
    </div>
  );
}
