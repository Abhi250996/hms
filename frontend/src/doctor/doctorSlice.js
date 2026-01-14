// src/doctor/doctorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as doctorController from "./controller/doctor.controller";

/**
 * THUNKS
 */
export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      return await doctorController.fetchDoctors();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load doctors"
      );
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  "doctor/fetchDoctorById",
  async (id, { rejectWithValue }) => {
    try {
      return await doctorController.fetchDoctor(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load doctor"
      );
    }
  }
);

export const createDoctor = createAsyncThunk(
  "doctor/createDoctor",
  async (payload, { rejectWithValue }) => {
    try {
      return await doctorController.saveDoctor(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create doctor"
      );
    }
  }
);

export const updateDoctor = createAsyncThunk(
  "doctor/updateDoctor",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await doctorController.editDoctor(id, data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update doctor"
      );
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctor/deleteDoctor",
  async (id, { rejectWithValue }) => {
    try {
      return await doctorController.removeDoctor(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete doctor"
      );
    }
  }
);

/**
 * SLICE
 */
const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentDoctor(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ONE
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.current = action.payload.data || action.payload;
      })

      // CREATE
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.list.unshift(action.payload.data || action.payload);
      })

      // UPDATE
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const updated = action.payload.data || action.payload;
        state.list = state.list.map((d) => (d.id === updated.id ? updated : d));
        state.current = updated;
      })

      // DELETE
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.list = state.list.filter((d) => d.id !== deletedId);
      });
  },
});

export const { clearCurrentDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
