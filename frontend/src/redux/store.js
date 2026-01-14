// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice"; // Ensure you have an authSlice file!

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;