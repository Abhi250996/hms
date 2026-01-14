const db = require('../../config/db');

/**
 * Create doctor / nurse / staff
 */
exports.createUser = async (data) => {
  const { 
    staffId, name, email, mobile, role, 
    designation, department, password, 
    status, joiningDate, createdBy 
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO users (
      staffId, name, email, mobile, role, 
      designation, department, password, 
      status, joiningDate, createdBy
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      staffId, name, email, mobile, role, 
      designation, department, password, 
      status || 'active', joiningDate, createdBy
    ]
  );

  return {
    id: result.insertId,
    staffId: staffId,
    message: 'User created successfully',
  };
};

/**
 * Get all staff
 */
exports.getUsers = async (role) => {
  let query = `SELECT id, staffId, name, email, mobile, role, designation, department, status FROM users`;
  let params = [];

  if (role) {
    query += ` WHERE role = ?`;
    params.push(role);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

/**
 * Update User
 */
exports.updateUser = async (id, data) => {
  const { name, email, mobile, designation, department, status } = data;
  
  await db.query(
    `UPDATE users SET name=?, email=?, mobile=?, designation=?, department=?, status=? WHERE id=?`,
    [name, email, mobile, designation, department, status, id]
  );
  
  return { id, ...data };
};

/**
 * Delete User
 */
exports.deleteUser = async (id) => {
  await db.query(`DELETE FROM users WHERE id = ?`, [id]);
  return true;
};

/**
 * Simple placeholder for Roles and Logs (to prevent Controller crashes)
 */
exports.getRoles = async () => {
  const [rows] = await db.query(`SELECT DISTINCT role FROM users`);
  return rows.map(r => r.role);
};

exports.getAuditLogs = async () => {
  // If you have an audit_logs table:
  const [rows] = await db.query(`SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100`);
  return rows;
};exports.updateSettings = async (data) => {
  const { 
    hospitalName, registrationNumber, phone, email, 
    address, tax, currency, timezone 
  } = data;

  const addressStr = JSON.stringify(address || {});
  const taxStr = JSON.stringify(tax || {});

  // 1. Check if record with ID 1 exists
  const [existing] = await db.query(
    "SELECT id FROM hospital_settings WHERE id = 1", 
    { type: db.QueryTypes.SELECT }
  );

  if (existing) {
    // 2. If exists, UPDATE
    await db.query(
      `UPDATE hospital_settings SET 
        hospitalName = :hospitalName, 
        registrationNumber = :registrationNumber, 
        phone = :phone, 
        email = :email, 
        address = :address, 
        tax = :tax, 
        currency = :currency, 
        timezone = :timezone 
      WHERE id = 1`,
      {
        replacements: { 
          hospitalName, registrationNumber, phone, email, 
          address: addressStr, tax: taxStr, currency, timezone 
        }
      }
    );
  } else {
    // 3. If not, INSERT
    await db.query(
      `INSERT INTO hospital_settings 
        (id, hospitalName, registrationNumber, phone, email, address, tax, currency, timezone)
      VALUES (1, :hospitalName, :registrationNumber, :phone, :email, :address, :tax, :currency, :timezone)`,
      {
        replacements: { 
          hospitalName, registrationNumber, phone, email, 
          address: addressStr, tax: taxStr, currency, timezone 
        }
      }
    );
  }

  return data;
};

exports.getSettings = async () => {
  // Use QueryTypes.SELECT to get a clean object back from Sequelize
  const rows = await db.query(
    "SELECT * FROM hospital_settings WHERE id = 1", 
    { type: db.QueryTypes.SELECT }
  );
  
  if (!rows || rows.length === 0) return null;

  const settings = rows[0];
  
  const parseJSON = (str) => {
    try { return (typeof str === 'string') ? JSON.parse(str) : str; } 
    catch (e) { return {}; }
  };

  settings.address = parseJSON(settings.address);
  settings.tax = parseJSON(settings.tax);
  
  return settings;
};