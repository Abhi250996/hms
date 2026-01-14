// src/appointment/controller/appointment.controller.js

import { appointmentRepository } from "../repository/appointment.repository";

export const appointmentController = {
  async createAppointment(payload) {
    const res = await appointmentRepository.create(payload);
    return res.data;
  },

  async getAppointments() {
    const res = await appointmentRepository.getAll();
    return res.data;
  },

  async getAppointmentById(id) {
    const res = await appointmentRepository.getById(id);
    return res.data;
  },

  async updateAppointment(id, payload) {
    const res = await appointmentRepository.update(id, payload);
    return res.data;
  },

  async cancelAppointment(id) {
    const res = await appointmentRepository.remove(id);
    return res.data;
  },

  async getDoctorAppointments(doctorId) {
    const res = await appointmentRepository.getByDoctor(doctorId);
    return res.data;
  },
};
