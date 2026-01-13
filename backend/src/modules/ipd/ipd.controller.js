const ipdService = require("./ipd.service");

/**
 * POST /api/ipd
 * Admit patient
 */
exports.admitPatient = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      bedNumber,
      ward,
      bedType,
      admissionDate,
      diagnosis,
      treatmentPlan,
      remarks,
    } = req.body;

    if (!patientId || !doctorId || !bedNumber || !ward || !admissionDate) {
      return res.status(422).json({ message: "Required fields missing" });
    }

    const admission = await ipdService.admitPatient({
      patientId,
      doctorId,
      bedNumber,
      ward,
      bedType,
      admissionDate,
      diagnosis,
      treatmentPlan,
      remarks,
    });

    res.status(201).json(admission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/ipd
 * Get all IPD admissions
 */
exports.getIpdList = async (req, res) => {
  try {
    const list = await ipdService.getIpdList();
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/ipd/:id
 * Get IPD admission by ID
 */
exports.getIpdById = async (req, res) => {
  try {
    const admission = await ipdService.getIpdById(req.params.id);
    res.status(200).json(admission);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * PUT /api/ipd/:id
 * Update IPD treatment
 */
exports.updateIpd = async (req, res) => {
  try {
    const admission = await ipdService.updateIpd(req.params.id, req.body);
    res.status(200).json(admission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT /api/ipd/:id/discharge
 * Discharge patient
 */
exports.dischargePatient = async (req, res) => {
  try {
    const { dischargeDate, remarks } = req.body;

    if (!dischargeDate) {
      return res.status(422).json({ message: "Discharge date required" });
    }

    const result = await ipdService.dischargePatient(req.params.id, {
      dischargeDate,
      remarks,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/ipd/patient/:patientId
 * Get IPD history for a patient
 */
exports.getPatientIpdHistory = async (req, res) => {
  try {
    const history = await ipdService.getPatientIpdHistory(req.params.patientId);
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
