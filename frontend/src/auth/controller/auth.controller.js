// src/auth/controller/auth.controller.js
import { authRepository } from "../repository/auth.repository";

export const authController = {
  async login(payload) {
    const response = await authRepository.login(payload);
    
    // Extracting nested data based on your API structure (data.data)
    const data = response?.data?.data; 
    const token = data?.token;
    const user = data?.user;

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role); // CRITICAL: Saved for SidebarSwitcher
      localStorage.setItem("user", JSON.stringify(user)); // Saved for Profile
    }

    return response.data; // Return full response to the component
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
    localStorage.clear(); // Clears token, role, and user at once
    window.location.href = "/login";
  },
};