import labRepository from "../repository/lab.repository"; 

export const createTestOrder = async (payload) => {
  const res = await labRepository.createTestOrder(payload);
  return res.data;
};

export const getAllLabTests = async () => {
  const res = await labRepository.getAllLabTests();
  // Ensure we return the data array specifically
  return res.data?.data || res.data || []; 
};

export const getLabTestById = async (id) => {
  const res = await labRepository.getTestById(id);
  return res.data;
};

export const markSampleCollected = async (id) => {
  const res = await labRepository.markSampleCollected(id);
  return res.data;
};

export const enterTestResult = async (id, payload) => {
  const res = await labRepository.enterTestResult(id, payload);
  return res.data;
};

export const getPatientLabHistory = async (patientId) => {
  const res = await labRepository.getPatientLabHistory(patientId);
  return res.data;
};