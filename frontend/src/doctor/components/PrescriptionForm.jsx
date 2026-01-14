import { useState } from "react";
import Input from "../../shared/components/Input";
import Textarea from "../../shared/components/Textarea";
import DatePicker from "../../shared/components/DatePicker";
import Button from "../../shared/components/Button";

const emptyMedicine = { name: "", dosage: "", duration: "" };

const PrescriptionForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    diagnosis: "",
    medicines: [{ ...emptyMedicine }],
    advice: "",
    followUpDate: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateMedicine = (index, key, value) => {
    const updated = [...form.medicines];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, medicines: updated }));
  };

  const addMedicine = () => {
    setForm((prev) => ({
      ...prev,
      medicines: [...prev.medicines, { ...emptyMedicine }],
    }));
  };

  const removeMedicine = (index) => {
    if (form.medicines.length === 1) return;
    setForm((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index),
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-xl shadow border p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Prescription Details
      </h3>

      {/* DIAGNOSIS */}
      <Textarea
        label="Diagnosis"
        required
        rows={3}
        value={form.diagnosis}
        onChange={(e) => handleChange("diagnosis", e.target.value)}
      />

      {/* MEDICINES */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medicines
        </label>

        <div className="space-y-3">
          {form.medicines.map((med, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <Input
                placeholder="Medicine Name"
                value={med.name}
                required
                onChange={(e) => updateMedicine(index, "name", e.target.value)}
              />

              <Input
                placeholder="Dosage"
                value={med.dosage}
                required
                onChange={(e) =>
                  updateMedicine(index, "dosage", e.target.value)
                }
              />

              <Input
                placeholder="Duration"
                value={med.duration}
                required
                onChange={(e) =>
                  updateMedicine(index, "duration", e.target.value)
                }
              />

              <Button
                type="button"
                variant="danger"
                disabled={form.medicines.length === 1}
                onClick={() => removeMedicine(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMedicine}
          className="mt-3 text-sm text-blue-600 hover:underline"
        >
          + Add Medicine
        </button>
      </div>

      {/* ADVICE */}
      <Textarea
        label="Advice"
        rows={2}
        value={form.advice}
        onChange={(e) => handleChange("advice", e.target.value)}
      />

      {/* FOLLOW UP */}
      <DatePicker
        label="Follow-up Date"
        value={form.followUpDate}
        onChange={(e) => handleChange("followUpDate", e.target.value)}
      />

      {/* ACTION */}
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Save Prescription
        </Button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
