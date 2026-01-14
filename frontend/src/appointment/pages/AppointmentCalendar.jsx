// src/appointment/pages/AppointmentCalendar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appointmentController } from "../controller/appointment.controller";

import DatePicker from "../../shared/components/DatePicker";
import Loader from "../../shared/components/Loader";
import Table from "../../shared/components/Table";

const AppointmentCalendar = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, [date]);

  const loadAppointments = async () => {
    setLoading(true);
    const res = await appointmentController.getAppointmentsByDate(date);
    setAppointments(res?.data || []);
    setLoading(false);
  };

  const columns = [
    { header: "Patient", accessor: (a) => a.patient?.name || "-" },
    {
      header: "Doctor",
      accessor: (a) =>
        `${a.doctor?.name || "-"} (${a.doctor?.department || "-"})`,
    },
    { header: "Time", accessor: (a) => a.slot },
    {
      header: "Reason",
      accessor: (a) => a.reason || "General Consultation",
    },
    {
      header: "Actions",
      accessor: (a) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/appointments/reschedule/${a.id}`)}
            className="px-3 py-1 text-xs border rounded hover:bg-slate-100"
          >
            Reschedule
          </button>
          <button
            onClick={() => navigate(`/patients/${a.patientId}`)}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
          >
            Patient
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Appointment Calendar</h2>
        <button
          onClick={() => navigate("/appointments/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + New Appointment
        </button>
      </div>

      {/* DATE FILTER */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 max-w-sm">
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* LIST */}
      {loading ? (
        <Loader />
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
          No appointments for selected date
        </div>
      ) : (
        <Table columns={columns} data={appointments} />
      )}
    </div>
  );
};

export default AppointmentCalendar;
