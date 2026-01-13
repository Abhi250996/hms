import { useEffect, useState } from "react";
import { BillingController } from "../controller/billing.controller";

export default function Invoice({ billId }) {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    const data = await BillingController.getInvoice(billId);
    setInvoice(data);
  };

  if (!invoice) return null;

  return (
    <div>
      <h2>Invoice</h2>
      <p>Invoice No: {invoice.invoiceNumber}</p>
      <p>Total: ₹{invoice.totalAmount}</p>
    </div>
  );
}
