import api from "../../core/api/axios";

export const patientRepository = {
  create(payload) {
    return api.post("/api/patients", payload);
  },

  getAll() {
    return api.get("/api/patients");
  },

  getById(id) {
    return api.get(`/api/patients/${id}`);
  },

  update(id, payload) {
    return api.put(`/api/patients/${id}`, payload);
  },

  remove(id) {
    return api.delete(`/api/patients/${id}`);
  },

  uploadDocuments(id, formData) {
    return api.post(`/api/patients/${id}/documents`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  history(id) {
    return api.get(`/api/patients/${id}/history`);
  },
};
