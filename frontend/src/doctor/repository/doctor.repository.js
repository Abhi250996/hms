// src/doctor/repository/doctor.repository.js
import api from "../../core/api/axios";

export const getDoctors = () => {
  return api.get("/api/doctors");
};

export const getDoctorById = (id) => {
  return api.get(`/api/doctors/${id}`);
};

export const createDoctor = (data) => {
  return api.post("/api/doctors", data);
};

export const updateDoctor = (id, data) => {
  return api.put(`/api/doctors/${id}`, data);
};

export const deleteDoctor = (id) => {
  return api.delete(`/api/doctors/${id}`);
};
