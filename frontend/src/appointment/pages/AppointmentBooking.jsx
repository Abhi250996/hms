// src/appointment/pages/AppointmentBooking.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appointmentController } from "../controller/appointment.controller";
import { doctorController } from "../../doctor/controller/doctor.controller";
import { patientController } from "../../patient/controller/patient.controller";

import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";
import DatePicker from "../../shared/components/DatePicker";
import Loader from "../../shared/components/Loader";

const AppointmentBooking = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    slot: "",
    reason: "",
  });

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    setPageLoading(true);
    const pRes = await patientController.getPatients();
    const dRes = await doctorController.getDoctors();
    setPatients(pRes?.data || []);
    setDoctors(dRes?.data || []);
    setPageLoading(false);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await appointmentController.createAppointment(form);
    setLoading(false);
    navigate("/appointments");
  };

  if (pageLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Book Appointment</h2>

      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Patient */}
        <Select
          label="Patient"
          value={form.patientId}
          required
          options={patients.map((p) => ({
            label: `${p.name} (${p.mobile})`,
            value: p.id,
          }))}
          onChange={(e) => handleChange("patientId", e.target.value)}
        />

        {/* Doctor */}
        <Select
          label="Doctor"
          value={form.doctorId}
          required
          options={doctors.map((d) => ({
            label: `${d.name} - ${d.department}`,
            value: d.id,
          }))}
          onChange={(e) => handleChange("doctorId", e.target.value)}
        />

        {/* Date */}
        <DatePicker
          label="Appointment Date"
          value={form.appointmentDate}
          required
          onChange={(e) => handleChange("appointmentDate", e.target.value)}
        />

        {/* Slot */}
        <Input
          label="Time Slot"
          type="time"
          value={form.slot}
          required
          onChange={(e) => handleChange("slot", e.target.value)}
        />

        {/* Reason */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Visit Reason</label>
          <textarea
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Reason for appointment"
            value={form.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentBooking;
