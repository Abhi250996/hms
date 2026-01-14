import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function DoctorRevenue() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const res = await ReportsController.doctorRevenue();
      setData(res || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading doctor revenue...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Doctor Revenue</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No revenue data available</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Doctor</th>
              <th className="border p-2 text-right">Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((doc) => (
              <tr key={doc.doctorId}>
                <td className="border p-2">{doc.doctorName}</td>
                <td className="border p-2 text-right">₹{doc.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
