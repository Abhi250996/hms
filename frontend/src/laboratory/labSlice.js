// src/laboratory/labSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { labController } from "./controller/lab.controller";

/* =======================
   ASYNC ACTIONS
======================= */

export const createLabTest = createAsyncThunk(
  "lab/createTest",
  async (payload, { rejectWithValue }) => {
    try {
      return await labController.createTest(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Create test failed"
      );
    }
  }
);

export const fetchLabTests = createAsyncThunk(
  "lab/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await labController.getAllTests();
    } catch {
      return rejectWithValue("Failed to load lab tests");
    }
  }
);

export const fetchLabTestById = createAsyncThunk(
  "lab/getById",
  async (id, { rejectWithValue }) => {
    try {
      return await labController.getTestById(id);
    } catch {
      return rejectWithValue("Test not found");
    }
  }
);

export const collectSample = createAsyncThunk(
  "lab/collectSample",
  async (id, { rejectWithValue }) => {
    try {
      return await labController.markSampleCollected(id);
    } catch {
      return rejectWithValue("Sample collection failed");
    }
  }
);

export const submitLabResult = createAsyncThunk(
  "lab/submitResult",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await labController.enterTestResult(id, data);
    } catch {
      return rejectWithValue("Result submission failed");
    }
  }
);

export const fetchPatientLabHistory = createAsyncThunk(
  "lab/patientHistory",
  async (patientId, { rejectWithValue }) => {
    try {
      return await labController.getPatientLabHistory(patientId);
    } catch {
      return rejectWithValue("Failed to load patient lab history");
    }
  }
);

/* =======================
   SLICE
======================= */

const labSlice = createSlice({
  name: "lab",
  initialState: {
    tests: [],
    selectedTest: null,
    patientHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedTest(state) {
      state.selectedTest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createLabTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLabTest.fulfilled, (state, action) => {
        state.loading = false;
        state.tests.unshift(action.payload.data);
      })
      .addCase(createLabTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(fetchLabTests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLabTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload.data || [];
      })
      .addCase(fetchLabTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(fetchLabTestById.fulfilled, (state, action) => {
        state.selectedTest = action.payload.data;
      })

      // SAMPLE
      .addCase(collectSample.fulfilled, (state, action) => {
        state.selectedTest = action.payload.data;
      })

      // RESULT
      .addCase(submitLabResult.fulfilled, (state, action) => {
        state.selectedTest = action.payload.data;
      })

      // PATIENT HISTORY
      .addCase(fetchPatientLabHistory.fulfilled, (state, action) => {
        state.patientHistory = action.payload.data || [];
      });
  },
});

export const { clearSelectedTest } = labSlice.actions;
export default labSlice.reducer;
