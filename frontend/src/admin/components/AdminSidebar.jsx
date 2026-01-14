// src/admin/components/AdminSidebar.jsx
import { NavLink } from "react-router-dom";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition";
const activeNavItem =
  "block px-4 py-2 rounded-md bg-slate-800 text-white font-medium";

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wide">HMS Admin</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          User Management
        </NavLink>

        <NavLink
          to="/admin/hospital-settings"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Hospital Settings
        </NavLink>

        <NavLink
          to="/admin/audit-logs"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Audit Logs
        </NavLink>

        <NavLink
          to="/reports/daily-collection"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Reports
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-800 text-xs text-slate-400">
        © {new Date().getFullYear()} HMS
      </div>
    </aside>
  );
};

export default AdminSidebar;
