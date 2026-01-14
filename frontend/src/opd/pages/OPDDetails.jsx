// src/opd/pages/OPDDetails.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOpdById, updateOpdVisit, clearSelectedOpd } from "../opdSlice";

const OPDDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected, loading, error } = useSelector((state) => state.opd);

  const [form, setForm] = useState({
    diagnosis: "",
    prescription: "",
  });

  useEffect(() => {
    dispatch(fetchOpdById(id));
    return () => dispatch(clearSelectedOpd());
  }, [id, dispatch]);

  useEffect(() => {
    if (selected) {
      setForm({
        diagnosis: selected.diagnosis || "",
        prescription: selected.prescription || "",
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(
      updateOpdVisit({
        id: selected.id,
        data: form,
      })
    );
  };

  const handleAdmitIPD = () => {
    navigate("/ipd/admit", {
      state: {
        patientId: selected.patientId,
        doctorId: selected.doctorId,
        opdId: selected.id,
      },
    });
  };

  if (loading) return <p className="p-4">Loading OPD details...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!selected) return null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">OPD Visit Details</h1>

      {/* BASIC INFO */}
      <div className="bg-white rounded shadow p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <p>
          <span className="font-medium">Visit Date:</span> {selected.visitDate}
        </p>
        <p>
          <span className="font-medium">Doctor ID:</span> {selected.doctorId}
        </p>
        <p>
          <span className="font-medium">Patient ID:</span> {selected.patientId}
        </p>
      </div>

      {/* MEDICAL DETAILS */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Diagnosis</label>
          <textarea
            name="diagnosis"
            className="w-full border rounded p-2"
            rows={3}
            value={form.diagnosis}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Prescription</label>
          <textarea
            name="prescription"
            className="w-full border rounded p-2"
            rows={4}
            value={form.prescription}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={handleAdmitIPD}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Admit to IPD
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OPDDetails;
