// src/patient/pages/OPDVisitCreate.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorDropdown from "../components/DoctorDropdown";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Textarea from "../../shared/components/Textarea";
import { opdController } from "../../opd/controller/opd.controller";

export default function OPDVisitCreate() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctorId: "",
    diagnosis: "",
    prescription: "",
    visitDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await opdController.createOpdVisit({
        patientId: Number(patientId),
        doctorId: Number(form.doctorId),
        diagnosis: form.diagnosis,
        prescription: form.prescription,
        visitDate: form.visitDate,
      });

      navigate(`/patients/${patientId}`);
    } catch (err) {
      alert(err.message || "Failed to create OPD visit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create OPD Visit</h2>

      <Card className="p-6">
        <form onSubmit={submit} className="space-y-6">
          <DoctorDropdown
            value={form.doctorId}
            onChange={(val) => update("doctorId", val)}
          />

          <Textarea
            label="Diagnosis"
            placeholder="Enter diagnosis"
            value={form.diagnosis}
            onChange={(e) => update("diagnosis", e.target.value)}
          />

          <Textarea
            label="Prescription"
            placeholder="Enter prescription"
            value={form.prescription}
            onChange={(e) => update("prescription", e.target.value)}
          />

          <Input
            type="date"
            label="Visit Date"
            value={form.visitDate}
            onChange={(e) => update("visitDate", e.target.value)}
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
              Create OPD Visit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
