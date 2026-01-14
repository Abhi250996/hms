// src/patient/pages/PatientList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientController } from "../controller/patient.controller";
import PatientCard from "../components/PatientCard";

export default function PatientList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await patientController.getPatients();
      setPatients(data || []);
    } catch (err) {
      alert(err.message || "Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this patient?")) return;
    await patientController.deletePatient(id);
    loadPatients();
  };

  if (loading) return <p className="p-6">Loading patients...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <button
          onClick={() => navigate("/patients/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Register Patient
        </button>
      </div>

      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onView={() => navigate(`/patients/${patient.id}`)}
              onEdit={() => navigate(`/patients/${patient.id}/edit`)}
              onDelete={() => handleDelete(patient.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
