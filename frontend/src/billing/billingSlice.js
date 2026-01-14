// src/billing/billingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BillingController } from "./controller/billing.controller";

/* =======================
   ASYNC THUNKS
======================= */

export const createBill = createAsyncThunk(
  "billing/createBill",
  async (payload, { rejectWithValue }) => {
    try {
      return await BillingController.createBill(payload);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create bill");
    }
  }
);

export const fetchBillById = createAsyncThunk(
  "billing/fetchBillById",
  async (id, { rejectWithValue }) => {
    try {
      return await BillingController.getBill(id);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch bill");
    }
  }
);

export const fetchPatientBills = createAsyncThunk(
  "billing/fetchPatientBills",
  async (patientId, { rejectWithValue }) => {
    try {
      return await BillingController.getPatientBills(patientId);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch patient bills");
    }
  }
);

export const collectPayment = createAsyncThunk(
  "billing/collectPayment",
  async (payload, { rejectWithValue }) => {
    try {
      return await BillingController.collectPayment(payload);
    } catch (err) {
      return rejectWithValue(err.message || "Payment failed");
    }
  }
);

export const refundPayment = createAsyncThunk(
  "billing/refundPayment",
  async (payload, { rejectWithValue }) => {
    try {
      return await BillingController.refundPayment(payload);
    } catch (err) {
      return rejectWithValue(err.message || "Refund failed");
    }
  }
);

export const fetchBillingHistory = createAsyncThunk(
  "billing/fetchBillingHistory",
  async (_, { rejectWithValue }) => {
    try {
      return await BillingController.getHistory();
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch billing history");
    }
  }
);

/* =======================
   SLICE
======================= */

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    bills: [],
    selectedBill: null,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedBill(state) {
      state.selectedBill = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE BILL */
      .addCase(createBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.loading = false;
        state.bills.push(action.payload);
      })
      .addCase(createBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH BILL BY ID */
      .addCase(fetchBillById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBillById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBill = action.payload;
      })
      .addCase(fetchBillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH PATIENT BILLS */
      .addCase(fetchPatientBills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatientBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(fetchPatientBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* COLLECT PAYMENT */
      .addCase(collectPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(collectPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(collectPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* REFUND */
      .addCase(refundPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(refundPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* HISTORY */
      .addCase(fetchBillingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBillingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchBillingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedBill } = billingSlice.actions;
export default billingSlice.reducer;
