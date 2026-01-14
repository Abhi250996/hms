// src/laboratory/pages/LabOrderFromIPD.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../doctor/controller/doctor.controller";
import { createLabTest } from "../controller/lab.controller";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";
import Loader from "../../shared/components/Loader";

const LabOrderFromIPD = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // { patientId, doctorId? }

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    patientId: state?.patientId || "",
    doctorId: state?.doctorId || "",
    testName: "",
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    const res = await fetchDoctors();
    setDoctors(res?.data || res || []);
    setLoading(false);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await createLabTest(form);
    setSubmitting(false);
    navigate("/lab/tests");
  };

  if (loading) return <Loader label="Loading doctors..." />;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Order Lab Test (IPD)</h2>
        <p className="text-sm text-gray-500">
          Create laboratory test order for admitted patient
        </p>
      </div>

      <form onSubmit={submit} className="bg-white border rounded p-6 space-y-4">
        <Input label="Patient ID" value={form.patientId} disabled />

        <Select
          label="Doctor"
          value={form.doctorId}
          required
          onChange={(e) => handleChange("doctorId", e.target.value)}
          options={[
            { label: "Select Doctor", value: "" },
            ...doctors.map((d) => ({
              label: `${d.name} (${d.department})`,
              value: d.id,
            })),
          ]}
        />

        <Input
          label="Test Name"
          placeholder="e.g. Blood Test, MRI"
          value={form.testName}
          required
          onChange={(e) => handleChange("testName", e.target.value)}
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
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Test Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LabOrderFromIPD;
