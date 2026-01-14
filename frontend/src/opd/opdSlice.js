// src/opd/opdSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as opdRepository from "./repository/opd.repository";

/* ================== THUNKS ================== */

export const createOpdVisit = createAsyncThunk(
  "opd/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await opdRepository.createOpd(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OPD create failed"
      );
    }
  }
);

export const fetchOpdVisits = createAsyncThunk(
  "opd/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await opdRepository.getAllOpd();
      return res.data;
    } catch {
      return rejectWithValue("Failed to load OPD visits");
    }
  }
);

export const fetchOpdById = createAsyncThunk(
  "opd/detail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await opdRepository.getOpdById(id);
      return res.data;
    } catch {
      return rejectWithValue("OPD not found");
    }
  }
);

export const updateOpdVisit = createAsyncThunk(
  "opd/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await opdRepository.updateOpd(id, data);
      return res.data;
    } catch {
      return rejectWithValue("OPD update failed");
    }
  }
);

export const fetchPatientOpdHistory = createAsyncThunk(
  "opd/patientHistory",
  async (patientId, { rejectWithValue }) => {
    try {
      const res = await opdRepository.getPatientOpdHistory(patientId);
      return res.data;
    } catch {
      return rejectWithValue("Failed to load patient OPD history");
    }
  }
);

/* ================== SLICE ================== */

const opdSlice = createSlice({
  name: "opd",
  initialState: {
    list: [],
    selected: null,
    patientHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedOpd(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createOpdVisit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOpdVisit.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createOpdVisit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LIST */
      .addCase(fetchOpdVisits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOpdVisits.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOpdVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DETAIL */
      .addCase(fetchOpdById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      /* UPDATE */
      .addCase(updateOpdVisit.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.list = state.list.map((v) =>
          v.id === action.payload.id ? action.payload : v
        );
      })

      /* PATIENT HISTORY */
      .addCase(fetchPatientOpdHistory.fulfilled, (state, action) => {
        state.patientHistory = action.payload;
      });
  },
});

export const { clearSelectedOpd } = opdSlice.actions;
export default opdSlice.reducer;
