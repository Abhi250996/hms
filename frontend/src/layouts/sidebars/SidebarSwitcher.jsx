// src/layouts/sidebars/SidebarSwitcher.jsx
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import DoctorSidebar from "./DoctorSidebar";
import NurseSidebar from "./NurseSidebar";
import PharmacistSidebar from "./PharmacistSidebar";

const SidebarSwitcher = () => {
  // 1. Try to get role from Redux first (fastest and most accurate)
  const { user } = useSelector((state) => state.auth);
  
  // 2. Fallback to localStorage if Redux is refreshed
  const role = user?.role || localStorage.getItem("role");

  console.log("Detected Role:", role);

  switch (role?.toUpperCase()) { // toUpperCase handles "admin" vs "ADMIN"
    case "ADMIN":
      return <AdminSidebar />;
    case "DOCTOR":
      return <DoctorSidebar />;
    case "NURSE":
      return <NurseSidebar />;
    case "PHARMACIST":
      return <PharmacistSidebar />;
    default:
      console.warn("SidebarSwitcher: No matching role found for:", role);
      return null;
  }
};

export default SidebarSwitcher;