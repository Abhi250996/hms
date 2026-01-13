// src/modules/billing/billing.controller.js
const billingService = require("./billing.service");
const { success, error } = require("../../utils/response");

/**
 * POST /api/billing
 * Create bill
 */
exports.createBill = async (req, res) => {
  try {
    const { patientId, totalAmount } = req.body;

    if (!patientId || !totalAmount) {
      return error(res, "Required fields missing", 422);
    }

    const bill = await billingService.createBill({
      patientId,
      totalAmount,
      createdBy: req.user.id,
    });

    return success(res, bill, "Bill created successfully", 201);
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/billing/:id
 */
exports.getBillById = async (req, res) => {
  try {
    const bill = await billingService.getBillById(req.params.id);
    return success(res, bill, "Bill fetched");
  } catch (err) {
    return error(res, err.message, 404);
  }
};

/**
 * GET /api/billing/patient/:patientId
 */
exports.getPatientBills = async (req, res) => {
  try {
    const bills = await billingService.getPatientBills(req.params.patientId);
    return success(res, bills, "Patient bills fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * POST /api/billing/payment
 */
exports.collectPayment = async (req, res) => {
  try {
    const { billId, amount, paymentMode } = req.body;

    if (!billId || !amount || !paymentMode) {
      return error(res, "Required fields missing", 422);
    }

    const result = await billingService.collectPayment({
      billId,
      amount,
      paymentMode,
      collectedBy: req.user.id,
    });

    return success(res, result, "Payment collected");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/billing/invoice/:id
 */
exports.generateInvoice = async (req, res) => {
  try {
    const invoice = await billingService.generateInvoice(req.params.id);
    return success(res, invoice, "Invoice generated");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * POST /api/billing/refund
 */
exports.refundPayment = async (req, res) => {
  try {
    const { billId, amount, reason } = req.body;

    if (!billId || !amount) {
      return error(res, "Required fields missing", 422);
    }

    const result = await billingService.refundPayment({
      billId,
      amount,
      reason,
      refundedBy: req.user.id,
    });

    return success(res, result, "Refund processed");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/billing/history
 */
exports.getBillingHistory = async (req, res) => {
  try {
    const history = await billingService.getBillingHistory();
    return success(res, history, "Billing history fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/billing/report
 */
exports.getBillingReport = async (req, res) => {
  try {
    const report = await billingService.getBillingReport();
    return success(res, report, "Billing report fetched");
  } catch (err) {
    return error(res, err.message);
  }
};
