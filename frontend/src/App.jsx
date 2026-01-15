import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./auth/pages/Login";
import ProtectedRoute from "./app/ProtectedRoute";

// ADMIN
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserManagement from "./admin/pages/UserManagement";
import HospitalSettings from "./admin/pages/HospitalSettings";
import AuditLogs from "./admin/pages/AuditLogs";

// PATIENT
import PatientList from "./patient/pages/PatientList";
import PatientRegistration from "./patient/pages/PatientRegistration";
import PatientProfile from "./patient/pages/PatientProfile";
import OPDVisitCreate from "./patient/pages/OPDVisitCreate";
import IPDAdmission from "./patient/pages/IPDAdmission";

// LAB / PHARMACY / BILLING
import TestOrderList from "./laboratory/pages/TestOrderList";
import MedicineInventory from "./pharmacy/pages/MedicineInventory";
import BillHistory from "./billing/pages/BillHistory";
import SidebarSwitcher from "./layouts/sidebars/SidebarSwitcher";
// REPORTS
import ReportsDashboard from "./reports/pages/ReportsDashboard";
import BedOccupancy from "./reports/pages/BedOccupancy";
import DailyCollection from "./reports/pages/DailyCollection";
import DepartmentRevenue from "./reports/pages/DepartmentRevenue";
import DoctorRevenue from "./reports/pages/DoctorRevenue";
import InventoryReport from "./reports/pages/InventoryReport";
import PatientStats from "./reports/pages/PatientStats";
import SidebarSwitcher from "./layouts/sidebars/SidebarSwitcher";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <SidebarSwitcher />
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="flex min-h-screen bg-gray-100">
                <SidebarSwitcher />
                <main className="flex-1 p-6 overflow-y-auto">
                  <Routes>
                    {/* Default path for logged-in users */}
                    <Route
                      path="/"
                      element={<Navigate to="/admin/dashboard" replace />}
                    />

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

                    {/* OTHER MODULES */}
                    <Route path="/lab/tests" element={<TestOrderList />} />
                    <Route
                      path="/pharmacy/medicines"
                      element={<MedicineInventory />}
                    />
                    <Route path="/billing/history" element={<BillHistory />} />

                    {/* FALLBACK: Only trigger if NO other route matches */}
                    <Route
                      path="*"
                      element={<Navigate to="/admin/dashboard" replace />}
                    />

                    {/* REPORTS */}
                    <Route
                      path="/admin/reports"
                      element={<ReportsDashboard />}
                    />
                    <Route
                      path="/admin/reports/bed-occupancy"
                      element={<BedOccupancy />}
                    />
                    <Route
                      path="/admin/reports/daily-collection"
                      element={<DailyCollection />}
                    />
                    <Route
                      path="/admin/reports/department-revenue"
                      element={<DepartmentRevenue />}
                    />
                    <Route
                      path="/admin/reports/doctor-revenue"
                      element={<DoctorRevenue />}
                    />
                    <Route
                      path="/admin/reports/inventory"
                      element={<InventoryReport />}
                    />
                    <Route
                      path="/admin/reports/patient-stats"
                      element={<PatientStats />}
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
