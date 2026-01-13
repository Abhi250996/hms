const express = require("express");
const router = express.Router();

const labController = require("./lab.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * POST /api/lab/tests
 * Create lab test order (DOCTOR)
 */
router.post(
  "/tests",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  labController.createTestOrder
);

/**
 * GET /api/lab/tests
 * Get all lab test orders
 */
router.get("/tests", authMiddleware, labController.getTestOrders);

/**
 * GET /api/lab/tests/:id
 * Get lab test by ID
 */
router.get("/tests/:id", authMiddleware, labController.getTestById);

/**
 * PUT /api/lab/tests/:id/sample
 * Mark sample collected (LAB / DOCTOR)
 */
router.put(
  "/tests/:id/sample",
  authMiddleware,
  roleMiddleware("DOCTOR", "STAFF"),
  labController.markSampleCollected
);

/**
 * PUT /api/lab/tests/:id/result
 * Enter test result (LAB / DOCTOR)
 */
router.put(
  "/tests/:id/result",
  authMiddleware,
  roleMiddleware("DOCTOR", "STAFF"),
  labController.enterTestResult
);

/**
 * GET /api/lab/tests/patient/:patientId
 * Get patient lab history
 */
router.get(
  "/tests/patient/:patientId",
  authMiddleware,
  labController.getPatientLabHistory
);

module.exports = router;
