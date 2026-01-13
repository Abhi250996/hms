// src/modules/reports/reports.controller.js
const reportsService = require("./reports.service");

/**
 * GET /api/reports/daily-collection
 */
exports.dailyCollection = async (req, res) => {
  try {
    const data = await reportsService.dailyCollection();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/reports/doctor-revenue
 */
exports.doctorRevenue = async (req, res) => {
  try {
    const data = await reportsService.doctorRevenue();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/reports/department
 */
exports.departmentRevenue = async (req, res) => {
  try {
    const data = await reportsService.departmentRevenue();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/reports/patient
 */
exports.patientStats = async (req, res) => {
  try {
    const data = await reportsService.patientStats();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/reports/bed-occupancy
 */
exports.bedOccupancy = async (req, res) => {
  try {
    const data = await reportsService.bedOccupancy();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/reports/inventory
 */
exports.inventoryReport = async (req, res) => {
  try {
    const data = await reportsService.inventoryReport();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
