// src/core/hooks/useAuth.js
import { useSelector } from "react-redux";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    loading: auth.loading,
  };
};
