// src/laboratory/pages/LabReport.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLabTestById } from "../controller/lab.controller";
import Loader from "../../shared/components/Loader";
import { formatDate } from "../../core/utils/date";
 
const LabReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    setLoading(true);
    const res = await getLabTestById(id);
    setTest(res?.data || res);
    setLoading(false);
  };

  if (loading) return <Loader label="Loading lab report..." />;
  if (!test) return <p className="p-6">Report not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lab Report</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 border rounded"
        >
          Back
        </button>
      </div>

      {/* BASIC DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p>
          <b>Patient ID:</b> {test.patientId}
        </p>
        <p>
          <b>Doctor ID:</b> {test.doctorId}
        </p>
        <p>
          <b>Test Name:</b> {test.testName}
        </p>
        <p>
          <b>Status:</b>{" "}
          <span
            className={`px-2 py-1 rounded text-xs ${
              test.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {test.status}
          </span>
        </p>
        <p>
          <b>Sample Status:</b> {test.sampleStatus}
        </p>
        <p>
          <b>Created At:</b> {formatDate(test.createdAt)}
        </p>
      </div>

      {/* RESULT */}
      <div>
        <h3 className="font-medium mb-2">Result</h3>
        {test.result ? (
          <div className="border rounded p-4 bg-gray-50 text-sm">
            {test.result}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Result not entered yet</p>
        )}
      </div>

      {/* REPORT FILE */}
      {test.reportUrl && (
        <div>
          <a
            href={test.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            View / Download Report
          </a>
        </div>
      )}
    </div>
  );
};

export default LabReport;
