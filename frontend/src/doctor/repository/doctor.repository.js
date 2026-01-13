import api from "../../core/api/axios";

export const createDoctor = (data) => api.post("/api/doctors", data);
export const getDoctors = () => api.get("/api/doctors");
export const getDoctorById = (id) => api.get(`/api/doctors/${id}`);
export const updateDoctor = (id, data) => api.put(`/api/doctors/${id}`, data);
export const deleteDoctor = (id) => api.delete(`/api/doctors/${id}`);
