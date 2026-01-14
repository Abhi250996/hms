import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ReportsController } from "./controller/reports.controller";

// Async thunk to fetch all dashboard data at once
export const fetchDashboardStats = createAsyncThunk(
  "reports/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      // Execute all requests in parallel for better performance
      const [daily, doctor, dept, patients, beds, inventory] = await Promise.all([
        ReportsController.dailyCollection(),
        ReportsController.doctorRevenue(),
        ReportsController.departmentRevenue(),
        ReportsController.patientStats(),
        ReportsController.bedOccupancy(),
        ReportsController.inventory(),
      ]);

      return {
        daily,
        doctor,
        dept,
        patients,
        beds,
        inventory,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load reports");
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    stats: {
      daily: null,
      doctor: [],
      dept: [],
      patients: null,
      beds: null,
      inventory: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReportError } = reportSlice.actions;
export default reportSlice.reducer;