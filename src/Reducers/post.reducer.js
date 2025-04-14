import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  deletedId: null,
  data: [],
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createPostStart() {}, // Handled by saga
    createPostSuccess(state, action) {
      state.data.unshift(action.payload);
    },
    createPostFailure(state, action) {
      state.error = action.payload;
    },
    deletePostStart() {}, // Handled by saga
    deletePostSuccess(state, action) {
      state.data = state.data.filter((post) => post.id !== action.payload);
      state.deletedId = action.payload;
    },
    deletePostFailure(state, action) {
      state.error = action.payload;
    },
    clearDeletedId(state) {
      state.deletedId = null;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  clearDeletedId,
} = postSlice.actions;

export default postSlice.reducer;
