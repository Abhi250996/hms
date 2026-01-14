import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function BedOccupancy() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const res = await ReportsController.bedOccupancy();
      setData(res || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading bed occupancy...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Bed Occupancy</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Ward</th>
              <th className="border p-2 text-center">Occupied</th>
              <th className="border p-2 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((bed) => (
              <tr key={bed.ward}>
                <td className="border p-2">{bed.ward}</td>
                <td className="border p-2 text-center">{bed.occupied}</td>
                <td className="border p-2 text-center">{bed.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
