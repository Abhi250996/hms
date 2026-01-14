// src/opd/pages/OPDRegistration.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createOpdVisit } from "../opdSlice";
import { fetchDoctors } from "../../doctor/controller/doctor.controller";

const OPDRegistration = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientId: Number(patientId),
    doctorId: "",
    diagnosis: "",
    prescription: "",
    visitDate: new Date().toISOString().split("T")[0],
  });

  const { loading, error } = useSelector((state) => state.opd);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const res = await fetchDoctors();
    setDoctors(res?.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOpdVisit(form)).then((res) => {
      if (!res.error) {
        navigate(`/patients/${patientId}`);
      }
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create OPD Visit</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Doctor</label>
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} — {doc.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Visit Date</label>
          <input
            type="date"
            name="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Diagnosis</label>
          <textarea
            name="diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Prescription</label>
          <textarea
            name="prescription"
            value={form.prescription}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Create OPD Visit"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OPDRegistration;
