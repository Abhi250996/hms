import LabRepository from "../repository/lab.repository";

const LabController = {
  async createTest(payload) {
    const res = await LabRepository.createTest(payload);
    return res.data;
  },

  async getAllTests() {
    const res = await LabRepository.getAllTests();
    return res.data;
  },

  async getTestById(id) {
    const res = await LabRepository.getTestById(id);
    return res.data;
  },

  async markSampleCollected(id) {
    const res = await LabRepository.markSampleCollected(id);
    return res.data;
  },

  async enterResult(id, payload) {
    const res = await LabRepository.enterResult(id, payload);
    return res.data;
  },

  async getPatientHistory(patientId) {
    const res = await LabRepository.getPatientHistory(patientId);
    return res.data;
  },
};

export default LabController;
