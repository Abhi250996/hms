import api from "../../core/api/axios";

export const patientRepository = {
  create(payload) {
    return api.post("/patients", payload);
  },

  getAll() {
    return api.get("/patients");
  },

  getById(id) {
    return api.get(`/patients/${id}`);
  },

  update(id, payload) {
    return api.put(`/patients/${id}`, payload);
  },

  remove(id) {
    return api.delete(`/patients/${id}`);
  },

  uploadDocuments(id, formData) {
    return api.post(`/patients/${id}/documents`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  history(id) {
    return api.get(`/patients/${id}/history`);
  },
};
