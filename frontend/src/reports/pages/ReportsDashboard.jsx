// src/reports/pages/ReportsDashboard.jsx
import { useNavigate } from "react-router-dom";

const reports = [
  {
    title: "Bed Occupancy",
    desc: "Ward-wise bed utilization",
    path: "/admin/reports/bed-occupancy",
  },
  {
    title: "Daily Collection",
    desc: "Day-wise billing summary",
    path: "/admin/reports/daily-collection",
  },
  {
    title: "Department Revenue",
    desc: "Revenue by department",
    path: "/admin/reports/department-revenue",
  },
  {
    title: "Doctor Revenue",
    desc: "Doctor-wise earnings",
    path: "/admin/reports/doctor-revenue",
  },
  {
    title: "Inventory Report",
    desc: "Medicine stock overview",
    path: "/admin/reports/inventory",
  },
  {
    title: "Patient Statistics",
    desc: "OPD vs IPD patient data",
    path: "/admin/reports/patient-stats",
  },
];

const ReportsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Reports</h1>
      <p className="text-slate-500 mb-6">
        Hospital analytics & performance insights
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((r) => (
          <div
            key={r.path}
            onClick={() => navigate(r.path)}
            className="cursor-pointer bg-white p-6 rounded-xl shadow
                       hover:shadow-lg transition border-l-4 border-blue-600"
          >
            <h3 className="font-semibold text-lg">{r.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsDashboard;
