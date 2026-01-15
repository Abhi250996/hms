// src/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authController } from "./controller/auth.controller";

/* =======================
    ASYNC THUNKS
======================= */

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authController.login(payload);
      return data; 
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      return await authController.getProfile();
    } catch (err) {
      return rejectWithValue("Session expired");
    }
  }
);

/* =======================
    INITIAL STATE (HYDRATION)
======================= */

const savedToken = localStorage.getItem("token");
const savedRole = localStorage.getItem("role");
const savedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  // If role exists in storage, we use it to create a partial user object immediately
  user: savedUser || (savedRole ? { role: savedRole } : null),
  isAuthenticated: !!savedToken,
  loading: false,
  error: null,
};

/* =======================
    SLICE
======================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.clear(); // Use clear to wipe token, role, and user
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // Map user data from action.payload.data.user
        const userData = action.payload?.data?.user || action.payload?.user;
        state.user = userData || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROFILE
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const userData = action.payload?.data || action.payload;
        state.user = userData || null;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        // If profile fetch fails, consider user unauthenticated
        state.user = null;
        state.isAuthenticated = false;
        localStorage.clear();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;