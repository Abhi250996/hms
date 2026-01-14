// src/billing/repository/billing.repository.js
import api from "../../core/api/axios";

export const BillingRepository = {
  createBill(data) {
    return api.post("/api/billing", data);
  },

  getBillById(id) {
    return api.get(`/api/billing/${id}`);
  },

  getPatientBills(patientId) {
    return api.get(`/api/billing/patient/${patientId}`);
  },

  collectPayment(data) {
    return api.post("/api/billing/payment", data);
  },

  refundPayment(data) {
    return api.post("/api/billing/refund", data);
  },

  getInvoice(billId) {
    return api.get(`/api/billing/invoice/${billId}`);
  },

  getBillingHistory() {
    return api.get("/api/billing/history");
  },
};
