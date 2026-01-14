const db = require('../../config/db');

exports.dailyCollection = async () => {
  const [rows] = await db.query(`
    SELECT 
      DATE(createdAt) as date, 
      IFNULL(SUM(amount), 0) as totalCollected,
      COUNT(id) as transactionCount
    FROM payments 
    GROUP BY DATE(createdAt)
    ORDER BY date DESC LIMIT 30
  `);
  return rows;
};

exports.patientStats = async () => {
  const [rows] = await db.query(`
    SELECT 
      COUNT(id) as totalPatients,
      IFNULL(SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END), 0) as maleCount,
      IFNULL(SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END), 0) as femaleCount
    FROM patients
  `);
  return rows[0] || { totalPatients: 0, maleCount: 0, femaleCount: 0 };
};
exports.doctorRevenue = async () => {
  const [rows] = await db.query(`
    SELECT u.name as doctorName, u.department, SUM(b.totalAmount) as revenueGenerated
    FROM bills b
    JOIN users u ON b.doctorId = u.id
    GROUP BY u.id ORDER BY revenueGenerated DESC
  `);
  return rows;
};

exports.departmentRevenue = async () => {
  const [rows] = await db.query(`
    SELECT u.department, SUM(b.totalAmount) as totalRevenue
    FROM bills b
    JOIN users u ON b.doctorId = u.id
    GROUP BY u.department
  `);
  return rows;
};

 

exports.bedOccupancy = async () => {
  const [rows] = await db.query(`
    SELECT ward, COUNT(id) as occupiedBeds
    FROM ipd_admissions WHERE status = 'admitted'
    GROUP BY ward
  `);
  return rows;
};

exports.inventoryReport = async () => {
  const [rows] = await db.query(`
    SELECT name, batch, quantity, price,
    CASE WHEN quantity < 20 THEN 'Low' ELSE 'Normal' END as stockStatus
    FROM medicines ORDER BY quantity ASC
  `);
  return rows;
};