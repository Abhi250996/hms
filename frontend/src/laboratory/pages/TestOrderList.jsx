// src/laboratory/pages/TestOrderList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLabTests } from "../controller/lab.controller";
import Loader from "../../shared/components/Loader";

const TestOrderList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setLoading(true);
    const data = await getAllLabTests();
    setTests(data || []);
    setLoading(false);
  };

  if (loading) return <Loader label="Loading lab test orders..." />;

  return (
    <div className="p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lab Test Orders</h2>
      </div>

      {tests.length === 0 ? (
        <p className="text-gray-500">No lab tests found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-2 text-left">Test</th>
                <th className="border p-2 text-left">Patient ID</th>
                <th className="border p-2 text-left">Doctor ID</th>
                <th className="border p-2 text-left">Sample Status</th>
                <th className="border p-2 text-left">Test Status</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="border p-2">{t.testName}</td>
                  <td className="border p-2">{t.patientId}</td>
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
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/lab/report/${t.id}`)}
                      className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                      View
                    </button>

                    {t.sampleStatus === "PENDING" && (
                      <button
                        onClick={() => navigate(`/lab/sample-collection`)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Collect
                      </button>
                    )}

                    {t.sampleStatus === "COLLECTED" &&
                      t.status !== "COMPLETED" && (
                        <button
                          onClick={() => navigate(`/lab/result/${t.id}`)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Enter Result
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

export default TestOrderList;
