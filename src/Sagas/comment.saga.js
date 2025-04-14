import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} from "../Reducers/comment.reducer";

function* fetchCommentsWorker(action) {
  try {
    const postId = action.payload;
    const response = yield call(() =>
      axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    );
    yield put(fetchCommentsSuccess({ postId, comments: response.data }));
  } catch (error) {
    yield put(fetchCommentsFailure(error.message));
  }
}

function* commentSaga() {
  yield takeLatest(fetchCommentsStart.type, fetchCommentsWorker);
}

export default commentSaga;
