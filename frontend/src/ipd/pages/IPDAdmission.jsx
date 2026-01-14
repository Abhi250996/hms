// src/ipd/pages/IPDAdmission.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ipdController } from "../controller/ipd.controller";
import DoctorDropdown from "../../patient/components/DoctorDropdown";
import BedSelector from "../../patient/components/BedSelector";
import Loader from "../../shared/components/Loader";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";

const IPDAdmission = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { patientId, doctorId } = location.state || {};

  const [form, setForm] = useState({
    patientId: patientId || "",
    doctorId: doctorId || "",
    bedNumber: "",
    ward: "",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await ipdController.admitPatient(form);
      navigate(`/patients/${form.patientId}`);
    } catch (err) {
      setError(err?.message || "Failed to admit patient");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader label="Admitting patient..." />;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">IPD Admission</h2>
        <p className="text-sm text-gray-500">
          Admit patient for in-patient treatment
        </p>
      </div>

      <form
        onSubmit={submit}
        className="bg-white border rounded-xl shadow p-6 space-y-4"
      >
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Input label="Patient ID" value={form.patientId} disabled />

        <div>
          <label className="block mb-1 text-sm font-medium">Doctor</label>
          <DoctorDropdown
            value={form.doctorId}
            onChange={(val) => handleChange("doctorId", val)}
          />
        </div>

        <Select
          label="Ward"
          value={form.ward}
          required
          onChange={(e) => handleChange("ward", e.target.value)}
          options={[
            { label: "Select Ward", value: "" },
            { label: "General", value: "General" },
            { label: "Semi-Private", value: "Semi-Private" },
            { label: "Private", value: "Private" },
            { label: "ICU", value: "ICU" },
          ]}
        />

        <div>
          <label className="block mb-1 text-sm font-medium">Bed Number</label>
          <BedSelector
            ward={form.ward}
            value={form.bedNumber}
            onChange={(val) => handleChange("bedNumber", val)}
          />
        </div>

        <Input
          type="date"
          label="Admission Date"
          value={form.admissionDate}
          required
          onChange={(e) => handleChange("admissionDate", e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Admit Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default IPDAdmission;
