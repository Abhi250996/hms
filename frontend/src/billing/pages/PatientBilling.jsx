import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillingController } from "../controller/billing.controller";
import Loader from "../../shared/components/Loader";
import { formatCurrency } from "../../core/utils/currency";

const PatientBilling = ({ patientId }) => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) fetchBills();
  }, [patientId]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const res = await BillingController.getPatientBills(patientId);
      setBills(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Loading patient billing..." />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Patient Billing</h2>

        <button
          onClick={() => navigate(`/billing/create/${patientId}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create Bill
        </button>
      </div>

      {/* EMPTY STATE */}
      {bills.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <p className="text-yellow-700">
            No billing records found for this patient.
          </p>
        </div>
      )}

      {/* BILL TABLE */}
      {bills.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
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
              {bills.map((bill) => (
                <tr key={bill.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">#{bill.id}</td>

                  <td className="p-3 text-right">
                    {formatCurrency(bill.totalAmount)}
                  </td>

                  <td className="p-3 text-right">
                    {formatCurrency(bill.paidAmount)}
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
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

                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => navigate(`/billing/invoice/${bill.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Invoice
                    </button>

                    {bill.paymentStatus !== "PAID" && (
                      <button
                        onClick={() => navigate(`/billing/collect/${bill.id}`)}
                        className="text-green-600 hover:underline"
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

export default PatientBilling;
