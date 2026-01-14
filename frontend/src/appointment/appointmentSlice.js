// src/appointment/appointmentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appointmentController } from "./controller/appointment.controller";

/* =======================
   Async Thunks
======================= */

export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (payload) => {
    return await appointmentController.createAppointment(payload);
  }
);

export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAll",
  async () => {
    return await appointmentController.getAppointments();
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointment/fetchById",
  async (id) => {
    return await appointmentController.getAppointmentById(id);
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/update",
  async ({ id, data }) => {
    return await appointmentController.updateAppointment(id, data);
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointment/cancel",
  async (id) => {
    return await appointmentController.cancelAppointment(id);
  }
);

export const fetchDoctorAppointments = createAsyncThunk(
  "appointment/fetchDoctor",
  async (doctorId) => {
    return await appointmentController.getDoctorAppointments(doctorId);
  }
);

/* =======================
   Slice
======================= */

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    list: [],
    doctorList: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedAppointment(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH ALL
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH BY ID
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // UPDATE
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const index = state.list.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // CANCEL
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a.id !== action.meta.arg);
      })

      // DOCTOR APPOINTMENTS
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.doctorList = action.payload;
      });
  },
});

export const { clearSelectedAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
