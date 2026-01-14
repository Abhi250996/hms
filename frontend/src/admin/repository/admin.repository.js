// src/admin/repository/admin.repository.js
import api from "../../core/api/axios";

export const adminRepository = {
  // USERS
  getUsers() {
    return api.get("/api/admin/users");
  },

  createUser(data) {
    return api.post("/api/admin/users", data);
  },

  updateUser(id, data) {
    return api.put(`/api/admin/users/${id}`, data);
  },

  deleteUser(id) {
    return api.delete(`/api/admin/users/${id}`);
  },

  getRoles() {
    return api.get("/api/admin/roles");
  },

  // SETTINGS
  getSettings() {
    return api.get("/api/admin/settings");
  },

  updateSettings(data) {
    return api.put("/api/admin/settings", data);
  },

  // AUDIT LOGS
  getAuditLogs(params = {}) {
    return api.get("/api/admin/audit-logs", { params });
  },
};
