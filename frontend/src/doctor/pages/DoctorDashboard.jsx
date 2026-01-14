// src/doctor/pages/DoctorDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors } from "../controller/doctor.controller";
import api from "../../core/api/axios";
import Loader from "../../shared/components/Loader";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalDoctors: 0,
    todayAppointments: 0,
    opdVisits: 0,
    ipdAdmissions: 0,
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const doctorsData = await fetchDoctors();
      setDoctors(doctorsData || []);

      const [opdRes, ipdRes, apptRes] = await Promise.all([
        api.get("/api/opd"),
        api.get("/api/ipd"),
        api.get("/api/appointments/today"),
      ]);

      setStats({
        totalDoctors: doctorsData?.length || 0,
        opdVisits: opdRes.data?.length || 0,
        ipdAdmissions: ipdRes.data?.length || 0,
        todayAppointments: apptRes.data?.length || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader label="Loading doctor dashboard..." />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Doctors" value={stats.totalDoctors} />
        <StatCard title="OPD Visits" value={stats.opdVisits} />
        <StatCard title="IPD Admissions" value={stats.ipdAdmissions} />
        <StatCard title="Appointments Today" value={stats.todayAppointments} />
      </div>

      {/* DOCTOR LIST */}
      <div className="bg-white rounded-xl shadow border">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Doctors</h2>
          <button
            onClick={() => navigate("/doctors/new")}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            + Add Doctor
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">Specialization</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{d.name}</td>
                <td className="p-2">{d.department}</td>
                <td className="p-2">{d.specialization}</td>
                <td className="p-2">{d.mobile}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => navigate(`/doctors/${d.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow border p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DoctorDashboard;
