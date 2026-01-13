import { opdRepository } from "../repository/opd.repository";

export const opdController = {
  createVisit: async (data) => {
    const res = await opdRepository.createVisit(data);
    return res.data;
  },

  getPatientOpdHistory: async (patientId) => {
    const res = await opdRepository.getPatientHistory(patientId);
    return res.data;
  },

  getVisitById: async (id) => {
    const res = await opdRepository.getVisitById(id);
    return res.data;
  },

  getVisits: async () => {
    const res = await opdRepository.getVisits();
    return res.data;
  },
};
