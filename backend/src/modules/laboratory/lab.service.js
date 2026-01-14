const db = require('../../config/db');

/**
 * Create lab test order
 */
exports.createTestOrder = async (data) => {
  const { patientId, doctorId, testName, testCategory, sampleType } = data;

  const [result] = await db.query(
    `INSERT INTO lab_tests (
      patientId, doctorId, testName, testCategory, sampleType, status
    ) VALUES (?, ?, ?, ?, ?, 'pending')`,
    [patientId, doctorId, testName, testCategory, sampleType]
  );

  return { id: result.insertId, ...data, status: 'pending' };
};

/**
 * Get all lab test orders with Patient and Doctor names
 */
exports.getTestOrders = async () => {
  const query = `
    SELECT 
      lt.*, 
      p.name as patientName, 
      u.name as doctorName 
    FROM lab_tests lt
    JOIN patients p ON lt.patientId = p.id
    JOIN users u ON lt.doctorId = u.id
    ORDER BY lt.createdAt DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

/**
 * Get specific lab test by ID
 */
exports.getTestById = async (id) => {
  const query = `
    SELECT lt.*, p.name as patientName, u.name as doctorName 
    FROM lab_tests lt
    JOIN patients p ON lt.patientId = p.id
    JOIN users u ON lt.doctorId = u.id
    WHERE lt.id = ?
  `;
  const [rows] = await db.query(query, [id]);
  
  if (rows.length === 0) throw new Error("Lab test not found");
  return rows[0];
};

/**
 * Mark sample as collected
 */
exports.markSampleCollected = async (id) => {
  await db.query(
    `UPDATE lab_tests SET status = 'sample_collected', updatedAt = NOW() WHERE id = ?`,
    [id]
  );
  return { id, status: 'sample_collected' };
};

/**
 * Enter test result and complete report
 */
exports.enterTestResult = async (id, data) => {
  const { result, normalRange, reportUrl, status } = data;

  await db.query(
    `UPDATE lab_tests 
     SET result = ?, normalRange = ?, reportUrl = ?, status = ?, updatedAt = NOW() 
     WHERE id = ?`,
    [result, normalRange, reportUrl, status || 'completed', id]
  );

  return { id, ...data };
};

/**
 * Get lab history for a specific patient
 */
exports.getPatientLabHistory = async (patientId) => {
  const [rows] = await db.query(
    `SELECT * FROM lab_tests WHERE patientId = ? ORDER BY createdAt DESC`,
    [patientId]
  );
  return rows;
};