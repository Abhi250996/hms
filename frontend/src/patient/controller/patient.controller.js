// src/patient/controller/patient.controller.js
import { patientRepository } from "../repository/patient.repository";

export const patientController = {
  async createPatient(data) {
    const res = await patientRepository.create(data);
    return res.data;
  },

  async getPatients() {
    const res = await patientRepository.getAll();
    return res.data;
  },

  async getPatient(id) {
    const res = await patientRepository.getById(id);
    return res.data;
  },

  async updatePatient(id, data) {
    const res = await patientRepository.update(id, data);
    return res.data;
  },

  async deletePatient(id) {
    const res = await patientRepository.remove(id);
    return res.data;
  },

  async uploadDocuments(id, files) {
    const formData = new FormData();
    files.forEach((file) => formData.append("documents", file));
    const res = await patientRepository.uploadDocuments(id, formData);
    return res.data;
  },

  async getHistory(id) {
    const res = await patientRepository.history(id);
    return res.data;
  },
};
