import { patientRepository } from "../repository/patient.repository";
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
    return await patientRepository.remove(id);
  },

  async uploadDocuments(id, files) {
    const formData = new FormData();
    files.forEach((file) => formData.append("documents", file));
    return await patientRepository.uploadDocuments(id, formData);
  },

  async getHistory(id) {
    const res = await patientRepository.history(id);
    return res.data;
  },
};
