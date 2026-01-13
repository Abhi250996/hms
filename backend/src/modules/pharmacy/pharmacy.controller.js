// src/modules/pharmacy/pharmacy.controller.js
const pharmacyService = require("./pharmacy.service");

/**
 * POST /api/pharmacy/medicines
 * Add new medicine
 */
exports.addMedicine = async (req, res) => {
  try {
    const { name, batch, expiryDate, quantity, price } = req.body;

    if (!name || !batch || !expiryDate || quantity == null || price == null) {
      return res.status(422).json({ message: "Required fields missing" });
    }

    const medicine = await pharmacyService.addMedicine({
      name,
      batch,
      expiryDate,
      quantity,
      price,
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/pharmacy/medicines
 * Get all medicines
 */
exports.getMedicines = async (req, res) => {
  try {
    const medicines = await pharmacyService.getMedicines();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT /api/pharmacy/medicines/:id
 * Update medicine stock / price
 */
exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await pharmacyService.updateMedicine(
      req.params.id,
      req.body
    );
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * POST /api/pharmacy/issue
 * Issue medicine to patient
 */
exports.issueMedicine = async (req, res) => {
  try {
    const { patientId, medicineId, quantity } = req.body;

    if (!patientId || !medicineId || !quantity) {
      return res.status(422).json({ message: "Required fields missing" });
    }

    const result = await pharmacyService.issueMedicine({
      patientId,
      medicineId,
      quantity,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/pharmacy/stock/expiry
 * Get medicines nearing expiry
 */
exports.getExpiryStock = async (req, res) => {
  try {
    const stock = await pharmacyService.getExpiryStock();
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/pharmacy/billing/:patientId
 * Get pharmacy bill for patient
 */
exports.getPharmacyBill = async (req, res) => {
  try {
    const bill = await pharmacyService.getPharmacyBill(req.params.patientId);
    res.status(200).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
