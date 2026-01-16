// src/layouts/sidebars/LabTechnicianSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition";
const activeNavItem =
  "block px-4 py-2 rounded-md bg-slate-800 text-white font-medium";

const LabTechnicianSidebar = () => {
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
        <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
          <span>🧪</span> LAB PANEL
        </h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mb-2">
          Specimen Workflow
        </p>

        {/* View all incoming orders from doctors */}
        <NavLink
          to="/lab/tests"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Test Requests
        </NavLink>

        {/* Process for phlebotomy/sample gathering */}
        <NavLink
          to="/lab/sample-collection"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Sample Collection
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Analysis
        </p>

        {/* Link to the test list to select a specimen for data entry */}
        <NavLink
          to="/lab/tests"
          className={({ isActive }) =>
            isActive && window.location.pathname.includes("result")
              ? activeNavItem
              : navItem
          }
        >
          Result Entry
        </NavLink>

        {/* Link to view/print finalized reports */}
        <NavLink
          to="/lab/tests"
          className={({ isActive }) =>
            isActive && window.location.pathname.includes("report")
              ? activeNavItem
              : navItem
          }
        >
          Lab Reports
        </NavLink>

        <p className="text-xs font-semibold text-slate-500 uppercase px-4 mt-6 mb-2">
          Inventory
        </p>
        {/* Lab technicians often need to check reagent/chemical stock */}
        <NavLink
          to="/pharmacy/medicines"
          className={({ isActive }) => (isActive ? activeNavItem : navItem)}
        >
          Reagent Stock
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
          Laboratory System 2026
        </p>
      </div>
    </aside>
  );
};

export default LabTechnicianSidebar;
