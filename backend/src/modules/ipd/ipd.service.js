const db = require('../../config/db');

/**
 * Admit patient to IPD
 */
exports.admitPatient = async (data) => {
  const {
    patientId, doctorId, bedNumber, ward,
    bedType, admissionDate, diagnosis, treatmentPlan, remarks
  } = data;

  const [result] = await db.query(
    `INSERT INTO ipd_admissions (
      patientId, doctorId, bedNumber, ward, 
      bedType, admissionDate, diagnosis, treatmentPlan, remarks, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'admitted')`,
    [patientId, doctorId, bedNumber, ward, bedType, admissionDate, diagnosis, treatmentPlan, remarks]
  );

  return { id: result.insertId, ...data };
};

/**
 * Get all current IPD admissions with Patient and Doctor names
 */
exports.getIpdList = async () => {
  const query = `
    SELECT 
      i.*, 
      p.name as patientName, p.mobile as patientMobile,
      u.name as doctorName, u.department as doctorDepartment
    FROM ipd_admissions i
    JOIN patients p ON i.patientId = p.id
    JOIN users u ON i.doctorId = u.id
    WHERE i.status = 'admitted'
    ORDER BY i.admissionDate DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

/**
 * Get specific IPD admission by ID
 */
exports.getIpdById = async (id) => {
  const query = `
    SELECT i.*, p.name as patientName, u.name as doctorName 
    FROM ipd_admissions i
    JOIN patients p ON i.patientId = p.id
    JOIN users u ON i.doctorId = u.id
    WHERE i.id = ?
  `;
  const [rows] = await db.query(query, [id]);
  
  if (rows.length === 0) throw new Error("Admission record not found");
  return rows[0];
};

/**
 * Update IPD treatment/details
 */
exports.updateIpd = async (id, data) => {
  const { diagnosis, treatmentPlan, remarks, bedNumber, ward } = data;

  await db.query(
    `UPDATE ipd_admissions 
     SET diagnosis = ?, treatmentPlan = ?, remarks = ?, bedNumber = ?, ward = ? 
     WHERE id = ?`,
    [diagnosis, treatmentPlan, remarks, bedNumber, ward, id]
  );

  return { id, ...data };
};

/**
 * Discharge patient (Updates status and adds discharge date)
 */
exports.dischargePatient = async (id, data) => {
  const { dischargeDate, remarks } = data;

  await db.query(
    `UPDATE ipd_admissions 
     SET dischargeDate = ?, remarks = ?, status = 'discharged' 
     WHERE id = ?`,
    [dischargeDate, remarks, id]
  );

  return { id, message: "Patient discharged successfully" };
};

/**
 * Get IPD history for a specific patient
 */
exports.getPatientIpdHistory = async (patientId) => {
  const [rows] = await db.query(
    `SELECT * FROM ipd_admissions WHERE patientId = ? ORDER BY admissionDate DESC`,
    [patientId]
  );
  return rows;
};