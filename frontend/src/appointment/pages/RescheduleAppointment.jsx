// src/appointment/pages/RescheduleAppointment.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appointmentController } from "../controller/appointment.controller";
import Loader from "../../shared/components/Loader";

const RescheduleAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    appointmentDate: "",
    slot: "",
    reason: "",
  });

  useEffect(() => {
    loadAppointment();
  }, [id]);

  const loadAppointment = async () => {
    try {
      setLoading(true);
      const res = await appointmentController.getAppointment(id);
      const data = res.data;

      setAppointment(data);
      setForm({
        appointmentDate: data.date,
        slot: data.slot,
        reason: data.reason || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await appointmentController.rescheduleAppointment(id, form);

    setSaving(false);
    navigate("/appointments");
  };

  if (loading) return <Loader />;
  if (!appointment) return <p className="p-6">Appointment not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Reschedule Appointment</h2>
      <p className="text-slate-500 mb-6">
        Patient: <b>{appointment.patient?.name}</b> | Doctor:{" "}
        <b>Dr. {appointment.doctor?.name}</b>
      </p>

      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >
        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Appointment Date
          </label>
          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Slot */}
        <div>
          <label className="block text-sm font-medium mb-1">Time Slot</label>
          <input
            type="time"
            name="slot"
            value={form.slot}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Reason (optional)
          </label>
          <textarea
            name="reason"
            rows="3"
            value={form.reason}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Actions */}
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
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Reschedule"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RescheduleAppointment;
