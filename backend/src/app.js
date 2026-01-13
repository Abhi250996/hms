// src/app.js
const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const patientRoutes = require("./modules/patient/patient.routes");
const doctorRoutes = require("./modules/doctor/doctor.routes");
const appointmentRoutes = require("./modules/appointment/appointment.routes");
const opdRoutes = require("./modules/opd/opd.routes");
const ipdRoutes = require("./modules/ipd/ipd.routes");
const labRoutes = require("./modules/laboratory/lab.routes");
const pharmacyRoutes = require("./modules/pharmacy/pharmacy.routes");
const billingRoutes = require("./modules/billing/billing.routes");
const reportsRoutes = require("./modules/reports/reports.routes");
const adminRoutes = require("./modules/admin/admin.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/opd", opdRoutes);
app.use("/api/ipd", ipdRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

module.exports = app;
