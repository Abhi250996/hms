const db = require("../../config/db");
const generateId = require("../../utils/generateId");

/**
 * CREATE PATIENT
 */
exports.createPatient = async (data) => {
  // Check if mobile already exists
  const [existing] = await db.query("SELECT id FROM patients WHERE mobile = ?", [data.mobile]);
  if (existing.length > 0) {
    throw new Error("Patient with this mobile already exists");
  }

  const patientId = generateId("PAT");
  const { name, mobile, email, gender, dob, bloodGroup, address, emergencyContact } = data;

  const [result] = await db.query(
    `INSERT INTO patients (
      patientId, name, mobile, email, gender, dob, 
      bloodGroup, address, emergencyContact, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE')`,
    [patientId, name, mobile, email || null, gender, dob, bloodGroup || null, address || null, emergencyContact || null]
  );

  return { id: result.insertId, patientId, name };
};

/**
 * GET ALL PATIENTS
 */
exports.getPatients = async () => {
  const [rows] = await db.query("SELECT * FROM patients ORDER BY createdAt DESC");
  return rows;
};

/**
 * GET PATIENT BY ID
 */
exports.getPatientById = async (id) => {
  const [rows] = await db.query("SELECT * FROM patients WHERE id = ?", [id]);
  if (rows.length === 0) {
    throw new Error("Patient not found");
  }
  return rows[0];
};

/**
 * UPDATE PATIENT
 */
exports.updatePatient = async (id, data) => {
  const { name, mobile, email, gender, dob, bloodGroup, address, emergencyContact, status } = data;

  const [result] = await db.query(
    `UPDATE patients SET 
      name = ?, mobile = ?, email = ?, gender = ?, 
      dob = ?, bloodGroup = ?, address = ?, 
      emergencyContact = ?, status = ? 
     WHERE id = ?`,
    [name, mobile, email, gender, dob, bloodGroup, address, emergencyContact, status, id]
  );

  if (result.affectedRows === 0) throw new Error("Patient not found");
  return { id, ...data };
};

/**
 * DELETE PATIENT
 */
exports.deletePatient = async (id) => {
  const [result] = await db.query("DELETE FROM patients WHERE id = ?", [id]);
  if (result.affectedRows === 0) throw new Error("Patient not found");
  return true;
};

/**
 * GET PATIENT HISTORY (OPD + IPD)
 * Fetches data from multiple tables to give a full medical timeline
 */
exports.getPatientHistory = async (patientId) => {
  // 1. Get Patient Details
  const [patient] = await db.query("SELECT * FROM patients WHERE id = ?", [patientId]);
  if (patient.length === 0) throw new Error("Patient not found");

  // 2. Get OPD History (Joined with Doctor Name)
  const [opdVisits] = await db.query(
    `SELECT o.*, u.name as doctorName 
     FROM opd_visits o 
     LEFT JOIN users u ON o.doctorId = u.id 
     WHERE o.patientId = ? ORDER BY o.visitDate DESC`,
    [patientId]
  );

  // 3. Get IPD History (Joined with Doctor Name)
  const [ipdAdmissions] = await db.query(
    `SELECT i.*, u.name as doctorName 
     FROM ipd_admissions i 
     LEFT JOIN users u ON i.doctorId = u.id 
     WHERE i.patientId = ? ORDER BY i.admissionDate DESC`,
    [patientId]
  );

  return {
    patient: patient[0],
    opdVisits,
    ipdAdmissions
  };
};

/**
 * UPLOAD PATIENT DOCUMENTS
 */
exports.uploadDocuments = async (patientId, files) => {
  // Logic to save file paths in a patient_documents table would go here
  return {
    message: "Documents uploaded successfully",
    documentsCount: Object.keys(files).length,
  };
};