const Patient = require("./patient.model");
const generateId = require("../../utils/generateId");

/**
 * CREATE PATIENT
 * Called by: controller → createPatient()
 */
exports.createPatient = async (data, user) => {
  // check duplicate mobile
  if (data.mobile) {
    const exists = await Patient.findOne({ where: { mobile: data.mobile } });
    if (exists) {
      throw new Error("Patient with this mobile already exists");
    }
  }

  const patient = await Patient.create({
    patientId: generateId("PAT"),
    name: data.name,
    mobile: data.mobile,
    email: data.email || null,
    gender: data.gender,
    dob: data.dob,
    bloodGroup: data.bloodGroup || null,
    address: data.address || null,
    emergencyContact: data.emergencyContact || null,
    status: "ACTIVE",
  });

  return patient;
};

/**
 * GET ALL PATIENTS
 * Called by: controller → getPatients()
 */
exports.getPatients = async () => {
  return await Patient.findAll({
    order: [["createdAt", "DESC"]],
  });
};

/**
 * GET PATIENT BY ID
 * Called by: controller → getPatientById()
 */
exports.getPatientById = async (id) => {
  const patient = await Patient.findByPk(id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

/**
 * UPDATE PATIENT
 * Called by: controller → updatePatient()
 */
exports.updatePatient = async (id, data) => {
  const patient = await Patient.findByPk(id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  await patient.update({
    name: data.name ?? patient.name,
    mobile: data.mobile ?? patient.mobile,
    email: data.email ?? patient.email,
    gender: data.gender ?? patient.gender,
    dob: data.dob ?? patient.dob,
    bloodGroup: data.bloodGroup ?? patient.bloodGroup,
    address: data.address ?? patient.address,
    emergencyContact: data.emergencyContact ?? patient.emergencyContact,
    status: data.status ?? patient.status,
  });

  return patient;
};

/**
 * DELETE PATIENT
 * Called by: controller → deletePatient()
 */
exports.deletePatient = async (id) => {
  const patient = await Patient.findByPk(id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  await patient.destroy();
  return true;
};

/**
 * UPLOAD PATIENT DOCUMENTS
 * Called by: controller → uploadDocuments()
 */
exports.uploadDocuments = async (patientId, files) => {
  if (!files || Object.keys(files).length === 0) {
    throw new Error("No documents uploaded");
  }

  // placeholder for future patient_documents table
  return {
    message: "Documents uploaded successfully",
    documentsCount: Object.keys(files).length,
  };
};

/**
 * GET PATIENT HISTORY (OPD + IPD)
 * Called by: controller → getPatientHistory()
 */
exports.getPatientHistory = async (patientId) => {
  const patient = await Patient.findByPk(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  // future join with OPD & IPD tables
  return {
    patientId: patient.patientId,
    opdVisits: [],
    ipdAdmissions: [],
  };
};
