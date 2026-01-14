// src/admin/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminRepository } from "./repository/admin.repository";

/* =======================
   ASYNC THUNKS
======================= */

// USERS
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const res = await adminRepository.getUsers();
  return res.data.data;
});

export const createUser = createAsyncThunk(
  "admin/createUser",
  async (payload) => {
    const res = await adminRepository.createUser(payload);
    return res.data.data;
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, data }) => {
    const res = await adminRepository.updateUser(id, data);
    return res.data.data;
  }
);

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await adminRepository.deleteUser(id);
  return id;
});

// ROLES
export const fetchRoles = createAsyncThunk("admin/fetchRoles", async () => {
  const res = await adminRepository.getRoles();
  return res.data.data;
});

// SETTINGS
export const fetchSettings = createAsyncThunk(
  "admin/settings",
  async () => {
    // UPDATED to match repository
    const res = await adminRepository.getHospitalSettings(); 
    return res.data.data;
  }
);

export const updateSettings = createAsyncThunk(
  "admin/settings",
  async (payload) => {
    // UPDATED to match repository
    const res = await adminRepository.updateHospitalSettings(payload);
    return res.data.data;
  }
);
// AUDIT LOGS
export const fetchAuditLogs = createAsyncThunk(
  "admin/fetchAuditLogs",
  async (params) => {
    const res = await adminRepository.getAuditLogs(params);
    return res.data.data;
  }
);

/* =======================
   SLICE
======================= */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    roles: [],
    settings: null,
    auditLogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })

      // ROLES
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })

      // SETTINGS
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })

      // AUDIT LOGS
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.auditLogs = action.payload;
      });
  },
});

export default adminSlice.reducer;
