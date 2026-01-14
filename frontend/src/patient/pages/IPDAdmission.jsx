// src/patient/pages/IPDAdmission.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorDropdown from "../components/DoctorDropdown";
import BedSelector from "../components/BedSelector";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import { ipdController } from "../../ipd/controller/ipd.controller";

export default function IPDAdmission() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctorId: "",
    ward: "",
    bedNumber: "",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ipdController.admitPatient({
        patientId: Number(patientId),
        doctorId: Number(form.doctorId),
        ward: form.ward,
        bedNumber: form.bedNumber,
        admissionDate: form.admissionDate,
      });

      navigate(`/patients/${patientId}`);
    } catch (err) {
      alert(err.message || "Failed to admit patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">IPD Admission</h2>

      <Card className="p-6">
        <form onSubmit={submit} className="space-y-6">
          <DoctorDropdown
            value={form.doctorId}
            onChange={(val) => update("doctorId", val)}
          />

          <BedSelector
            value={form.bedNumber}
            wardValue={form.ward}
            onChange={(val) => update("bedNumber", val)}
            onWardChange={(val) => update("ward", val)}
          />

          <Input
            type="date"
            label="Admission Date"
            value={form.admissionDate}
            onChange={(e) => update("admissionDate", e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button type="submit" loading={loading}>
              Admit Patient
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
