const adminService = require("./admin.service");
const { success, error } = require("../../utils/response");

exports.createUser = async (req, res) => {
  try {
    const {
      staffId, name, email, mobile, role, designation,
      department, password, status, joiningDate,
    } = req.body;

    if (!staffId || !name || !email || !role || !password) {
      return error(res, "Required fields missing", 422);
    }

    const user = await adminService.createUser({
      ...req.body,
      createdBy: req.user.id,
    });

    return success(res, user, "User created successfully", 201);
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    return success(res, users, "Users fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await adminService.updateUser(req.params.id, req.body);
    return success(res, user, "User updated");
  } catch (err) {
    return error(res, err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    return success(res, null, "User deleted successfully");
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await adminService.getRoles();
    return success(res, roles, "Roles fetched");
  } catch (err) {
    return error(res, err.message);
  }
};

// Added missing getSettings controller function
exports.getSettings = async (req, res) => {
  try {
    const settings = await adminService.getSettings();
    return success(res, settings, "Settings fetched");
  } catch (err) {
    console.error("Controller Error:", err.message);
    return error(res, err.message);
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await adminService.updateSettings(req.body);
    return success(res, settings, "Settings updated successfully");
  } catch (err) {
    console.error("Controller Error:", err.message);
    return error(res, err.message, 400);
  }
};
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await adminService.getAuditLogs();
    return success(res, logs, "Audit logs fetched");
  } catch (err) {
    return error(res, err.message);
  }
};