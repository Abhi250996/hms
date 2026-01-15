import AdminSidebar from "./AdminSidebar";
import DoctorSidebar from "./DoctorSidebar";
import NurseSidebar from "./NurseSidebar";
import PharmacistSidebar from "./PharmacistSidebar";

const SidebarSwitcher = () => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "ADMIN":
      return <AdminSidebar />;

    case "DOCTOR":
      return <DoctorSidebar />;

    case "NURSE":
      return <NurseSidebar />;

    case "PHARMACIST":
      return <PharmacistSidebar />;

    default:
      return null;
  }
};

export default SidebarSwitcher;
