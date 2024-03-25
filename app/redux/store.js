import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import paymentReducer from "./features/payment/paymentSlice";
import therapistReducer from "./features/therapist/therapistSlice";
import appointmentReducer from "./features/appointments/appointmentSlice";
import resourceCenterReducer from "./features/resource-center/resourceCenterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
    therapists: therapistReducer,
    appointments: appointmentReducer,
    resourceCenter: resourceCenterReducer,
  },
})