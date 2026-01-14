// src/pharmacy/pages/MedicineInventory.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicines, addMedicine, updateMedicine } from "../pharmacySlice";

const emptyForm = {
  name: "",
  batch: "",
  expiryDate: "",
  quantity: "",
  price: "",
};

const MedicineInventory = () => {
  const dispatch = useDispatch();
  const { medicines = [], loading } = useSelector(
    (state) => state.pharmacy || {}
  );

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    };

    if (editId) {
      dispatch(updateMedicine({ id: editId, data: payload }));
    } else {
      dispatch(addMedicine(payload));
    }

    setForm(emptyForm);
    setEditId(null);
  };

  const startEdit = (m) => {
    setEditId(m.id);
    setForm({
      name: m.name || "",
      batch: m.batch || "",
      expiryDate: m.expiryDate || "",
      quantity: m.quantity ?? "",
      price: m.price ?? "",
    });
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Medicine Inventory</h1>

      {/* ADD / EDIT FORM */}
      <form
        onSubmit={submit}
        className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow"
      >
        <input
          className="border p-2 rounded"
          name="name"
          placeholder="Medicine Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          name="batch"
          placeholder="Batch"
          value={form.batch}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          className="border p-2 rounded"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className="border p-2 rounded"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          className="border p-2 rounded"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Medicine" : "Add Medicine"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Batch</th>
              <th className="p-2">Expiry</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              medicines.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-2">{m.name}</td>
                  <td className="p-2 text-center">{m.batch}</td>
                  <td className="p-2 text-center">{m.expiryDate}</td>
                  <td className="p-2 text-center">{m.quantity}</td>
                  <td className="p-2 text-center">₹{m.price}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => startEdit(m)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && medicines.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No medicines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineInventory;
