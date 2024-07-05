
import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./device/deviceReducer";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    auth: authReducer,
  },
});
