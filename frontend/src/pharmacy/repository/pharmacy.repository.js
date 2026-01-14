// src/pharmacy/repository/pharmacy.repository.js
import api from "../../core/api/axios";

export const pharmacyRepository = {
  addMedicine(data) {
    return api.post("/api/pharmacy/medicines", data);
  },

  getMedicines() {
    return api.get("/api/pharmacy/medicines");
  },

  updateMedicine(id, data) {
    return api.put(`/api/pharmacy/medicines/${id}`, data);
  },

  issueMedicine(data) {
    return api.post("/api/pharmacy/issue", data);
  },

  getExpiryStock() {
    return api.get("/api/pharmacy/stock/expiry");
  },

  getPharmacyBill(patientId) {
    return api.get(`/api/pharmacy/billing/${patientId}`);
  },
};
