const db = require('../../config/db');

/**
 * Add new medicine to inventory
 */
exports.addMedicine = async (data) => {
  const { name, batch, expiryDate, quantity, price } = data;

  const [result] = await db.query(
    `INSERT INTO medicines (name, batch, expiryDate, quantity, price) 
     VALUES (?, ?, ?, ?, ?)`,
    [name, batch, expiryDate, quantity, price]
  );

  return { id: result.insertId, ...data };
};

/**
 * Get all medicines in stock
 */
exports.getMedicines = async () => {
  const [rows] = await db.query(
    `SELECT * FROM medicines WHERE quantity > 0 ORDER BY name ASC`
  );
  return rows;
};

/**
 * Update medicine stock or price
 */
exports.updateMedicine = async (id, data) => {
  const { quantity, price, expiryDate } = data;
  
  await db.query(
    `UPDATE medicines SET quantity = ?, price = ?, expiryDate = ? WHERE id = ?`,
    [quantity, price, expiryDate, id]
  );

  return { id, ...data };
};

/**
 * Get medicines nearing expiry (e.g., within next 90 days)
 */
exports.getExpiryStock = async () => {
  const [rows] = await db.query(
    `SELECT * FROM medicines 
     WHERE expiryDate <= DATE_ADD(CURDATE(), INTERVAL 90 DAY) 
     AND quantity > 0
     ORDER BY expiryDate ASC`
  );
  return rows;
};

/**
 * Issue medicine to patient (Includes Stock Validation)
 */
exports.issueMedicine = async ({ patientId, medicineId, quantity }) => {
  // 1. Check stock availability
  const [medicine] = await db.query(
    `SELECT name, quantity FROM medicines WHERE id = ?`,
    [medicineId]
  );

  if (medicine.length === 0) throw new Error('Medicine not found');
  if (medicine[0].quantity < quantity) {
    throw new Error(`Insufficient stock for ${medicine[0].name}. Available: ${medicine[0].quantity}`);
  }

  // 2. Insert issue record
  await db.query(
    `INSERT INTO medicine_issues (patientId, medicineId, quantity, issuedDate)
     VALUES (?, ?, ?, NOW())`,
    [patientId, medicineId, quantity]
  );

  // 3. Reduce stock in inventory
  await db.query(
    `UPDATE medicines SET quantity = quantity - ? WHERE id = ?`,
    [quantity, medicineId]
  );

  return { message: 'Medicine issued successfully' };
};

/**
 * Get pharmacy bill items for a patient
 */
exports.getPharmacyBill = async (patientId) => {
  const [rows] = await db.query(
    `SELECT 
      mi.id,
      mi.quantity,
      mi.issuedDate,
      m.name AS medicineName,
      m.price,
      (mi.quantity * m.price) as subTotal
    FROM medicine_issues mi
    JOIN medicines m ON mi.medicineId = m.id
    WHERE mi.patientId = ?`,
    [patientId]
  );

  return rows;
};