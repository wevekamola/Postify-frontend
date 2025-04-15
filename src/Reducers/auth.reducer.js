import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  userMeta: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserMetaStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserMetaSuccess(state, action) {
      state.loading = false;
      state.userMeta = action.payload;
    },
    fetchUserMetaFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      state.userMeta = [];
      localStorage.removeItem("currentUser");
    },
  },
});

export const {
  loginStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserMetaStart,
  fetchUserMetaSuccess,
  fetchUserMetaFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
