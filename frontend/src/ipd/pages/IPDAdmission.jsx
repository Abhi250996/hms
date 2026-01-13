import { useState } from "react";
import { admitPatient } from "../controller/ipd.controller";
import { useNavigate, useLocation } from "react-router-dom";

export default function IPDAdmission() {
  const navigate = useNavigate();
  const { state } = useLocation(); // patientId, doctorId

  const [form, setForm] = useState({
    patientId: state?.patientId,
    doctorId: state?.doctorId,
    bedNumber: "",
    ward: "General",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await admitPatient(form);
    navigate(`/ipd/${res.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admit Patient (IPD)</h2>

      <input
        name="bedNumber"
        placeholder="Bed Number"
        onChange={handleChange}
      />

      <select name="ward" onChange={handleChange}>
        <option value="General">General</option>
        <option value="Private">Private</option>
      </select>

      <input
        type="date"
        name="admissionDate"
        value={form.admissionDate}
        onChange={handleChange}
      />

      <button type="submit">Admit</button>
    </form>
  );
}
