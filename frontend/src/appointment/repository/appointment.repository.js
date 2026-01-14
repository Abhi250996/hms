// src/appointment/repository/appointment.repository.js

import api from "../../core/api/axios";

export const appointmentRepository = {
  create(payload) {
    return api.post("/api/appointments", payload);
  },

  getAll() {
    return api.get("/api/appointments");
  },

  getById(id) {
    return api.get(`/api/appointments/${id}`);
  },

  update(id, payload) {
    return api.put(`/api/appointments/${id}`, payload);
  },

  remove(id) {
    return api.delete(`/api/appointments/${id}`);
  },

  getByDoctor(doctorId) {
    return api.get(`/api/appointments/doctor/${doctorId}`);
  },
};
