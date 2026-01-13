import api from "../../core/api/axios";

export const admitPatientApi = (payload) => api.post("/api/ipd", payload);

export const getIpdListApi = () => api.get("/api/ipd");

export const getIpdByIdApi = (id) => api.get(`/api/ipd/${id}`);

export const updateIpdApi = (id, payload) => api.put(`/api/ipd/${id}`, payload);

export const dischargeIpdApi = (id, payload) =>
  api.put(`/api/ipd/${id}/discharge`, payload);

export const getPatientIpdHistoryApi = (patientId) =>
  api.get(`/api/ipd/patient/${patientId}`);
