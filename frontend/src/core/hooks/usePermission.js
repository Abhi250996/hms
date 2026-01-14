// src/core/hooks/usePermission.js
import { useSelector } from "react-redux";

export const usePermission = (allowedRoles = []) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return false;
  if (allowedRoles.length === 0) return true;

  return allowedRoles.includes(user.role);
};
