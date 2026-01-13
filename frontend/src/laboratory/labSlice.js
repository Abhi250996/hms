import { createSlice } from "@reduxjs/toolkit";

const labSlice = createSlice({
  name: "lab",
  initialState: { tests: [] },
  reducers: {
    setTests(state, action) {
      state.tests = action.payload;
    },
  },
});

export const { setTests } = labSlice.actions;
export default labSlice.reducer;
