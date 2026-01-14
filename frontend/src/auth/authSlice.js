import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authController } from "./controller/auth.controller";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authController.login(payload);
      return data; // Usually { success: true, data: { user, token } }
    } catch (err) {
      // Specifically capture the error message from the server
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // Adjust the mapping based on your API structure (payload.data.user vs payload.user)
        state.user = action.payload?.data?.user || action.payload?.user || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload?.data || action.payload || null;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;