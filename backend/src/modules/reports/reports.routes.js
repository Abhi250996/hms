// src/modules/reports/reports.routes.js
const express = require("express");
const router = express.Router();

const reportsController = require("./reports.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * Reports – READ ONLY
 * Access: ADMIN / DOCTOR
 */

router.get(
  "/daily-collection",
  authMiddleware,
  roleMiddleware("ADMIN"),
  reportsController.dailyCollection
);

router.get(
  "/doctor-revenue",
  authMiddleware,
  roleMiddleware("ADMIN"),
  reportsController.doctorRevenue
);

router.get(
  "/department",
  authMiddleware,
  roleMiddleware("ADMIN"),
  reportsController.departmentRevenue
);

router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  reportsController.patientStats
);

router.get(
  "/bed-occupancy",
  authMiddleware,
  roleMiddleware("ADMIN"),
  reportsController.bedOccupancy
);

router.get(
  "/inventory",
  authMiddleware,
  roleMiddleware("ADMIN"),
  reportsController.inventoryReport
);

module.exports = router;
