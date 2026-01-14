// src/app/routes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* AUTH */
import Login from "../auth/pages/Login";

/* PATIENT */
import PatientList from "../patient/pages/PatientList";
import PatientProfile from "../patient/pages/PatientProfile";
import PatientRegistration from "../patient/pages/PatientRegistration";

/* OPD / IPD */
import OPDRegistration from "../opd/pages/OPDRegistration";
import IPDAdmission from "../ipd/pages/IPDAdmission";

/* LAB */
import LabOrderFromIPD from "../laboratory/pages/LabOrderFromIPD";
import LabTestList from "../laboratory/pages/LabTestList";
import LabResultEntry from "../laboratory/pages/LabResultEntry";

/* ADMIN */
import AdminDashboard from "../admin/pages/AdminDashboard";
import UserManagement from "../admin/pages/UserManagement";
import HospitalSettings from "../admin/pages/HospitalSettings";
import AuditLogs from "../admin/pages/AuditLogs";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />

      {/* ================= PROTECTED ================= */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= PATIENT ================= */}
      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <PatientList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patients/new"
        element={
          <ProtectedRoute>
            <PatientRegistration />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patients/:id"
        element={
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= OPD ================= */}
      <Route
        path="/opd/create/:patientId"
        element={
          <ProtectedRoute>
            <OPDRegistration />
          </ProtectedRoute>
        }
      />

      {/* ================= IPD ================= */}
      <Route
        path="/ipd/admit"
        element={
          <ProtectedRoute>
            <IPDAdmission />
          </ProtectedRoute>
        }
      />

      {/* ================= LAB ================= */}
      <Route
        path="/lab/order"
        element={
          <ProtectedRoute>
            <LabOrderFromIPD />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lab/tests"
        element={
          <ProtectedRoute>
            <LabTestList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lab/result/:id"
        element={
          <ProtectedRoute>
            <LabResultEntry />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <HospitalSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/audit-logs"
        element={
          <ProtectedRoute>
            <AuditLogs />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
