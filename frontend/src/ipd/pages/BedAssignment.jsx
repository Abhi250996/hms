// src/ipd/pages/BedAssignment.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ipdRepository } from "../repository/ipd.repository";
import Loader from "../../shared/components/Loader";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";

const BedAssignment = () => {
  const { id } = useParams(); // IPD admission ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bedNumber: "",
    ward: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAdmission();
  }, [id]);

  const loadAdmission = async () => {
    try {
      setLoading(true);
      const res = await ipdRepository.getById(id);
      const data = res.data?.data || res.data;

      setForm({
        bedNumber: data?.bedNumber || "",
        ward: data?.ward || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await ipdRepository.update(id, form);
    setSaving(false);
    navigate(-1);
  };

  if (loading) return <Loader label="Loading admission details..." />;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Bed & Ward Assignment</h2>
        <p className="text-sm text-gray-500">
          Assign or update bed and ward for admitted patient
        </p>
      </div>

      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow border p-6 space-y-4"
      >
        <Input
          label="Bed Number"
          placeholder="e.g. B-12"
          value={form.bedNumber}
          required
          onChange={(e) => handleChange("bedNumber", e.target.value)}
        />

        <Select
          label="Ward"
          value={form.ward}
          required
          onChange={(e) => handleChange("ward", e.target.value)}
          options={[
            { label: "Select Ward", value: "" },
            { label: "General", value: "General" },
            { label: "Semi-Private", value: "Semi-Private" },
            { label: "Private", value: "Private" },
            { label: "ICU", value: "ICU" },
          ]}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BedAssignment;
