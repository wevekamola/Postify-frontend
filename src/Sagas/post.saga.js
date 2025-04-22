import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../api/axios";
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
  fetchPostByIdStart,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
} from "../Reducers/post.reducer";

function* fetchPostsWorker() {
  try {
    const response = yield call(() => axiosInstance.get("/posts"));
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* createPostWorker(action) {
  try {
    const response = yield call(() =>
      axiosInstance.post("/posts", action.payload)
    );
    yield put(createPostSuccess(response.data));
  } catch (error) {
    yield put(createPostFailure(error.message));
  }
}

function* deletePostWorker(action) {
  try {
    const postId = action.payload;
    yield call(() => axiosInstance.delete(`/posts/${postId}`));
    yield put(deletePostSuccess(postId));
  } catch (error) {
    yield put(deletePostFailure(error.message));
  }
}

function* fetchPostByIdWorker(action) {
  try {
    const response = yield call(() =>
      axiosInstance.get(`/posts/${action.payload}`)
    );
    yield put(fetchPostByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchPostByIdFailure(error.message));
  }
}

function* postSaga() {
  yield takeLatest(fetchPostsStart.type, fetchPostsWorker);
  yield takeLatest(createPostStart.type, createPostWorker);
  yield takeLatest(deletePostStart.type, deletePostWorker);
  yield takeLatest(fetchPostByIdStart.type, fetchPostByIdWorker);
}

export default postSaga;