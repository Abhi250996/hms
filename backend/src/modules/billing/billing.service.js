const db = require('../../config/db');

/**
 * Create a new bill record
 */
exports.createBill = async (data) => {
  const { patientId, totalAmount, createdBy } = data;

  const [result] = await db.query(
    `INSERT INTO bills (patientId, totalAmount, balanceAmount, status, createdBy) 
     VALUES (?, ?, ?, 'unpaid', ?)`,
    [patientId, totalAmount, totalAmount, createdBy]
  );

  return { id: result.insertId, patientId, totalAmount };
};

/**
 * Get a specific bill with patient details
 */
exports.getBillById = async (id) => {
  const [rows] = await db.query(
    `SELECT b.*, p.name as patientName, p.mobile 
     FROM bills b 
     JOIN patients p ON b.patientId = p.id 
     WHERE b.id = ?`,
    [id]
  );
  if (rows.length === 0) throw new Error("Bill not found");
  return rows[0];
};

/**
 * Get all bills for a specific patient
 */
exports.getPatientBills = async (patientId) => {
  const [rows] = await db.query(
    `SELECT * FROM bills WHERE patientId = ? ORDER BY createdAt DESC`,
    [patientId]
  );
  return rows;
};

/**
 * Collect a payment and update the bill balance
 */
exports.collectPayment = async (data) => {
  const { billId, amount, paymentMode, collectedBy } = data;

  // 1. Record the payment
  await db.query(
    `INSERT INTO payments (billId, amount, paymentMode, collectedBy) VALUES (?, ?, ?, ?)`,
    [billId, amount, paymentMode, collectedBy]
  );

  // 2. Update the bill balance and status
  const [result] = await db.query(
    `UPDATE bills 
     SET balanceAmount = balanceAmount - ?, 
         status = CASE WHEN (balanceAmount - ?) <= 0 THEN 'paid' ELSE 'partially_paid' END 
     WHERE id = ?`,
    [amount, amount, billId]
  );

  return { message: "Payment updated successfully" };
};

/**
 * Get all billing transactions (History)
 */
exports.getBillingHistory = async () => {
  const [rows] = await db.query(
    `SELECT b.id as billId, p.name as patientName, b.totalAmount, b.status, b.createdAt 
     FROM bills b
     JOIN patients p ON b.patientId = p.id
     ORDER BY b.createdAt DESC`
  );
  return rows;
};

/**
 * Simple Daily/Total Report
 */
exports.getBillingReport = async () => {
  const [rows] = await db.query(
    `SELECT 
        SUM(totalAmount) as totalBilled, 
        SUM(totalAmount - balanceAmount) as totalCollected,
        COUNT(id) as totalBills
     FROM bills`
  );
  return rows[0];
};

// Placeholder for logic-heavy tasks
exports.generateInvoice = async (id) => {
    return await this.getBillById(id);
};

exports.refundPayment = async (data) => {
    // Logic to add amount back to balanceAmount and record in a refunds table
    return { message: "Refund processed" };
};