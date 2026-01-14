import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BillingController } from "../controller/billing.controller";
import Loader from "../../shared/components/Loader";
import { formatCurrency } from "../../core/utils/currency";

const IPDBilling = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [payment, setPayment] = useState({
    billId: "",
    amount: "",
    mode: "CASH",
  });

  useEffect(() => {
    loadBills();
  }, [patientId]);

  const loadBills = async () => {
    try {
      setLoading(true);
      const res = await BillingController.getPatientBills(patientId);
      setBills(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    await BillingController.collectPayment({
      billId: payment.billId,
      amount: Number(payment.amount),
      mode: payment.mode,
    });

    setPayment({ billId: "", amount: "", mode: "CASH" });
    loadBills();
  };

  if (loading) return <Loader label="Loading IPD billing..." />;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">IPD Billing</h2>

      {/* BILL LIST */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Bill ID</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-right">Paid</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No IPD bills found
                </td>
              </tr>
            )}

            {bills.map((bill) => (
              <tr key={bill.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{bill.id}</td>

                <td className="p-3 text-right">
                  {formatCurrency(bill.totalAmount)}
                </td>

                <td className="p-3 text-right">
                  {formatCurrency(bill.paidAmount)}
                </td>

                <td className="p-3 text-center">
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

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/billing/invoice/${bill.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Invoice
                  </button>

                  {bill.paymentStatus !== "PAID" && (
                    <button
                      onClick={() =>
                        setPayment({
                          billId: bill.id,
                          amount: "",
                          mode: "CASH",
                        })
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAYMENT FORM */}
      {payment.billId && (
        <form
          onSubmit={handlePayment}
          className="bg-white shadow rounded-lg p-5 max-w-md"
        >
          <h3 className="text-lg font-semibold mb-4">Collect Payment</h3>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              min="1"
              className="w-full border rounded px-3 py-2"
              value={payment.amount}
              onChange={(e) =>
                setPayment({ ...payment, amount: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Payment Mode
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={payment.mode}
              onChange={(e) => setPayment({ ...payment, mode: e.target.value })}
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() =>
                setPayment({ billId: "", amount: "", mode: "CASH" })
              }
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Collect
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default IPDBilling;
