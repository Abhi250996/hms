const express = require("express");
const router = express.Router();

const ipdController = require("./ipd.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * POST /api/ipd
 * Admit patient (ADMIN / DOCTOR)
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  ipdController.admitPatient
);

/**
 * GET /api/ipd
 * Get all IPD admissions
 */
router.get("/", authMiddleware, ipdController.getIpdList);

/**
 * GET /api/ipd/:id
 * Get IPD admission by ID
 */
router.get("/:id", authMiddleware, ipdController.getIpdById);

/**
 * PUT /api/ipd/:id
 * Update IPD treatment (DOCTOR)
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  ipdController.updateIpd
);

/**
 * PUT /api/ipd/:id/discharge
 * Discharge patient (DOCTOR)
 */
router.put(
  "/:id/discharge",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  ipdController.dischargePatient
);

/**
 * GET /api/ipd/patient/:patientId
 * Get IPD history for a patient
 */
router.get(
  "/patient/:patientId",
  authMiddleware,
  ipdController.getPatientIpdHistory
);

module.exports = router;
