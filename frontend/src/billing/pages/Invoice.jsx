import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BillingController } from "../controller/billing.controller";
import Loader from "../../shared/components/Loader";
import { formatCurrency } from "../../core/utils/currency";
import { formatDate } from "../../core/utils/date";

const Invoice = () => {
  const { id } = useParams(); // billId
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoice();
  }, [id]);

  const loadInvoice = async () => {
    try {
      setLoading(true);
      const res = await BillingController.getInvoice(id);
      setInvoice(res?.data || null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader label="Loading invoice..." />;
  if (!invoice)
    return <p className="p-6 text-center text-gray-500">Invoice not found</p>;

  const balance = invoice.totalAmount - invoice.paidAmount;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
      {/* HEADER */}
      <div className="flex justify-between items-start border-b pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Invoice</h2>
          <p className="text-sm text-gray-500">Invoice ID: #{invoice.id}</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Hospital Management System</p>
          <p className="text-sm text-gray-500">
            Generated on {formatDate(invoice.createdAt)}
          </p>
        </div>
      </div>

      {/* PATIENT + STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Patient Details</h3>
          <p>
            <b>ID:</b> {invoice.patientId}
          </p>
          {invoice.patient && (
            <>
              <p>
                <b>Name:</b> {invoice.patient.name}
              </p>
              <p>
                <b>Mobile:</b> {invoice.patient.mobile}
              </p>
            </>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Billing Summary</h3>
          <p className="mb-1">
            Status:{" "}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  invoice.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-700"
                    : invoice.paymentStatus === "PARTIAL"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {invoice.paymentStatus}
            </span>
          </p>
          <p>Total: {formatCurrency(invoice.totalAmount)}</p>
          <p>Paid: {formatCurrency(invoice.paidAmount)}</p>
        </div>
      </div>

      {/* BILL ITEMS */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Bill Items</h3>

        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.items || []).length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="border p-3 text-center text-gray-500"
                >
                  No bill items
                </td>
              </tr>
            ) : (
              invoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2 text-right">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* TOTAL */}
      <div className="flex justify-end border-t pt-4">
        <div className="w-full md:w-1/2 space-y-2">
          <div className="flex justify-between">
            <span>Total</span>
            <span>{formatCurrency(invoice.totalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Paid</span>
            <span>{formatCurrency(invoice.paidAmount)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Balance</span>
            <span>{formatCurrency(balance)}</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end mt-6 gap-3">
        <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
