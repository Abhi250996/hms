// src/ipd/controller/ipd.controller.js
import { ipdRepository } from "../repository/ipd.repository";

export const ipdController = {
  async admitPatient(payload) {
    const res = await ipdRepository.admit(payload);
    return res.data;
  },

  async getIpdList() {
    const res = await ipdRepository.getAll();
    return res.data;
  },

  async getIpdById(id) {
    const res = await ipdRepository.getById(id);
    return res.data;
  },

  async updateIpd(id, payload) {
    const res = await ipdRepository.update(id, payload);
    return res.data;
  },

  async dischargePatient(id, payload) {
    const res = await ipdRepository.discharge(id, payload);
    return res.data;
  },

  async getPatientIpdHistory(patientId) {
    const res = await ipdRepository.getPatientHistory(patientId);
    return res.data;
  },
};
