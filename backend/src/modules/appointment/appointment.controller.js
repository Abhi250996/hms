// src/modules/appointment/appointment.controller.js
const appointmentService = require("./appointment.service");
const { success, error } = require("../../utils/response");

/**
 * POST /api/appointments
 * Create new appointment
 */
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return error(res, "Required fields missing", 422);
    }

    const appointment = await appointmentService.createAppointment({
      patientId,
      doctorId,
      date,
      time,
      createdBy: req.user.id,
    });

    return success(res, appointment, "Appointment created", 201);
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/appointments
 */
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointments();
    return success(res, appointments, "Appointments fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/appointments/:id
 */
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointmentById(
      req.params.id
    );
    return success(res, appointment, "Appointment fetched");
  } catch (err) {
    return error(res, err.message, 404);
  }
};

/**
 * PUT /api/appointments/:id
 * Update / Reschedule
 */
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.updateAppointment(
      req.params.id,
      req.body
    );
    return success(res, appointment, "Appointment updated");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * DELETE /api/appointments/:id
 * Cancel appointment
 */
exports.cancelAppointment = async (req, res) => {
  try {
    await appointmentService.cancelAppointment(req.params.id);
    return success(res, null, "Appointment cancelled");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/appointments/doctor/:doctorId
 */
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getDoctorAppointments(
      req.params.doctorId
    );
    return success(res, appointments, "Doctor appointments fetched");
  } catch (err) {
    return error(res, err.message);
  }
};
