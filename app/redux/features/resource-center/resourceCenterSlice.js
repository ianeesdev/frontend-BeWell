import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resourceCenterService from "./resourceCenterService";

// Get journals from localStorage
var journals;
if (typeof window !== 'undefined'){
  journals = JSON.parse(localStorage.getItem("journals"));
}

const initialState = {
  journals: journals ? journals : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add journals
export const addJournal = createAsyncThunk(
  "journals/add",
  async (data, thunkAPI) => {
    try {
      return await resourceCenterService.addJournal(data);
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

// Get All journals
export const getAllJournalsByUser = createAsyncThunk(
  "journals/getAll",
  async (userId, thunkAPI) => {
    try {
      return await resourceCenterService.getAllJournalsByUser(userId);
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

// Delete journal
export const deleteJournal = createAsyncThunk(
  "journals/delete",
  async (journalId, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user._id;
      return await resourceCenterService.deleteJournal(userId, journalId);
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

export const journalSlice = createSlice({
  name: "journals",
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
      .addCase(addJournal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJournal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journals = action.payload;
        state.message = "";
      })
      .addCase(addJournal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllJournalsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJournalsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journals = action.payload;
        state.message = "";
      })
      .addCase(getAllJournalsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.journals = null;
      })
      .addCase(deleteJournal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJournal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journals = action.payload;
        state.message = "";
      })
      .addCase(deleteJournal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = journalSlice.actions;
export default journalSlice.reducer;
