// src/pharmacy/pages/PharmacyBilling.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pharmacyRepository } from "../repository/pharmacy.repository";
import { BillingController } from "../../billing/controller/billing.controller";
import { formatCurrency } from "../../core/utils/currency";

const PharmacyBilling = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingBill, setCreatingBill] = useState(false);

  useEffect(() => {
    if (patientId) loadBilling();
  }, [patientId]);

  const loadBilling = async () => {
    try {
      setLoading(true);
      const res = await pharmacyRepository.getPharmacyBill(Number(patientId));
      setItems(res?.data || []);
    } catch (err) {
      console.error("Failed to load pharmacy billing", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.price),
    0
  );

  const createBill = async () => {
    try {
      setCreatingBill(true);

      const res = await BillingController.createBill({
        patientId: Number(patientId),
        totalAmount,
        source: "PHARMACY",
        items,
      });

      const billId = res?.data?.id || res?.id;
      if (billId) {
        navigate(`/billing/invoice/${billId}`);
      }
    } catch (err) {
      console.error("Failed to create pharmacy bill", err);
      alert("Failed to generate invoice");
    } finally {
      setCreatingBill(false);
    }
  };

  if (loading) return <p className="p-6">Loading pharmacy billing...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pharmacy Billing</h1>

      {items.length === 0 ? (
        <p>No medicines issued for this patient.</p>
      ) : (
        <>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Medicine</th>
                <th className="border p-2 text-center">Qty</th>
                <th className="border p-2 text-right">Price</th>
                <th className="border p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td className="border p-2">{i.medicineName}</td>
                  <td className="border p-2 text-center">{i.quantity}</td>
                  <td className="border p-2 text-right">
                    {formatCurrency(i.price)}
                  </td>
                  <td className="border p-2 text-right">
                    {formatCurrency(Number(i.price) * Number(i.quantity))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end text-lg font-semibold">
            Total: {formatCurrency(totalAmount)}
          </div>

          <div className="flex justify-end">
            <button
              onClick={createBill}
              disabled={creatingBill}
              className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60"
            >
              {creatingBill ? "Generating Invoice..." : "Generate Invoice"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PharmacyBilling;
