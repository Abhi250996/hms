const patientService = require("./patient.service");

/**
 * POST /api/patients
 * Create new patient
 */
exports.createPatient = async (req, res) => {
  try {
    const {
      name,
      mobile,
      gender,
      dob,
      email,
      address,
      bloodGroup,
      emergencyContact,
    } = req.body;

    if (!name || !mobile || !gender || !dob) {
      return res.status(422).json({ message: "Required fields missing" });
    }

    const patient = await patientService.createPatient(
      {
        name,
        mobile,
        gender,
        dob,
        email,
        address,
        bloodGroup,
        emergencyContact,
      },
      req.user
    );

    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/patients
 * Get all patients
 */
exports.getPatients = async (req, res) => {
  try {
    const patients = await patientService.getPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/patients/:id
 * Get patient by ID
 */
exports.getPatientById = async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * PUT /api/patients/:id
 * Update patient details
 */
exports.updatePatient = async (req, res) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE /api/patients/:id
 * Delete patient
 */
exports.deletePatient = async (req, res) => {
  try {
    await patientService.deletePatient(req.params.id);
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * POST /api/patients/:id/documents
 * Upload patient documents
 */
exports.uploadDocuments = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(422).json({ message: "No documents uploaded" });
    }

    const result = await patientService.uploadDocuments(
      req.params.id,
      req.files
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/patients/:id/history
 * Get patient OPD + IPD history
 */
exports.getPatientHistory = async (req, res) => {
  try {
    const history = await patientService.getPatientHistory(req.params.id);
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
