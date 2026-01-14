// src/laboratory/pages/LabResultEntry.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getLabTestById,
  enterLabTestResult,
} from "../controller/lab.controller";
import Loader from "../../shared/components/Loader";

const LabResultEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [form, setForm] = useState({
    result: "",
    reportUrl: "",
    status: "COMPLETED",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTest();
  }, [id]);

  const loadTest = async () => {
    setLoading(true);
    const res = await getLabTestById(id);
    const data = res?.data || res;

    setTest(data);
    setForm({
      result: data?.result || "",
      reportUrl: data?.reportUrl || "",
      status: data?.status || "COMPLETED",
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await enterLabTestResult(id, form);
    setSaving(false);
    navigate(`/lab/report/${id}`);
  };

  if (loading) return <Loader label="Loading test details..." />;
  if (!test) return <p className="p-6">Test not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Enter Lab Test Result</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 border rounded"
        >
          Back
        </button>
      </div>

      {/* TEST INFO */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <b>Test:</b> {test.testName}
        </p>
        <p>
          <b>Patient ID:</b> {test.patientId}
        </p>
        <p>
          <b>Doctor ID:</b> {test.doctorId}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Result</label>
          <textarea
            name="result"
            value={form.result}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded p-2"
            placeholder="Enter test result"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Report URL (optional)
          </label>
          <input
            name="reportUrl"
            value={form.reportUrl}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="/reports/blood-test.pdf"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="ORDERED">ORDERED</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Result"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LabResultEntry;
