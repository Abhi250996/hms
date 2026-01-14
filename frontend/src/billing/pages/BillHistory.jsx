import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillingController } from "../controller/billing.controller";
import { formatCurrency } from "../../core/utils/currency";
import { formatDate } from "../../core/utils/date";
import Loader from "../../shared/components/Loader";

const BillHistory = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await BillingController.getHistory();
      setBills(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader label="Loading billing history..." />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Billing History</h2>
      </div>

      {bills.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No billing records found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Bill #</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-t hover:bg-gray-50 text-center"
                >
                  <td className="p-3 text-left font-medium">#{bill.id}</td>

                  <td className="p-3">
                    {bill.patient?.name || bill.patientId}
                  </td>

                  <td className="p-3">{formatDate(bill.createdAt)}</td>

                  <td className="p-3">{formatCurrency(bill.totalAmount)}</td>

                  <td className="p-3">{formatCurrency(bill.paidAmount)}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          bill.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-700"
                            : bill.paymentStatus === "PARTIAL"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {bill.paymentStatus}
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => navigate(`/billing/invoice/${bill.id}`)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Invoice
                    </button>

                    {bill.paymentStatus !== "PAID" && (
                      <button
                        onClick={() => navigate(`/billing/collect/${bill.id}`)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Collect
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

export default BillHistory;
