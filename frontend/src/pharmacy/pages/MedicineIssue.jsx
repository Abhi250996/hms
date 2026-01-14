// src/pharmacy/pages/MedicineIssue.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicines, issueMedicine } from "../pharmacySlice";
import { fetchPatients } from "../../patient/patientSlice";

const MedicineIssue = () => {
  const dispatch = useDispatch();

  const { medicines = [], loading: medLoading } = useSelector(
    (state) => state.pharmacy || {}
  );
  const { patients = [], loading: patientLoading } = useSelector(
    (state) => state.patient || {}
  );

  const [form, setForm] = useState({
    patientId: "",
    medicineId: "",
    quantity: "",
  });

  useEffect(() => {
    dispatch(fetchMedicines());
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      issueMedicine({
        patientId: Number(form.patientId),
        medicineId: Number(form.medicineId),
        quantity: Number(form.quantity),
      })
    );

    setForm({ patientId: "", medicineId: "", quantity: "" });
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Issue Medicine</h1>

      <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
        {/* PATIENT */}
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={patientLoading}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.patientId})
            </option>
          ))}
        </select>

        {/* MEDICINE */}
        <select
          name="medicineId"
          value={form.medicineId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={medLoading}
        >
          <option value="">Select Medicine</option>
          {medicines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} | Stock: {m.quantity}
            </option>
          ))}
        </select>

        {/* QUANTITY */}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          min="1"
        />

        <button
          type="submit"
          disabled={medLoading || patientLoading}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
        >
          {medLoading ? "Issuing..." : "Issue Medicine"}
        </button>
      </form>
    </div>
  );
};

export default MedicineIssue;
