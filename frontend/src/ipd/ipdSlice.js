// src/ipd/ipdSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ipdController } from "./controller/ipd.controller";

export const admitPatient = createAsyncThunk(
  "ipd/admit",
  async (payload, { rejectWithValue }) => {
    try {
      return await ipdController.admit(payload);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "IPD admit failed");
    }
  }
);

export const fetchIpdList = createAsyncThunk(
  "ipd/list",
  async (_, { rejectWithValue }) => {
    try {
      return await ipdController.getAll();
    } catch {
      return rejectWithValue("Failed to load IPD list");
    }
  }
);

export const fetchIpdById = createAsyncThunk(
  "ipd/detail",
  async (id, { rejectWithValue }) => {
    try {
      return await ipdController.getById(id);
    } catch {
      return rejectWithValue("Failed to load IPD details");
    }
  }
);

export const dischargePatient = createAsyncThunk(
  "ipd/discharge",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await ipdController.discharge(id, data);
    } catch {
      return rejectWithValue("Discharge failed");
    }
  }
);

const ipdSlice = createSlice({
  name: "ipd",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentIpd(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admitPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(admitPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.data;
      })
      .addCase(admitPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIpdList.fulfilled, (state, action) => {
        state.list = action.payload.data;
      })
      .addCase(fetchIpdById.fulfilled, (state, action) => {
        state.current = action.payload.data;
      })
      .addCase(dischargePatient.fulfilled, (state, action) => {
        state.current = action.payload.data;
      });
  },
});

export const { clearCurrentIpd } = ipdSlice.actions;
export default ipdSlice.reducer;
