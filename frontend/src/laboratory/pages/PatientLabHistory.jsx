// src/laboratory/pages/PatientLabHistory.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientLabHistory } from "../controller/lab.controller";
import Loader from "../../shared/components/Loader";

const PatientLabHistory = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [patientId]);

  const loadHistory = async () => {
    setLoading(true);
    const res = await getPatientLabHistory(patientId);
    const data = res?.data || res || [];
    setTests(data);
    setLoading(false);
  };

  if (loading) return <Loader label="Loading lab history..." />;

  return (
    <div className="p-6 bg-white shadow rounded space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Patient Lab History</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Back
        </button>
      </div>

      {tests.length === 0 ? (
        <p className="text-gray-500">No lab tests found for this patient</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Test Name</th>
                <th className="border p-2 text-left">Doctor</th>
                <th className="border p-2 text-left">Sample Status</th>
                <th className="border p-2 text-left">Result</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="border p-2">{t.testName}</td>
                  <td className="border p-2">{t.doctorId}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.sampleStatus === "COLLECTED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {t.sampleStatus}
                    </span>
                  </td>
                  <td className="border p-2">
                    {t.status === "COMPLETED" ? (
                      <span className="text-green-700 font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="text-gray-500">Pending</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {t.status === "COMPLETED" && (
                      <button
                        onClick={() => navigate(`/lab/report/${t.id}`)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                      >
                        View Report
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientLabHistory;
