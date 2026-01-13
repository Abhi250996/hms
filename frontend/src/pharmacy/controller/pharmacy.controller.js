import { PharmacyRepository } from "../repository/pharmacy.repository";
import { BillingController } from "../../billing/controller/billing.controller";

export const PharmacyController = {
  addMedicine: async (payload) => {
    const res = await PharmacyRepository.addMedicine(payload);
    return res.data;
  },

  getMedicines: async () => {
    const res = await PharmacyRepository.getMedicines();
    return res.data;
  },

  updateMedicine: async (id, payload) => {
    const res = await PharmacyRepository.updateMedicine(id, payload);
    return res.data;
  },

  issueMedicine: async (payload) => {
    const res = await PharmacyRepository.issueMedicine(payload);

    // Create billing record for issued medicines
    try {
      await BillingController.createBill({
        patientId: payload.patientId,
        totalAmount: res.data.totalAmount,
        source: "PHARMACY",
      });
    } catch (err) {
      // swallow billing errors for now; backend should reconcile
      console.error("Billing creation failed", err);
    }

    return res.data;
  },

  getExpiryStock: async () => {
    const res = await PharmacyRepository.getExpiryStock();
    return res.data;
  },

  getPatientBill: async (patientId) => {
    const res = await PharmacyRepository.getPatientBill(patientId);
    return res.data;
  },
};
