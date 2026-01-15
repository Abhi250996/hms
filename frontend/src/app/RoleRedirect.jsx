import { Navigate } from "react-router-dom";

const RoleRedirect = () => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;
    case "DOCTOR":
      return <Navigate to="/doctor/dashboard" replace />;
    case "NURSE":
      return <Navigate to="/ipd/admit" replace />;
    case "PHARMACIST":
      return <Navigate to="/pharmacy/medicines" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RoleRedirect;