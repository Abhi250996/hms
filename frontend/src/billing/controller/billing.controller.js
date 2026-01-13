import { BillingRepository } from "../repository/billing.repository";

export const BillingController = {
  createBill: async (data) => {
    const res = await BillingRepository.createBill(data);
    return res.data;
  },

  getBill: async (id) => {
    const res = await BillingRepository.getBillById(id);
    return res.data;
  },

  getPatientBills: async (patientId) => {
    const res = await BillingRepository.getPatientBills(patientId);
    return res.data;
  },

  collectPayment: async (data) => {
    const res = await BillingRepository.collectPayment(data);
    return res.data;
  },

  refundPayment: async (data) => {
    const res = await BillingRepository.refundPayment(data);
    return res.data;
  },

  getInvoice: async (billId) => {
    const res = await BillingRepository.getInvoice(billId);
    return res.data;
  },

  getHistory: async () => {
    const res = await BillingRepository.getBillingHistory();
    return res.data;
  },
};
