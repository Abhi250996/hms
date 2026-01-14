const db = require('../../config/db');

/**
 * Create new appointment
 */
exports.createAppointment = async (data) => {
  const { patientId, doctorId, date, time, createdBy } = data;

  const [result] = await db.query(
    `INSERT INTO appointments (patientId, doctorId, appointmentDate, appointmentTime, status, createdBy) 
     VALUES (?, ?, ?, ?, 'scheduled', ?)`,
    [patientId, doctorId, date, time, createdBy]
  );

  return {
    id: result.insertId,
    message: "Appointment created successfully"
  };
};

/**
 * Get all appointments (with Patient and Doctor names)
 */
exports.getAppointments = async () => {
  const query = `
    SELECT 
      a.*, 
      p.name as patientName, 
      u.name as doctorName 
    FROM appointments a
    LEFT JOIN patients p ON a.patientId = p.id
    LEFT JOIN users u ON a.doctorId = u.id
    ORDER BY a.appointmentDate DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

/**
 * Get specific appointment by ID
 */
exports.getAppointmentById = async (id) => {
  const [rows] = await db.query(
    `SELECT a.*, p.name as patientName, u.name as doctorName 
     FROM appointments a
     LEFT JOIN patients p ON a.patientId = p.id
     LEFT JOIN users u ON a.doctorId = u.id
     WHERE a.id = ?`,
    [id]
  );
  
  if (rows.length === 0) throw new Error("Appointment not found");
  return rows[0];
};

/**
 * Update / Reschedule
 */
exports.updateAppointment = async (id, data) => {
  const { date, time, status } = data;
  
  await db.query(
    `UPDATE appointments SET appointmentDate = ?, appointmentTime = ?, status = ? WHERE id = ?`,
    [date, time, status || 'scheduled', id]
  );

  return { id, ...data };
};

/**
 * Cancel appointment (Delete or Soft Delete)
 */
exports.cancelAppointment = async (id) => {
  // Option 1: Hard Delete
  // await db.query(`DELETE FROM appointments WHERE id = ?`, [id]);

  // Option 2: Soft Delete (Better for medical records)
  await db.query(`UPDATE appointments SET status = 'cancelled' WHERE id = ?`, [id]);
  return true;
};

/**
 * Get appointments for a specific doctor
 */
exports.getDoctorAppointments = async (doctorId) => {
  const [rows] = await db.query(
    `SELECT a.*, p.name as patientName 
     FROM appointments a
     JOIN patients p ON a.patientId = p.id
     WHERE a.doctorId = ? AND a.status != 'cancelled'
     ORDER BY a.appointmentDate ASC`,
    [doctorId]
  );
  return rows;
};