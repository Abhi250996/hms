// src/appointment/model/appointment.model.js

export const createAppointmentModel = () => ({
  patientId: "",
  doctorId: "",
  appointmentDate: "",
  appointmentTime: "",
  reason: "",
  status: "SCHEDULED", // SCHEDULED | COMPLETED | CANCELLED
});
