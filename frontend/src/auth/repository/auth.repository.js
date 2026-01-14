// src/auth/repository/auth.repository.js
import api from "../../core/api/axios";

export const authRepository = {
  login(payload) {
    return api.post("/auth/login", payload);
  },

  register(payload) {
    return api.post("/auth/register", payload);
  },

  profile() {
    return api.get("/auth/me");
  },
};
