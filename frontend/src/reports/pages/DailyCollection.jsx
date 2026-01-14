import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function DailyCollection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const res = await ReportsController.dailyCollection();
      setData(res || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading daily collection...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Daily Collection</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No collection data available</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td className="border p-2">{d.date}</td>
                <td className="border p-2 text-right">₹{d.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
