// src/modules/admin/admin.controller.js
const adminService = require("./admin.service");
const { success, error } = require("../../utils/response");

/**
 * POST /api/admin/users
 * Create staff/user (Admin only)
 */
exports.createUser = async (req, res) => {
  try {
    const {
      staffId,
      name,
      email,
      mobile,
      role,
      designation,
      department,
      password,
      status,
      joiningDate,
    } = req.body;

    if (!staffId || !name || !email || !role || !password) {
      return error(res, "Required fields missing", 422);
    }

    const user = await adminService.createUser({
      staffId,
      name,
      email,
      mobile,
      role,
      designation,
      department,
      password,
      status,
      joiningDate,
      createdBy: req.user.id,
    });

    return success(res, user, "User created successfully", 201);
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/admin/users
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    return success(res, users, "Users fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * PUT /api/admin/users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await adminService.updateUser(req.params.id, req.body);
    return success(res, user, "User updated");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * DELETE /api/admin/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    return success(res, null, "User deleted successfully");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/admin/roles
 */
exports.getRoles = async (req, res) => {
  try {
    const roles = await adminService.getRoles();
    return success(res, roles, "Roles fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * PUT /api/admin/settings
 */
exports.updateSettings = async (req, res) => {
  try {
    const settings = await adminService.updateSettings(req.body);
    return success(res, settings, "Settings updated");
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * GET /api/admin/audit-logs
 */
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await adminService.getAuditLogs();
    return success(res, logs, "Audit logs fetched");
  } catch (err) {
    return error(res, err.message);
  }
};
