import { useState } from "react";
import { PharmacyController } from "../controller/pharmacy.controller";

export default function PurchaseStockEntry() {
  const [form, setForm] = useState({
    name: "",
    batch: "",
    expiryDate: "",
    quantity: "",
    price: "",
  });

  const submit = async () => {
    await PharmacyController.addMedicine(form);
    alert("Medicine added");
  };

  return (
    <div>
      <h2>Add Medicine</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Batch"
        onChange={(e) => setForm({ ...form, batch: e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
      />
      <input
        placeholder="Quantity"
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
      <input
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={submit}>Save</button>
    </div>
  );
}
