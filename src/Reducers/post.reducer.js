const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  export const FETCH_POSTS_START = "FETCH_POSTS_START";
  export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
  export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS_START:
        return { ...state, loading: true };
      case FETCH_POSTS_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_POSTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const fetchPostsStart = () => ({ type: FETCH_POSTS_START });
  
  export default postReducer;
  