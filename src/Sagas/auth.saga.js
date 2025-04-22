import { call, put, takeLatest, all } from "redux-saga/effects";
import axiosInstance from "../api/axios";
import {
  loginStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserMetaStart,
  fetchUserMetaSuccess,
  fetchUserMetaFailure,
} from "../Reducers/auth.reducer";

// Login worker
function* loginWorker(action) {
  try {
    const { email, password } = action.payload;

    const res = yield call(() =>
      axiosInstance.get(`/users?email=${email}`)
    );

    const user = res.data[0];

    if (!user) {
      yield put(fetchUsersFailure("User not found"));
      return;
    }

    if (password !== "1234") {
      yield put(fetchUsersFailure("Invalid password"));
      return;
    }

    yield put(fetchUsersSuccess(user));
    localStorage.setItem("currentUser", JSON.stringify(user));
  } catch (error) {
    yield put(fetchUsersFailure("Login failed"));
  }
}

// UserMeta worker
function* fetchUserMetaWorker() {
  try {
    const res = yield call(() =>
      axiosInstance.get("/users")
    );

    const meta = res.data.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
    }));

    yield put(fetchUserMetaSuccess(meta));
  } catch (error) {
    yield put(fetchUserMetaFailure("Failed to load user metadata"));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(loginStart.type, loginWorker),
    takeLatest(fetchUserMetaStart.type, fetchUserMetaWorker),
  ]);
}
