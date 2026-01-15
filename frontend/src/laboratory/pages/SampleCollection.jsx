 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLabTests,
  markSampleCollected,
} from "../controller/lab.controller";
import Loader from "../../shared/components/Loader";

const SampleCollection = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setLoading(true);
    const res = await getAllLabTests();
    setTests(res || []);
    setLoading(false);
  };

  const collectSample = async (id) => {
    await markSampleCollected(id, { sampleStatus: "COLLECTED" });
    loadTests();
  };

  if (loading) return <Loader label="Loading sample collections..." />;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Sample Collection</h2>

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
                <th className="border p-2 text-center">Action</th>
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
                  <td className="border p-2 text-center">
                    {t.sampleStatus === "PENDING" ? (
                      <button
                        onClick={() => collectSample(t.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Collect
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/lab/result/${t.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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

export default SampleCollection;
