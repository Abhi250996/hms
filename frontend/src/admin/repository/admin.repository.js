import api from "../../core/api/axios";

export const adminRepository = {
  // USERS
  getUsers() {
    return api.get("/admin/users");
  },

  createUser(data) {
    return api.post("/auth/register", data);
  },

  async getHospitalSettings() {
    // Adding a check to ensure we don't send a request if no token exists
    const token = localStorage.getItem("token"); 
    return api.get("/admin/settings", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  async updateHospitalSettings(data) {
    const token = localStorage.getItem("token");
    return api.put("/admin/settings", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  updateUser(id, data) {
    return api.put(`/admin/users/${id}`, data);
  },

  deleteUser(id) {
    return api.delete(`/admin/users/${id}`);
  },

  getRoles() {
    return api.get("/admin/roles");
  },

  // SETTINGS - Renamed to match what the controller expects
  getHospitalSettings() {
    return api.get("/admin/settings");
  },

  updateHospitalSettings(data) {
    return api.put("/admin/settings", data);
  },

  // AUDIT LOGS
  getAuditLogs(params = {}) {
    return api.get("/admin/audit-logs", { params });
  },

  // Added missing dashboard method for controller
  getDashboard() {
    return api.get("/admin/dashboard");
  }

  
};