// src/modules/doctor/doctor.routes.js
const express = require("express");
const router = express.Router();

const doctorController = require("./doctor.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * POST /api/doctors
 * Create doctor (ADMIN only)
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  doctorController.createDoctor
);

/**
 * GET /api/doctors
 * Get all doctors
 */
router.get("/", authMiddleware, doctorController.getDoctors);

/**
 * GET /api/doctors/:id
 * Get doctor by ID
 */
router.get("/:id", authMiddleware, doctorController.getDoctorById);

/**
 * PUT /api/doctors/:id
 * Update doctor (ADMIN only)
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  doctorController.updateDoctor
);

/**
 * DELETE /api/doctors/:id
 * Delete doctor (ADMIN only)
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  doctorController.deleteDoctor
);

module.exports = router;
