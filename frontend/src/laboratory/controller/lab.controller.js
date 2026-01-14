// src/laboratory/controller/lab.controller.js
import { labRepository } from "../repository/lab.repository";

export const labController = {
  async createTestOrder(payload) {
    const res = await labRepository.createTestOrder(payload);
    return res.data;
  },

  async getAllTests() {
    const res = await labRepository.getAllTests();
    return res.data;
  },

  async getTestById(id) {
    const res = await labRepository.getTestById(id);
    return res.data;
  },

  async markSampleCollected(id) {
    const res = await labRepository.markSampleCollected(id);
    return res.data;
  },

  async enterTestResult(id, payload) {
    const res = await labRepository.enterTestResult(id, payload);
    return res.data;
  },

  async getPatientLabHistory(patientId) {
    const res = await labRepository.getPatientLabHistory(patientId);
    return res.data;
  },
};
