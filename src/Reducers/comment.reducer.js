import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    data: {}, // { postId: [comments] }
    loading: false,
    error: null,
  },
  reducers: {
    fetchCommentsStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action) {
      const { postId, comments } = action.payload;
      state.data[postId] = comments;
      state.loading = false;
    },
    fetchCommentsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
