const express = require("express");
const router = express.Router();

const patientController = require("./patient.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * POST /api/patients
 * Create new patient (ADMIN / STAFF)
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  patientController.createPatient
);

/**
 * GET /api/patients
 * Get all patients
 */
router.get("/", authMiddleware, patientController.getPatients);

/**
 * GET /api/patients/:id
 * Get patient by ID
 */
router.get("/:id", authMiddleware, patientController.getPatientById);

/**
 * PUT /api/patients/:id
 * Update patient details (ADMIN / STAFF)
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  patientController.updatePatient
);

/**
 * DELETE /api/patients/:id
 * Delete patient (ADMIN only)
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  patientController.deletePatient
);

/**
 * POST /api/patients/:id/documents
 * Upload patient documents (ADMIN / STAFF)
 */
router.post(
  "/:id/documents",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  patientController.uploadDocuments
);

/**
 * GET /api/patients/:id/history
 * Get patient OPD/IPD history
 */
router.get("/:id/history", authMiddleware, patientController.getPatientHistory);

module.exports = router;
