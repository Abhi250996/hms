// src/modules/billing/billing.routes.js
const express = require("express");
const router = express.Router();

const billingController = require("./billing.controller");
const authMiddleware = require("../../middleware/auth.middleware");

/**
 * POST /api/billing
 * Create bill
 */
router.post("/", authMiddleware, billingController.createBill);

/**
 * GET /api/billing/patient/:patientId
 * Get bills of a patient
 */
router.get(
  "/patient/:patientId",
  authMiddleware,
  billingController.getPatientBills
);

/**
 * POST /api/billing/payment
 * Collect payment
 */
router.post("/payment", authMiddleware, billingController.collectPayment);

/**
 * POST /api/billing/refund
 * Refund payment
 */
router.post("/refund", authMiddleware, billingController.refundPayment);

/**
 * GET /api/billing/history
 * Billing history
 */
router.get("/history", authMiddleware, billingController.getBillingHistory);

/**
 * GET /api/billing/report
 * Billing report
 */
router.get("/report", authMiddleware, billingController.getBillingReport);

/**
 * GET /api/billing/invoice/:id
 * Generate invoice
 */
router.get("/invoice/:id", authMiddleware, billingController.generateInvoice);

/**
 * GET /api/billing/:id
 * Get bill by ID
 */
router.get("/:id", authMiddleware, billingController.getBillById);

module.exports = router;
