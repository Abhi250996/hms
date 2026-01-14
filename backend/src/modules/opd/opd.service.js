const db = require('../../config/db');

/**
 * Create a new OPD visit record
 */
exports.createOpdVisit = async (data) => {
  const {
    patientId,
    doctorId,
    diagnosis,
    prescription,
    visitDate,
    remarks,
    followUpDate,
  } = data;

  const [result] = await db.query(
    `INSERT INTO opd_visits (
      patientId, doctorId, diagnosis, prescription, 
      visitDate, remarks, followUpDate
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [patientId, doctorId, diagnosis, prescription, visitDate, remarks, followUpDate]
  );

  return { id: result.insertId, ...data };
};

/**
 * Get all OPD visits with Patient and Doctor names
 */
exports.getOpdVisits = async () => {
  const query = `
    SELECT 
      o.*, 
      p.name as patientName, p.mobile as patientMobile,
      u.name as doctorName, u.department as doctorDepartment
    FROM opd_visits o
    JOIN patients p ON o.patientId = p.id
    JOIN users u ON o.doctorId = u.id
    ORDER BY o.visitDate DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

/**
 * Get a specific OPD visit by ID
 */
exports.getOpdVisitById = async (id) => {
  const query = `
    SELECT o.*, p.name as patientName, u.name as doctorName 
    FROM opd_visits o
    JOIN patients p ON o.patientId = p.id
    JOIN users u ON o.doctorId = u.id
    WHERE o.id = ?
  `;
  const [rows] = await db.query(query, [id]);

  if (rows.length === 0) throw new Error("OPD visit record not found");
  return rows[0];
};

/**
 * Update OPD consultation details
 */
exports.updateOpdVisit = async (id, data) => {
  const { diagnosis, prescription, remarks, followUpDate } = data;

  await db.query(
    `UPDATE opd_visits 
     SET diagnosis = ?, prescription = ?, remarks = ?, followUpDate = ? 
     WHERE id = ?`,
    [diagnosis, prescription, remarks, followUpDate, id]
  );

  return { id, ...data };
};

/**
 * Get the full OPD history for a specific patient
 */
exports.getPatientOpdHistory = async (patientId) => {
  const [rows] = await db.query(
    `SELECT o.*, u.name as doctorName 
     FROM opd_visits o
     JOIN users u ON o.doctorId = u.id
     WHERE o.patientId = ? 
     ORDER BY o.visitDate DESC`,
    [patientId]
  );
  return rows;
};