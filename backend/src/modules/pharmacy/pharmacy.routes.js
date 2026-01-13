// src/modules/pharmacy/pharmacy.routes.js
const express = require("express");
const router = express.Router();

const pharmacyController = require("./pharmacy.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * POST /api/pharmacy/medicines
 * Add medicine (ADMIN / STAFF)
 */
router.post(
  "/medicines",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  pharmacyController.addMedicine
);

/**
 * GET /api/pharmacy/medicines
 * Get all medicines
 */
router.get("/medicines", authMiddleware, pharmacyController.getMedicines);

/**
 * PUT /api/pharmacy/medicines/:id
 * Update medicine (ADMIN / STAFF)
 */
router.put(
  "/medicines/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  pharmacyController.updateMedicine
);

/**
 * POST /api/pharmacy/issue
 * Issue medicine (STAFF)
 */
router.post(
  "/issue",
  authMiddleware,
  roleMiddleware("STAFF"),
  pharmacyController.issueMedicine
);

/**
 * GET /api/pharmacy/stock/expiry
 * Get expiry stock (ADMIN / STAFF)
 */
router.get(
  "/stock/expiry",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  pharmacyController.getExpiryStock
);

/**
 * GET /api/pharmacy/billing/:patientId
 * Get pharmacy bill for patient
 */
router.get(
  "/billing/:patientId",
  authMiddleware,
  pharmacyController.getPharmacyBill
);

module.exports = router;
