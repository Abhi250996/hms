import { useState } from "react";
import { BillingController } from "../controller/billing.controller";

export default function PaymentCollection({ billId }) {
  const [amount, setAmount] = useState("");

  const pay = async () => {
    await BillingController.collectPayment({
      billId,
      amount,
      paymentMode: "CASH",
    });
    alert("Payment successful");
  };

  return (
    <div>
      <h2>Collect Payment</h2>
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={pay}>Pay</button>
    </div>
  );
}
