import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} from "../Reducers/auth.reducer";

// Worker: Fetch all users from JSONPlaceholder
function* fetchUsersWorker() {
  try {
    const response = yield call(() =>
      axios.get("https://jsonplaceholder.typicode.com/users")
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

// Worker: Login (match email and password)
function* loginWorker(action) {
  try {
    const { email, password } = action.payload;
    const users = yield select((state) => state.auth.users);

    const user = users.find((u) => u.email === email);

    if (!user) {
      yield put(loginFailure("User not found."));
      return;
    }

    if (password !== "1234") {
      yield put(loginFailure("Incorrect password."));
      return;
    }

    yield put(loginSuccess(user));
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    yield put(loginFailure("Something went wrong."));
  }
}

// Watchers
function* authSaga() {
  yield takeLatest(fetchUsersStart.type, fetchUsersWorker);
  yield takeLatest(loginStart.type, loginWorker);
}

export default authSaga;
