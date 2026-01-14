// src/laboratory/model/lab.model.js

export const LabTestModel = {
  patientId: "",
  doctorId: "",
  testName: "",

  sampleStatus: "PENDING", // PENDING | COLLECTED
  result: "",
  reportUrl: "",
  status: "ORDERED", // ORDERED | COMPLETED
};
