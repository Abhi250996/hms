// src/app/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../auth/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "../shared/components/Sidebar";

// ADMIN
import AdminDashboard from "../admin/pages/AdminDashboard";
import UserManagement from "../admin/pages/UserManagement";
import HospitalSettings from "../admin/pages/HospitalSettings";
import AuditLogs from "../admin/pages/AuditLogs";

// PATIENT
import PatientList from "../patient/pages/PatientList";
import PatientRegistration from "../patient/pages/PatientRegistration";
import PatientProfile from "../patient/pages/PatientProfile";
import OPDVisitCreate from "../patient/pages/OPDVisitCreate";
import IPDAdmission from "../patient/pages/IPDAdmission";

// LAB / PHARMACY / BILLING (future ready)
import TestOrderList from "../laboratory/pages/TestOrderList";
import MedicineInventory from "../pharmacy/pages/MedicineInventory";
import BillHistory from "../billing/pages/BillHistory";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                  <Routes>
                    {/* ADMIN */}
                    <Route
                      path="/admin/dashboard"
                      element={<AdminDashboard />}
                    />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route
                      path="/admin/settings"
                      element={<HospitalSettings />}
                    />
                    <Route path="/admin/audit-logs" element={<AuditLogs />} />

                    {/* PATIENT */}
                    <Route path="/patients" element={<PatientList />} />
                    <Route
                      path="/patients/new"
                      element={<PatientRegistration />}
                    />
                    <Route path="/patients/:id" element={<PatientProfile />} />
                    <Route
                      path="/opd/create/:patientId"
                      element={<OPDVisitCreate />}
                    />
                    <Route path="/ipd/admit" element={<IPDAdmission />} />

                    {/* LAB */}
                    <Route path="/lab/tests" element={<TestOrderList />} />

                    {/* PHARMACY */}
                    <Route
                      path="/pharmacy/medicines"
                      element={<MedicineInventory />}
                    />

                    {/* BILLING */}
                    <Route path="/billing/history" element={<BillHistory />} />

                    {/* DEFAULT */}
                    <Route
                      path="*"
                      element={<Navigate to="/admin/dashboard" />}
                    />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
