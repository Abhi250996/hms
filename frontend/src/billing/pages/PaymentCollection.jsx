import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BillingController } from "../controller/billing.controller";
import Loader from "../../shared/components/Loader";
import { formatCurrency } from "../../core/utils/currency";

const PaymentCollection = () => {
  const { billId } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitPayment = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid payment amount");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await BillingController.collectPayment({
        billId: Number(billId),
        amount: Number(amount),
        paymentMode,
      });

      navigate(`/billing/invoice/${billId}`);
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Processing payment..." />;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-1 text-gray-800">
        Collect Payment
      </h2>
      <p className="text-sm text-gray-500 mb-6">Bill ID: #{billId}</p>

      <form
        onSubmit={submitPayment}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        {/* AMOUNT */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            min="1"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
            placeholder="Enter amount"
          />
          {amount && (
            <p className="text-xs text-gray-500 mt-1">
              {formatCurrency(Number(amount))}
            </p>
          )}
        </div>

        {/* PAYMENT MODE */}
        <div>
          <label className="block text-sm font-medium mb-1">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
            <option value="BANK">Bank Transfer</option>
          </select>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-2 rounded text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Collect Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentCollection;
