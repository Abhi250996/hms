const opdService = require("./opd.service");

/**
 * POST /api/opd
 * Create OPD visit
 */
exports.createOpdVisit = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      diagnosis,
      prescription,
      visitDate,
      remarks,
      followUpDate,
    } = req.body;

    if (!patientId || !doctorId || !visitDate) {
      return res.status(422).json({ message: "Required fields missing" });
    }

    const visit = await opdService.createOpdVisit({
      patientId,
      doctorId,
      diagnosis,
      prescription,
      visitDate,
      remarks,
      followUpDate,
    });

    res.status(201).json(visit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/opd
 * Get all OPD visits
 */
exports.getOpdVisits = async (req, res) => {
  try {
    const visits = await opdService.getOpdVisits();
    res.status(200).json(visits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/opd/:id
 * Get OPD visit by ID
 */
exports.getOpdVisitById = async (req, res) => {
  try {
    const visit = await opdService.getOpdVisitById(req.params.id);
    res.status(200).json(visit);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * PUT /api/opd/:id
 * Update OPD consultation
 */
exports.updateOpdVisit = async (req, res) => {
  try {
    const visit = await opdService.updateOpdVisit(req.params.id, req.body);
    res.status(200).json(visit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/opd/patient/:patientId
 * Get OPD history for a patient
 */
exports.getPatientOpdHistory = async (req, res) => {
  try {
    const history = await opdService.getPatientOpdHistory(req.params.patientId);
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
