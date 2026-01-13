const express = require("express");
const router = express.Router();

const opdController = require("./opd.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * POST /api/opd
 * Create OPD visit (DOCTOR)
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  opdController.createOpdVisit
);

/**
 * GET /api/opd
 * Get all OPD visits
 */
router.get("/", authMiddleware, opdController.getOpdVisits);

/**
 * GET /api/opd/:id
 * Get OPD visit by ID
 */
router.get("/:id", authMiddleware, opdController.getOpdVisitById);

/**
 * PUT /api/opd/:id
 * Update OPD consultation (DOCTOR)
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  opdController.updateOpdVisit
);

/**
 * GET /api/opd/patient/:patientId
 * Get OPD history for a patient
 */
router.get(
  "/patient/:patientId",
  authMiddleware,
  opdController.getPatientOpdHistory
);

module.exports = router;
