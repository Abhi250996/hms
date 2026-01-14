// src/app/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Read auth token
  const token = localStorage.getItem("token");

  // If not logged in → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // If logged in → allow access
  return children;
};

export default ProtectedRoute;
