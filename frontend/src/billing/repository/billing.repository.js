import api from "../../core/api/axios";

export const BillingRepository = {
  createBill: (payload) => api.post("/billing", payload),

  getBillById: (id) => api.get(`/billing/${id}`),

  getPatientBills: (patientId) => api.get(`/billing/patient/${patientId}`),

  collectPayment: (payload) => api.post("/billing/payment", payload),

  refundPayment: (payload) => api.post("/billing/refund", payload),

  getInvoice: (billId) => api.get(`/billing/invoice/${billId}`),

  getBillingHistory: () => api.get("/billing/history"),

  getBillingReport: () => api.get("/billing/report"),
};
