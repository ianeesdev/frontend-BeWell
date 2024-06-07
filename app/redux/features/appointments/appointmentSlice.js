import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";
import { getLocalStorageItem } from '../../../../lib/utils.ts';

// Get appointments from localStorage
const appointments = JSON.parse(getLocalStorageItem("appointments"));

const initialState = {
  appointments: appointments ? appointments : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add appointment
export const addAppointment = createAsyncThunk(
  "appointments/add",
  async (data, thunkAPI) => {
    try {
      return await appointmentService.addAppointment(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All appointment
export const getAppointments = createAsyncThunk(
  "appointments/getAll",
  async (userId, thunkAPI) => {
    try {
      return await appointmentService.getAppointments(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.appointments = action.payload;
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.appointments = null;
      });
  },
});

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;
