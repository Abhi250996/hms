import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientController } from "./controller/patient.controller";

export const fetchPatients = createAsyncThunk(
  "patient/fetchAll",
  async () => await patientController.getPatients()
);

export const createPatient = createAsyncThunk(
  "patient/create",
  async (payload) => await patientController.createPatient(payload)
);

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.list.unshift(action.payload.data);
      });
  },
});

export default patientSlice.reducer;
