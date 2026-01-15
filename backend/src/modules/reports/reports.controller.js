const reportsService = require("./reports.service");

// Helper to reduce boilerplate
const sendResponse = async (req, res, serviceMethod) => {
  try {
    const data = await serviceMethod();
    res.status(200).json(data);
  } catch (error) {
    console.error(`Report Error [${req.originalUrl}]:`, error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.dailyCollection = (req, res) => sendResponse(req, res, reportsService.dailyCollection);
exports.doctorRevenue = (req, res) => sendResponse(req, res, reportsService.doctorRevenue);
exports.departmentRevenue = (req, res) => sendResponse(req, res, reportsService.departmentRevenue);
exports.patientStats = (req, res) => sendResponse(req, res, reportsService.patientStats);
exports.bedOccupancy = (req, res) => sendResponse(req, res, reportsService.bedOccupancy);
exports.inventoryReport = (req, res) => sendResponse(req, res, reportsService.inventoryReport);