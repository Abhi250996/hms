// src/pharmacy/pages/PurchaseStockEntry.jsx
import { useState } from "react";
import { pharmacyRepository } from "../repository/pharmacy.repository";

const PurchaseStockEntry = () => {
  const [form, setForm] = useState({
    name: "",
    batch: "",
    expiryDate: "",
    quantity: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await pharmacyRepository.addMedicine({
        name: form.name,
        batch: form.batch,
        expiryDate: form.expiryDate,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });
      setMessage("Stock added successfully");
      setForm({
        name: "",
        batch: "",
        expiryDate: "",
        quantity: "",
        price: "",
      });
    } catch (err) {
      setMessage("Failed to add stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Purchase / Add Medicine Stock</h2>

      <form onSubmit={submit} className="bg-white shadow rounded p-6 space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Medicine Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="batch"
          value={form.batch}
          onChange={handleChange}
          placeholder="Batch Number"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          step="0.01"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price per unit"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Add Stock"}
        </button>

        {message && (
          <p className="text-center text-sm text-blue-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default PurchaseStockEntry;
