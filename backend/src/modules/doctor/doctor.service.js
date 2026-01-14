const db = require('../../config/db');

/**
 * Create new doctor
 */
exports.createDoctor = async (data) => {
  const {
    staffId, name, email, mobile, department,
    specialization, designation, status, joiningDate, createdBy
  } = data;

  const [result] = await db.query(
    `INSERT INTO doctors (
      staffId, name, email, mobile, department, 
      specialization, designation, status, joiningDate, createdBy
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      staffId, name, email, mobile, department, 
      specialization, designation, status || 'active', joiningDate, createdBy
    ]
  );

  return {
    id: result.insertId,
    name,
    specialization
  };
};

/**
 * Get all doctors
 */
exports.getDoctors = async () => {
  const [rows] = await db.query(
    `SELECT id, staffId, name, email, mobile, department, specialization, designation, status 
     FROM doctors 
     WHERE status != 'deleted' 
     ORDER BY name ASC`
  );
  return rows;
};

/**
 * Get doctor by ID
 */
exports.getDoctorById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM doctors WHERE id = ?`, 
    [id]
  );

  if (rows.length === 0) {
    throw new Error("Doctor not found");
  }
  return rows[0];
};

/**
 * Update doctor details
 */
exports.updateDoctor = async (id, data) => {
  const { 
    name, email, mobile, department, 
    specialization, designation, status 
  } = data;

  await db.query(
    `UPDATE doctors SET 
      name = ?, email = ?, mobile = ?, department = ?, 
      specialization = ?, designation = ?, status = ? 
     WHERE id = ?`,
    [name, email, mobile, department, specialization, designation, status, id]
  );

  return { id, ...data };
};

/**
 * Delete doctor (Soft Delete)
 */
exports.deleteDoctor = async (id) => {
  // In healthcare systems, soft delete is preferred to maintain medical history
  await db.query(`UPDATE doctors SET status = 'deleted' WHERE id = ?`, [id]);
  return true;
};