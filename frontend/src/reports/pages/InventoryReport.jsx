import { useEffect, useState } from "react";
import { ReportsController } from "../controller/reports.controller";

export default function InventoryReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const res = await ReportsController.inventory();
      setData(res || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading inventory report...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Inventory Report</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No inventory data available</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Medicine</th>
              <th className="border p-2 text-right">Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-right">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
