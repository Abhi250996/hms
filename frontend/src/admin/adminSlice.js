import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminRepository } from "./repository/admin.repository";

/* =======================
   ASYNC THUNKS
======================= */

// USERS
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await adminRepository.getUsers();
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
  }
});

export const createUser = createAsyncThunk("admin/createUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await adminRepository.createUser(payload);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create user");
  }
});

export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await adminRepository.updateUser(id, data);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update user");
  }
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await adminRepository.deleteUser(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete user");
  }
});

// ROLES
export const fetchRoles = createAsyncThunk("admin/fetchRoles", async (_, { rejectWithValue }) => {
  try {
    const res = await adminRepository.getRoles();
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch roles");
  }
});

// SETTINGS (Fixed unique action strings)
export const fetchSettings = createAsyncThunk("admin/fetchSettings", async (_, { rejectWithValue }) => {
  try {
    const res = await adminRepository.getHospitalSettings();
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch settings");
  }
});

export const updateSettings = createAsyncThunk("admin/updateSettings", async (payload, { rejectWithValue }) => {
  try {
    const res = await adminRepository.updateHospitalSettings(payload);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update settings");
  }
});

// AUDIT LOGS
export const fetchAuditLogs = createAsyncThunk("admin/fetchAuditLogs", async (params, { rejectWithValue }) => {
  try {
    const res = await adminRepository.getAuditLogs(params);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch audit logs");
  }
});

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
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* USERS CASES */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

      /* ROLES CASES */
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })

      /* SETTINGS CASES */
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })

      /* AUDIT LOGS CASES */
      .addCase(fetchAuditLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.auditLogs = action.payload;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;