// src/admin/components/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition";
const activeNavItem =
  "block px-4 py-2 rounded-md bg-slate-800 text-white font-medium";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wide">HMS Admin</h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mb-2">
          Core
        </p>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Dashboard
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Staff & Patients
        </p>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          User Management
        </NavLink>
        <NavLink
          to="/admin/doctor/list"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Doctor List
        </NavLink>
        <NavLink
          to="/patients"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Global Patient List
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Revenue & Analytics
        </p>
        <NavLink
          to="/admin/reports"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Reports Dashboard
        </NavLink>
        <NavLink
          to="/admin/reports/daily-collection"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Financial Logs
        </NavLink>
        <NavLink
          to="/admin/reports/bed-occupancy"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Infrastructure Status
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          System
        </p>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Hospital Settings
        </NavLink>
        <NavLink
          to="/admin/audit-logs"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Security Audit
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="px-4 py-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-md transition duration-200"
        >
          <span>Logout</span>
        </button>

        <p className="mt-3 text-[10px] text-slate-500 text-center uppercase tracking-widest">
          v2.0.26 Secure Build
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
