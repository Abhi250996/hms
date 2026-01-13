import { useEffect, useState } from "react";
import { BillingController } from "../controller/billing.controller";

export default function PatientBilling({ patientId }) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    const data = await BillingController.getPatientBills(patientId);
    setBills(data);
  };

  return (
    <div>
      <h2>Patient Billing</h2>

      {bills.map((bill) => (
        <div key={bill.id}>
          <p>Total: ₹{bill.totalAmount}</p>
          <p>Paid: ₹{bill.paidAmount}</p>
          <p>Status: {bill.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
}
