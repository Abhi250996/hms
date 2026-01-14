// src/ipd/repository/ipd.repository.js
import api from "../../core/api/axios";

export const ipdRepository = {
  admit(data) {
    return api.post("/api/ipd", data);
  },

  getAll() {
    return api.get("/api/ipd");
  },

  getById(id) {
    return api.get(`/api/ipd/${id}`);
  },

  update(id, data) {
    return api.put(`/api/ipd/${id}`, data);
  },

  discharge(id, data) {
    return api.put(`/api/ipd/${id}/discharge`, data);
  },

  getPatientHistory(patientId) {
    return api.get(`/api/ipd/patient/${patientId}`);
  },
};
