// src/auth/controller/auth.controller.js
import { authRepository } from "../repository/auth.repository";

export const authController = {
  async login(payload) {
    const response = await authRepository.login(payload);

    const token = response?.data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
    }

    return response.data;
  },

  async register(payload) {
    const response = await authRepository.register(payload);
    return response.data;
  },

  async getProfile() {
    const response = await authRepository.profile();
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },
};
