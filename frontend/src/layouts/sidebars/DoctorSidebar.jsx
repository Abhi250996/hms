// src/layouts/sidebars/DoctorSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

const navItem =
  "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700";
const activeNavItem =
  "block px-4 py-2 rounded-md bg-slate-800 text-white font-medium";

const DoctorSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h2 className="text-xl font-bold">Doctor Panel</h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">

        {/* ✅ EXISTS */}
        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            isActive ? activeNavItem : navItem
          }
        >
          Dashboard
        </NavLink>

        {/* ✅ Doctor consults patients via patient list */}
        <NavLink
          to="/patients"
          className={({ isActive }) =>
            isActive ? activeNavItem : navItem
          }
        >
          Patients
        </NavLink>

        {/* ✅ EXISTS */}
        <NavLink
          to="/doctor/profile"
          className={({ isActive }) =>
            isActive ? activeNavItem : navItem
          }
        >
          My Profile
        </NavLink>

        {/* ⚠️ OPTIONAL – only if doctor sees lab reports */}
        <NavLink
          to="/lab/tests"
          className={({ isActive }) =>
            isActive ? activeNavItem : navItem
          }
        >
          Lab Reports
        </NavLink>

      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
