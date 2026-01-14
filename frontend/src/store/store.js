// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../auth/authSlice";
import patientReducer from "../patient/patientSlice";
import doctorReducer from "../doctor/doctorSlice";
import appointmentReducer from "../appointment/appointmentSlice";
import opdReducer from "../opd/opdSlice";
import ipdReducer from "../ipd/ipdSlice";
import labReducer from "../laboratory/labSlice";
import pharmacyReducer from "../pharmacy/pharmacySlice";
import billingReducer from "../billing/billingSlice";
import adminReducer from "../admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
    opd: opdReducer,
    ipd: ipdReducer,
    laboratory: labReducer,
    pharmacy: pharmacyReducer,
    billing: billingReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
