import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import * as $ from "../actionTypes";
import Api from "../../services/Api";
import { $A, showErrorMessage, TOKEN } from "../../utils";
import router from "next/router";

const tryLoginSaga = function* ({ payload }) {
  try {
    localStorage.setItem(TOKEN, "");
    const { data } = yield call(Api.login, payload);
    const { tokenstaff, staff } = data;

    localStorage.setItem(TOKEN, tokenstaff);
    yield put($A($.LOGIN_SUCCESS, staff));
  } catch (error) {
    showErrorMessage("Hatalı giriş");
    yield put($A($.LOGIN_FAILURE));
  }
};

const tryAutoLoginSaga = function* () {
  try {
    const tokenstaff = localStorage.getItem(TOKEN);
    if (tokenstaff) {
      const { data } = yield call(Api.autoLogin);
      yield put($A($.AUTO_LOGIN_SUCCESS, data));
    } else {
      router.push("/signin");
      yield put($A($.AUTO_LOGIN_FAILURE));
    }
  } catch {
    router.push("/signin");
    yield put($A($.AUTO_LOGIN_FAILURE));
  }
};

const tryLogoutSaga = function () {
  try {
    localStorage.setItem(TOKEN, "");
    router.push("/signin");
  } catch {}
};

export default function* authSaga() {
  yield takeEvery($.LOGIN_REQUEST, tryLoginSaga);
  yield takeEvery($.AUTO_LOGIN_REQUEST, tryAutoLoginSaga);
  yield takeLatest($.LOGOUT_REQUEST, tryLogoutSaga);
}
