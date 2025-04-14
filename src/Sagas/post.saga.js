import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} from "../Reducers/post.reducer";

function* fetchPostsWorker() {
  try {
    const response = yield call(() =>
      axios.get("https://jsonplaceholder.typicode.com/posts")
    );
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* createPostWorker(action) {
  try {
    const response = yield call(() =>
      axios.post("https://jsonplaceholder.typicode.com/posts", action.payload)
    );
    yield put(createPostSuccess(response.data));
  } catch (error) {
    yield put(createPostFailure(error.message));
  }
}

function* deletePostWorker(action) {
  try {
    const postId = action.payload;
    yield call(() =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      })
    );
    yield put(deletePostSuccess(postId));
  } catch (error) {
    yield put(deletePostFailure(error.message));
  }
}

function* postSaga() {
  yield takeLatest(fetchPostsStart.type, fetchPostsWorker);
  yield takeLatest(createPostStart.type, createPostWorker);
  yield takeLatest(deletePostStart.type, deletePostWorker);
}

export default postSaga;
