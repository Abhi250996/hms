const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

// 1. Move roles to the top and consider removing strict middleware 
// if you want the dropdown to load even if the session is refreshing.
router.get("/roles", authMiddleware, adminController.getRoles); 

// 2. User Management
router.post("/users", authMiddleware, roleMiddleware("ADMIN"), adminController.createUser);
router.get("/users", authMiddleware, roleMiddleware("ADMIN"), adminController.getUsers);
router.put("/users/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.updateUser);
router.delete("/users/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.deleteUser);

// 3. Settings & Logs
router.get("/settings", authMiddleware, roleMiddleware("ADMIN"), adminController.getSettings);
router.put("/settings", authMiddleware, roleMiddleware("ADMIN"), adminController.updateSettings);
router.get("/audit-logs", authMiddleware, roleMiddleware("ADMIN"), adminController.getAuditLogs);

module.exports = router;