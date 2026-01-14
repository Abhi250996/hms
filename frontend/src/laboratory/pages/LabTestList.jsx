// src/laboratory/pages/LabTestList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLabTests,
  markSampleCollected,
} from "../controller/lab.controller";
import Loader from "../../shared/components/Loader";

const LabTestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setLoading(true);
    const res = await getAllLabTests();
    const data = res?.data || res || [];
    setTests(data);
    setLoading(false);
  };

  const collectSample = async (id) => {
    await markSampleCollected(id);
    loadTests();
  };

  if (loading) return <Loader label="Loading lab tests..." />;

  return (
    <div className="p-6 bg-white shadow rounded space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lab Test Orders</h2>
      </div>

      {tests.length === 0 ? (
        <p className="text-gray-500">No lab tests found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Patient</th>
                <th className="border p-2 text-left">Doctor</th>
                <th className="border p-2 text-left">Test</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="border p-2">{t.id}</td>
                  <td className="border p-2">{t.patientId}</td>
                  <td className="border p-2">{t.doctorId}</td>
                  <td className="border p-2">{t.testName}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : t.status === "ORDERED"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="border p-2 space-x-2">
                    {t.status === "ORDERED" && (
                      <button
                        onClick={() => collectSample(t.id)}
                        className="px-3 py-1 text-xs bg-yellow-500 text-white rounded"
                      >
                        Collect Sample
                      </button>
                    )}

                    {t.status !== "COMPLETED" && (
                      <button
                        onClick={() => navigate(`/lab/result/${t.id}`)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                      >
                        Enter Result
                      </button>
                    )}

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

export default LabTestList;
