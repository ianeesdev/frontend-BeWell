import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import therapistService from "./therapistService";

// Get therapists from localStorage
var therapists;
if (typeof window !== undefined) {
  therapists = JSON.parse(localStorage.getItem("therapists"));
}

const initialState = {
  therapists: therapists ? therapists : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get All therapists
export const getAllTherapists = createAsyncThunk(
  "therapists/getAll",
  async (_, thunkAPI) => {
    try {
      return await therapistService.getAllTherapists();
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

export const therapistSlice = createSlice({
  name: "therapists",
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
      .addCase(getAllTherapists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTherapists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.therapists = action.payload;
        state.message = "";
      })
      .addCase(getAllTherapists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.therapists = null;
      });
  },
});

export const { reset } = therapistSlice.actions;
export default therapistSlice.reducer;
