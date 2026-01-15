// src/layouts/sidebars/PharmacistSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 transition";
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
        <h2 className="text-xl font-bold">Pharmacy Panel</h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <NavLink
          to="/pharmacy/medicines"
          className={({ isActive }) =>
            isActive ? activeNavItem : navItem
          }
        >
          Medicine Inventory
        </NavLink>

        <NavLink
          to="/pharmacy/issue"
          className={({ isActive }) =>
            isActive ? activeNavItem : navItem
          }
        >
          Issue Medicine
        </NavLink>

        <NavLink
          to="/billing/history"
          className={({ isActive }) =>
            isActive ? activeNavItem : navItem
          }
        >
          Bill History
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default PharmacistSidebar;
