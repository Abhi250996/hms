// src/modules/admin/admin.routes.js
const express = require("express");
const router = express.Router();

const adminController = require("./admin.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.post(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.createUser
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getUsers
);

router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.updateUser
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.deleteUser
);

router.get(
  "/roles",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getRoles
);

router.put(
  "/settings",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.updateSettings
);

router.get(
  "/audit-logs",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getAuditLogs
);

module.exports = router;
