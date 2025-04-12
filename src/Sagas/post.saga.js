import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from "../Reducers/post.reducer";

function* fetchPostsWorker() {
  try {
    const response = yield call(() =>
      axios.get("https://jsonplaceholder.typicode.com/posts")
    );
    yield put({ type: FETCH_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_POSTS_FAILURE, payload: error.message });
  }
}

function* postSaga() {
  yield takeLatest(FETCH_POSTS_START, fetchPostsWorker);
}

export default postSaga;
