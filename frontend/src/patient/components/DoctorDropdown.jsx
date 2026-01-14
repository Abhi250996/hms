// src/patient/components/DoctorDropdown.jsx
import { useEffect, useState } from "react";
import axios from "../../core/api/axios";

export default function DoctorDropdown({ value, onChange, label = "Doctor" }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/doctors");
      setDoctors(res.data || []);
    } catch (err) {
      console.error("Failed to load doctors", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2"
        disabled={loading}
        required
      >
        <option value="">
          {loading ? "Loading doctors..." : "Select Doctor"}
        </option>
        {doctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name} — {doc.department}
          </option>
        ))}
      </select>
    </div>
  );
}
