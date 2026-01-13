// src/modules/doctor/doctor.controller.js
const doctorService = require("./doctor.service");
const { success, error } = require("../../utils/response");

/**
 * POST /api/doctors
 * Create new doctor
 */
exports.createDoctor = async (req, res) => {
  try {
    const {
      staffId,
      name,
      email,
      mobile,
      department,
      specialization,
      designation,
      status,
      joiningDate,
    } = req.body;

    if (!staffId || !name || !department || !specialization) {
      return error(res, "Required fields missing", 422);
    }

    const doctor = await doctorService.createDoctor({
      staffId,
      name,
      email,
      mobile,
      department,
      specialization,
      designation,
      status,
      joiningDate,
      createdBy: req.user.id,
    });

    return success(res, doctor, "Doctor created successfully", 201);
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/doctors
 * Get all doctors
 */
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getDoctors();
    return success(res, doctors, "Doctors fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/doctors/:id
 * Get doctor by ID
 */
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    return success(res, doctor, "Doctor fetched");
  } catch (err) {
    return error(res, err.message, 404);
  }
};

/**
 * PUT /api/doctors/:id
 * Update doctor details
 */
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.updateDoctor(req.params.id, req.body);
    return success(res, doctor, "Doctor updated");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * DELETE /api/doctors/:id
 * Delete doctor
 */
exports.deleteDoctor = async (req, res) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    return success(res, null, "Doctor deleted successfully");
  } catch (err) {
    return error(res, err.message);
  }
};
