// src/doctor/pages/DoctorList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors, removeDoctor } from "../controller/doctor.controller";
import Loader from "../../shared/components/Loader";

const DoctorList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    await removeDoctor(id);
    loadDoctors();
  };

  if (loading) return <Loader label="Loading doctors..." />;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <button
          onClick={() => navigate("/doctors/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Doctor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2 text-left">Doctor ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">Specialization</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-2">{d.doctorId}</td>
                <td className="p-2 font-medium">{d.name}</td>
                <td className="p-2">{d.department}</td>
                <td className="p-2">{d.specialization}</td>
                <td className="p-2">{d.mobile}</td>
                <td className="p-2 text-center space-x-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/doctors/${d.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
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

export default DoctorList;
