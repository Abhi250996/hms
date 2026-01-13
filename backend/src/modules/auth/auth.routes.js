// src/modules/auth/auth.routes.js
const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

/**
 * POST /api/auth/login
 * Public
 * Frontend: Login page
 */
router.post("/login", authController.login);

/**
 * POST /api/auth/register
 * Protected (ADMIN only)
 * Frontend: Admin creates user/staff
 */
router.post(
  "/register",
  authMiddleware,
  roleMiddleware("ADMIN"),
  authController.register
);

/**
 * GET /api/auth/me
 * Protected
 * Frontend: Get logged-in user profile
 */
router.get("/me", authMiddleware, authController.getProfile);

module.exports = router;
