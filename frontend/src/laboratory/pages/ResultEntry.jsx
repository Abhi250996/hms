// src/laboratory/pages/ResultEntry.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLabTestById, enterTestResult } from "../controller/lab.controller";
import Loader from "../../shared/components/Loader";

const ResultEntry = () => {
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

  const submitResult = async (e) => {
    e.preventDefault();
    setSaving(true);
    await enterTestResult(id, form);
    setSaving(false);
    navigate(`/lab/report/${id}`);
  };

  if (loading) return <Loader label="Loading test..." />;
  if (!test) return <p className="p-4">Test not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-semibold">Enter Lab Result</h2>

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

      <form onSubmit={submitResult} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Result</label>
          <textarea
            name="result"
            rows={4}
            required
            className="w-full border rounded p-2"
            placeholder="Enter test result"
            value={form.result}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Report URL (optional)
          </label>
          <input
            name="reportUrl"
            className="w-full border rounded p-2"
            placeholder="/reports/test-report.pdf"
            value={form.reportUrl}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 justify-end">
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
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Result"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResultEntry;
