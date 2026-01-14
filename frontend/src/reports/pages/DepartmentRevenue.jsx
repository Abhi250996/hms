import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function DepartmentRevenue() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const res = await ReportsController.departmentRevenue();
      setData(res || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading department revenue...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Department Revenue</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No revenue data available</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Department</th>
              <th className="border p-2 text-right">Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dep, i) => (
              <tr key={i}>
                <td className="border p-2">{dep.department}</td>
                <td className="border p-2 text-right">₹{dep.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
