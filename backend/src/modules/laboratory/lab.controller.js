const labService = require("./lab.service");

/**
 * POST /api/lab/tests
 * Create lab test order
 */
exports.createTestOrder = async (req, res) => {
  try {
    const { patientId, doctorId, testName, testCategory, sampleType } =
      req.body;

    if (!patientId || !doctorId || !testName) {
      return res.status(422).json({ message: "Required fields missing" });
    }

    const testOrder = await labService.createTestOrder({
      patientId,
      doctorId,
      testName,
      testCategory,
      sampleType,
    });

    res.status(201).json(testOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/lab/tests
 * Get all lab test orders
 */
exports.getTestOrders = async (req, res) => {
  try {
    const tests = await labService.getTestOrders();
    res.status(200).json(tests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/lab/tests/:id
 * Get lab test by ID
 */
exports.getTestById = async (req, res) => {
  try {
    const test = await labService.getTestById(req.params.id);
    res.status(200).json(test);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * PUT /api/lab/tests/:id/sample
 * Mark sample as collected
 */
exports.markSampleCollected = async (req, res) => {
  try {
    const result = await labService.markSampleCollected(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT /api/lab/tests/:id/result
 * Enter test result
 */
exports.enterTestResult = async (req, res) => {
  try {
    const { result, normalRange, reportUrl, status } = req.body;

    if (!result) {
      return res.status(422).json({ message: "Result is required" });
    }

    const updated = await labService.enterTestResult(req.params.id, {
      result,
      normalRange,
      reportUrl,
      status,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/lab/tests/patient/:patientId
 * Get patient lab history
 */
exports.getPatientLabHistory = async (req, res) => {
  try {
    const history = await labService.getPatientLabHistory(req.params.patientId);
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
