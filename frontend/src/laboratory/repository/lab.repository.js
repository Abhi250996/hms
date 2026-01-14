import api from "../../core/api/axios";

const labRepository = {
  createTest(data) {
    return api.post("/api/lab/tests", data);
  },

  getAllLabTests() {
    return api.get("/api/lab/tests");
  },

  getTestById(id) {
    return api.get(`/api/lab/tests/${id}`);
  },

  markSampleCollected(id) {
    return api.put(`/api/lab/tests/${id}/sample`, {
      sampleStatus: "COLLECTED",
    });
  },

  enterResult(id, data) {
    return api.put(`/api/lab/tests/${id}/result`, data);
  },

  getPatientHistory(patientId) {
    return api.get(`/api/lab/tests/patient/${patientId}`);
  },
};

export default labRepository;
