// src/layouts/sidebars/NurseSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition";
const activeNavItem =
  "block px-4 py-2 rounded-md bg-slate-800 text-white font-medium";

const NurseSidebar = () => {
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
        <h2 className="text-xl font-bold tracking-wide">Nurse Panel</h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mb-2">
          Patient Care
        </p>

        {/* View all patients for vitals and monitoring */}
        <NavLink
          to="/patients"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Patient Directory
        </NavLink>

        {/* Handling new admissions and bed assignments */}
        <NavLink
          to="/ipd/admit"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          IPD Admissions
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Clinical Tasks
        </p>

        {/* Direct link to the sample collection workflow defined in App.jsx */}
        <NavLink
          to="/lab/sample-collection"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Sample Collection
        </NavLink>

        {/* Pharmacy issue for getting medicines to the ward */}
        <NavLink
          to="/pharmacy/issue"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Medication Issue
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Inventory & Beds
        </p>

        {/* To check available medicine stock */}
        <NavLink
          to="/pharmacy/medicines"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Pharmacy Stock
        </NavLink>

        {/* Nurses often check the Bed Occupancy report for transfers */}
        <NavLink
          to="/admin/reports/bed-occupancy"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Bed Status
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

export default NurseSidebar;
