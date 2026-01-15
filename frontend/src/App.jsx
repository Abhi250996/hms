// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./auth/pages/Login";
import ProtectedRoute from "./app/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

/* ================= ADMIN ================= */
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserManagement from "./admin/pages/UserManagement";
import HospitalSettings from "./admin/pages/HospitalSettings";
import AuditLogs from "./admin/pages/AuditLogs";

/* ================= DOCTOR ================= */
import DoctorDashboard from "./doctor/pages/DoctorDashboard";
import Consultation from "./doctor/pages/Consultation";
import DoctorList from "./doctor/pages/DoctorList";
import DoctorProfile from "./doctor/pages/DoctorProfile";

/* ================= NURSE ================= */

/* ================= PATIENT ================= */
import PatientList from "./patient/pages/PatientList";
import PatientRegistration from "./patient/pages/PatientRegistration";
import PatientProfile from "./patient/pages/PatientProfile";
import OPDVisitCreate from "./patient/pages/OPDVisitCreate";
import IPDAdmission from "./patient/pages/IPDAdmission";

/* ================= LAB ================= */
import TestOrderList from "./laboratory/pages/TestOrderList";
import ResultEntry from "./laboratory/pages/ResultEntry";
import LabReport from "./laboratory/pages/LabReport";

/* ================= PHARMACY ================= */
import MedicineInventory from "./pharmacy/pages/MedicineInventory";
import MedicineIssue from "./pharmacy/pages/MedicineIssue";
import PharmacyBilling from "./pharmacy/pages/PharmacyBilling";

/* ================= BILLING ================= */
import BillHistory from "./billing/pages/BillHistory";

/* ================= REPORTS ================= */
import ReportsDashboard from "./reports/pages/ReportsDashboard";
import BedOccupancy from "./reports/pages/BedOccupancy";
import DailyCollection from "./reports/pages/DailyCollection";
import DepartmentRevenue from "./reports/pages/DepartmentRevenue";
import DoctorRevenue from "./reports/pages/DoctorRevenue";
import InventoryReport from "./reports/pages/InventoryReport";
import PatientStats from "./reports/pages/PatientStats";
import SampleCollection from "./laboratory/pages/SampleCollection";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<Login />} />

        {/* ================= PROTECTED ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Default after login (can later replace with RoleRedirect) */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          {/* ================= ADMIN ================= */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/settings" element={<HospitalSettings />} />
          <Route path="admin/audit-logs" element={<AuditLogs />} />
          <Route path="admin/doctor/list" element={<DoctorList />} />
          <Route path="admin/doctor/:id" element={<DoctorProfile />} />

          {/* ================= DOCTOR ================= */}
          <Route path="doctor/dashboard" element={<DoctorDashboard />} />

          <Route
            path="doctor/consultation/:patientId"
            element={<Consultation />}
          />
          <Route path="doctor/profile" element={<DoctorProfile />} />

          {/* ================= PATIENT ================= */}
          <Route path="patients" element={<PatientList />} />
          <Route path="patients/new" element={<PatientRegistration />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          <Route path="opd/create/:patientId" element={<OPDVisitCreate />} />
          <Route path="ipd/admit" element={<IPDAdmission />} />

          {/* ================= LAB ================= */}
          <Route path="lab/tests" element={<TestOrderList />} />
          <Route path="lab/sample-collection" element={<SampleCollection />} />
          <Route path="lab/result/:id" element={<ResultEntry />} />
          <Route path="lab/report/:id" element={<LabReport />} />

          {/* ================= PHARMACY ================= */}
          <Route path="pharmacy/medicines" element={<MedicineInventory />} />
          <Route path="pharmacy/issue" element={<MedicineIssue />} />
          <Route
            path="pharmacy/billing/:patientId"
            element={<PharmacyBilling />}
          />

          {/* ================= BILLING ================= */}
          <Route path="billing/history" element={<BillHistory />} />

          {/* ================= REPORTS ================= */}
          <Route path="admin/reports" element={<ReportsDashboard />} />
          <Route
            path="admin/reports/bed-occupancy"
            element={<BedOccupancy />}
          />
          <Route
            path="admin/reports/daily-collection"
            element={<DailyCollection />}
          />
          <Route
            path="admin/reports/department-revenue"
            element={<DepartmentRevenue />}
          />
          <Route
            path="admin/reports/doctor-revenue"
            element={<DoctorRevenue />}
          />
          <Route path="admin/reports/inventory" element={<InventoryReport />} />
          <Route
            path="admin/reports/patient-stats"
            element={<PatientStats />}
          />

          {/* ================= FALLBACK ================= */}
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
