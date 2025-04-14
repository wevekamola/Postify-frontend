import { combineReducers } from "redux";
import postReducer from "./post.reducer";
import authReducer from "./auth.reducer";
import commentReducer from "./comment.reducer";

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
  comments: commentReducer,
});

export default rootReducer;