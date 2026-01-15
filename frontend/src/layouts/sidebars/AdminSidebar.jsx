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
    // 1. Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // (optional but safe)
    localStorage.clear();

    // 2. Redux logout
    dispatch(logout());

    // 3. Redirect to login
    navigate("/login", { replace: true });
  };

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
          to="/admin/settings"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Hospital Settings
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Reports
        </NavLink>

        <NavLink
          to="/admin/audit-logs"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Audit Logs
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="px-4 py-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm rounded-md
                     bg-red-600 hover:bg-red-700 transition text-white"
        >
          Logout
        </button>

        <p className="mt-3 text-xs text-slate-400 text-center">
          © {new Date().getFullYear()} HMS
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
