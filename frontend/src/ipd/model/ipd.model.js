// src/ipd/model/ipd.model.js

export const createIpdModel = (patientId = "", doctorId = "") => ({
  patientId,
  doctorId,
  bedNumber: "",
  ward: "",
  admissionDate: new Date().toISOString().split("T")[0],
  dischargeDate: null,
  status: "ADMITTED",
});
