// src/pharmacy/pharmacySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pharmacyRepository } from "./repository/pharmacy.repository";

/* =======================
   ASYNC THUNKS
======================= */

export const fetchMedicines = createAsyncThunk(
  "pharmacy/fetchMedicines",
  async (_, { rejectWithValue }) => {
    try {
      const res = await pharmacyRepository.getMedicines();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load medicines"
      );
    }
  }
);

export const addMedicine = createAsyncThunk(
  "pharmacy/addMedicine",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await pharmacyRepository.addMedicine(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add medicine"
      );
    }
  }
);

export const updateMedicine = createAsyncThunk(
  "pharmacy/updateMedicine",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await pharmacyRepository.updateMedicine(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update medicine"
      );
    }
  }
);

export const issueMedicine = createAsyncThunk(
  "pharmacy/issueMedicine",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await pharmacyRepository.issueMedicine(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to issue medicine"
      );
    }
  }
);

export const fetchExpiryStock = createAsyncThunk(
  "pharmacy/fetchExpiryStock",
  async (_, { rejectWithValue }) => {
    try {
      const res = await pharmacyRepository.getExpiryStock();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load expiry stock"
      );
    }
  }
);

export const fetchPharmacyBill = createAsyncThunk(
  "pharmacy/fetchPharmacyBill",
  async (patientId, { rejectWithValue }) => {
    try {
      const res = await pharmacyRepository.getPharmacyBill(patientId);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load pharmacy bill"
      );
    }
  }
);

/* =======================
   SLICE
======================= */

const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState: {
    medicines: [],
    expiryStock: [],
    pharmacyBill: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPharmacyError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH MEDICINES */
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD MEDICINE */
      .addCase(addMedicine.fulfilled, (state, action) => {
        state.medicines.push(action.payload);
      })

      /* UPDATE MEDICINE */
      .addCase(updateMedicine.fulfilled, (state, action) => {
        const index = state.medicines.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) {
          state.medicines[index] = action.payload;
        }
      })

      /* ISSUE MEDICINE */
      .addCase(issueMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(issueMedicine.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(issueMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* EXPIRY STOCK */
      .addCase(fetchExpiryStock.fulfilled, (state, action) => {
        state.expiryStock = action.payload;
      })

      /* PHARMACY BILL */
      .addCase(fetchPharmacyBill.fulfilled, (state, action) => {
        state.pharmacyBill = action.payload;
      });
  },
});

export const { clearPharmacyError } = pharmacySlice.actions;
export default pharmacySlice.reducer;
