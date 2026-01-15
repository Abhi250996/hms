import { NavLink } from "react-router-dom";

const navItem = "block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700";
const activeNavItem = "block px-4 py-2 rounded-md bg-slate-800 text-white";

const PharmacistSidebar = () => (
  <aside className="w-64 min-h-screen bg-slate-900 text-white">
    <div className="h-16 flex items-center justify-center border-b border-slate-800">
      <h2 className="text-xl font-bold">Pharmacy</h2>
    </div>

    <nav className="px-4 py-6 space-y-1">
      <NavLink
        to="/pharmacy/medicines"
        className={({ isActive }) => (isActive ? activeNavItem : navItem)}
      >
        Inventory
      </NavLink>

      <NavLink
        to="/pharmacy/issue"
        className={({ isActive }) => (isActive ? activeNavItem : navItem)}
      >
        Issue Medicine
      </NavLink>

      <NavLink
        to="/billing/history"
        className={({ isActive }) => (isActive ? activeNavItem : navItem)}
      >
        Pharmacy Billing
      </NavLink>
    </nav>
  </aside>
);

export default PharmacistSidebar;
