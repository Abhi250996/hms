import { adminRepository } from "../repository/admin.repository";

export const adminController = {
  async getDashboard() {
    const res = await adminRepository.getDashboard();
    return res.data;
  },

  async getUsers() {
    const res = await adminRepository.getUsers();
    return res.data;
  },

  // Fixed: Named to match the .jsx call
  async getSettings() {
    const res = await adminRepository.getHospitalSettings();
    return res.data;
  },

  // Fixed: Named to match the .jsx call
  async updateSettings(data) {
    const res = await adminRepository.updateHospitalSettings(data);
    return res.data;
  },

  async createUser(data) {
    const res = await adminRepository.createUser(data);
    return res.data;
  },

  async updateUser(id, data) {
    const res = await adminRepository.updateUser(id, data);
    return res.data;
  },

  async deleteUser(id) {
    const res = await adminRepository.deleteUser(id);
    return res.data;
  },

  async getRoles() {
    const res = await adminRepository.getRoles();
    return res.data;
  },

  async updatePermissions(roleId, permissions) {
    const res = await adminRepository.updatePermissions(roleId, permissions);
    return res.data;
  },

  async getAuditLogs() {
    const res = await adminRepository.getAuditLogs();
    return res.data;
  },
};