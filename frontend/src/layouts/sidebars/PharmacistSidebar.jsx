// src/layouts/sidebars/PharmacistSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition";
const activeNavItem =
  "block px-4 py-2 rounded-md bg-slate-800 text-white font-medium";

const PharmacistSidebar = () => {
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
        <h2 className="text-xl font-bold tracking-wide">Pharmacy Panel</h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mb-2">
          Operations
        </p>

        {/* Main Dispensing Link */}
        <NavLink
          to="/pharmacy/issue"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Issue Medicine
        </NavLink>

        {/* Accessing patient list to initiate billing per patient */}
        <NavLink
          to="/patients"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Patient Search
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Inventory
        </p>

        <NavLink
          to="/pharmacy/medicines"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Medicine Stock
        </NavLink>

        {/* Linked to the Inventory Report route in App.jsx */}
        <NavLink
          to="/admin/reports/inventory"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Stock Reports
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Billing & Finance
        </p>

        <NavLink
          to="/billing/history"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Sales History
        </NavLink>

        <NavLink
          to="/admin/reports/daily-collection"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Daily Collection
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
      </div>
    </aside>
  );
};

export default PharmacistSidebar;
