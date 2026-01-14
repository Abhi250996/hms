const express = require("express");
const router = express.Router();
const reportsController = require("./reports.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

// Applied authMiddleware to all routes in this router
router.use(authMiddleware);

router.get("/daily-collection", roleMiddleware("ADMIN"), reportsController.dailyCollection);
router.get("/doctor-revenue", roleMiddleware("ADMIN"), reportsController.doctorRevenue);
router.get("/department", roleMiddleware("ADMIN"), reportsController.departmentRevenue);
router.get("/patient", roleMiddleware("ADMIN", "DOCTOR"), reportsController.patientStats);
router.get("/bed-occupancy", roleMiddleware("ADMIN"), reportsController.bedOccupancy);
router.get("/inventory", roleMiddleware("ADMIN"), reportsController.inventoryReport);

module.exports = router;