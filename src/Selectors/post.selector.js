export const selectPostList = (state) => state.posts.data;
export const selectPostLoading = (state) => state.posts.loading;
export const selectDeletedId = (state) => state.posts.deletedId;

export const selectSelectedPost = (state) => state.posts.selectedPost;
export const selectSelectedPostLoading = (state) => state.posts.loadingSelectedPost;
export const selectSelectedPostError = (state) => state.posts.errorSelectedPost;