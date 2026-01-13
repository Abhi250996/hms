import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: { list: [] },
  reducers: {
    setDoctors: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
