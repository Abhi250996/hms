import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function PatientStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await ReportsController.patientStats();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading patient statistics...</p>;
  }

  if (!data) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-500">No patient statistics available</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Patient Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4 text-center">
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-2xl font-bold">{data.total}</p>
        </div>

        <div className="border rounded p-4 text-center">
          <p className="text-sm text-gray-500">OPD Patients</p>
          <p className="text-2xl font-bold text-blue-600">{data.opd}</p>
        </div>

        <div className="border rounded p-4 text-center">
          <p className="text-sm text-gray-500">IPD Patients</p>
          <p className="text-2xl font-bold text-green-600">{data.ipd}</p>
        </div>
      </div>
    </div>
  );
}
