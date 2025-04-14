export const selectCommentsByPostId = (state, postId) =>
    state.comments.data[postId] || [];
  
  export const selectCommentsLoading = (state) => state.comments.loading;
  export const selectCommentsError = (state) => state.comments.error;
  