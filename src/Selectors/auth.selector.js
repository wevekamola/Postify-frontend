export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectUserMeta = (state) => state.auth.userMeta;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;