// src/opd/model/opd.model.js

export const createOpdModel = () => ({
  patientId: "",
  doctorId: "",
  diagnosis: "",
  prescription: "",
  visitDate: new Date().toISOString().split("T")[0],
});
