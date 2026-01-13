import { useEffect, useState } from "react";
import { PharmacyController } from "../controller/pharmacy.controller";

export default function PharmacyBilling({ patientId }) {
  const [bill, setBill] = useState(null);

  useEffect(() => {
    loadBill();
  }, []);

  const loadBill = async () => {
    const data = await PharmacyController.getPatientBill(patientId);
    setBill(data);
  };

  if (!bill) return null;

  return (
    <div>
      <h2>Pharmacy Bill</h2>
      <p>Total Amount: ₹{bill.totalAmount}</p>
      <p>Status: {bill.paymentStatus}</p>
    </div>
  );
}
