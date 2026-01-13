// src/modules/appointment/appointment.routes.js
const express = require("express");
const router = express.Router();

const appointmentController = require("./appointment.controller");
const authMiddleware = require("../../middleware/auth.middleware");

/**
 * POST /api/appointments
 * Book new appointment
 */
router.post("/", authMiddleware, appointmentController.createAppointment);

/**
 * GET /api/appointments
 * Get all appointments
 */
router.get("/", authMiddleware, appointmentController.getAppointments);

/**
 * GET /api/appointments/doctor/:doctorId
 * Get appointments for a specific doctor
 */
router.get(
  "/doctor/:doctorId",
  authMiddleware,
  appointmentController.getDoctorAppointments
);

/**
 * GET /api/appointments/:id
 * Get appointment by ID
 */
router.get("/:id", authMiddleware, appointmentController.getAppointmentById);

/**
 * PUT /api/appointments/:id
 * Update / reschedule appointment
 */
router.put("/:id", authMiddleware, appointmentController.updateAppointment);

/**
 * DELETE /api/appointments/:id
 * Cancel appointment
 */
router.delete("/:id", authMiddleware, appointmentController.cancelAppointment);

module.exports = router;
