import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import communityService from "./communityService";

// Get posts from localStorage
var posts;
if (typeof window !== 'undefined'){
  posts = JSON.parse(localStorage.getItem("posts"));
}

const initialState = {
  posts: posts ? posts : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add post
export const addPost = createAsyncThunk(
  "community/createPost",
  async (data, thunkAPI) => {
    try {
      return await communityService.addPost(data);
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

// Get All Posts
export const getPosts = createAsyncThunk(
  "community/getPosts",
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user._id;
      return await communityService.getPosts(userId);
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

// Add comment to post
export const addCommentToPost = createAsyncThunk(
  "community/addCommentToPost",
  async (data, thunkAPI) => {
    try {
      return await communityService.addCommentToPost(data);
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

export const communityForumSlice = createSlice({
  name: "communityForum",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.posts = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
        state.message = "";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
        state.message = "";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCommentToPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(addCommentToPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = communityForumSlice.actions;
export default communityForumSlice.reducer;
