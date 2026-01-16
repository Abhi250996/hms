// src/layouts/sidebars/ReceptionistSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition";
const activeNavItem =
  "block px-4 py-2 rounded-md bg-slate-800 text-white font-medium";

const ReceptionistSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* HEADER */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wide">RECEPTION</h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mb-2">
          Registration
        </p>

        <NavLink
          to="/patients/new"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Register Patient
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Patient List
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Front Desk
        </p>

        {/* Note: Ensure /appointments is defined in your App.jsx */}
        <NavLink
          to="/appointments"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Appointments
        </NavLink>

        <NavLink
          to="/billing/history"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Billing
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-md transition duration-200"
        >
          <span>Logout</span>
        </button>

        <p className="mt-3 text-[10px] text-slate-500 text-center uppercase tracking-widest">
          2026 HMS System
        </p>
      </div>
    </aside>
  );
};

export default ReceptionistSidebar;
