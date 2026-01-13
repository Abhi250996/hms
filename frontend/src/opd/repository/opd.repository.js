import api from "../../core/api/axios";

export const opdRepository = {
  createVisit: (payload) => api.post("/api/opd", payload),
  getVisits: () => api.get("/api/opd"),
  getVisitById: (id) => api.get(`/api/opd/${id}`),
  getPatientHistory: (patientId) => api.get(`/api/opd/patient/${patientId}`),
};
