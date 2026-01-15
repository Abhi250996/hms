import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientController } from "./controller/patient.controller";

export const fetchPatients = createAsyncThunk(
  "patient/fetchAll",
  async () => await patientController.getPatients()
);
export const createPatient = createAsyncThunk(
  "patients/create",
  async (formData, { rejectWithValue }) => {
    try {
      // 1. Flatten nested data for the MySQL Repository
      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        gender: formData.gender,
        dob: formData.dob,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        // Ensure no nested objects like 'identity' are sent if DB doesn't have them
      };
      return await patientController.createPatient(payload);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default patientSlice.reducer;
