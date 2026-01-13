// src/modules/auth/auth.controller.js
const authService = require("./auth.service");
const { success, error } = require("../../utils/response");

/**
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, "Email and password are required", 422);
    }

    const result = await authService.loginUser({ email, password });
    return success(res, result, "Login successful");
  } catch (err) {
    return error(res, err.message, 401);
  }
};

/**
 * POST /api/auth/register
 * Admin creates user/staff
 */
exports.register = async (req, res) => {
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

    if (!staffId || !name || !email || !password || !role) {
      return error(res, "Required fields missing", 422);
    }

    const result = await authService.registerUser({
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
    });

    return success(res, result, "User registered successfully", 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

/**
 * GET /api/auth/me
 */
exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return error(res, "Unauthorized", 401);
    }

    const user = await authService.getUserById(req.user.id);
    return success(res, user, "Profile fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};
