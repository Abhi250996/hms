import api from "../../core/api/axios";

export const authRepository = {
  login(payload) {
    return api.post("/api/auth/login", payload);
  },

  register(payload) {
    return api.post("/api/auth/register", payload);
  },

  profile() {
    return api.get("/api/auth/me");
  },
};
