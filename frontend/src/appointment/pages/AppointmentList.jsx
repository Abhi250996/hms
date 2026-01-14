// src/appointment/pages/AppointmentList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appointmentController } from "../controller/appointment.controller";

import Loader from "../../shared/components/Loader";
import Table from "../../shared/components/Table";

const AppointmentList = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    const res = await appointmentController.getAppointments();
    setAppointments(res?.data || []);
    setLoading(false);
  };

  const columns = [
    {
      header: "Patient",
      accessor: (a) => a.patient?.name || "-",
    },
    {
      header: "Doctor",
      accessor: (a) =>
        `Dr. ${a.doctor?.name || "-"} (${a.doctor?.department || "-"})`,
    },
    {
      header: "Date",
      accessor: (a) => a.date,
    },
    {
      header: "Time Slot",
      accessor: (a) => a.slot,
    },
    {
      header: "Status",
      accessor: (a) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            a.status === "CONFIRMED"
              ? "bg-green-100 text-green-700"
              : a.status === "CANCELLED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {a.status}
        </span>
      ),
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
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Patient
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Appointments</h2>
        <button
          onClick={() => navigate("/appointments/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Book Appointment
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
          No appointments found
        </div>
      ) : (
        <Table columns={columns} data={appointments} />
      )}
    </div>
  );
};

export default AppointmentList;
