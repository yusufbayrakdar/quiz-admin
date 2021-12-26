import { put, call, takeEvery } from "redux-saga/effects";

import * as $ from "../actionTypes";
import Api from "../../services/Api";
import { $A, showErrorMessage } from "../../utils";

const tryGetQuestionsSaga = function* ({ payload }) {
  try {
    const { data } = yield call(Api.getQuestions, payload);
    const { docs: questions, totalDocs: totalQuestions } = data;

    yield put($A($.SET_QUESTIONS, { questions, totalQuestions }));
  } catch (error) {
    yield put($A($.SET_QUESTIONS, []));
    showErrorMessage("Could not get questions");
  }
};

export default function* questionSaga() {
  yield takeEvery($.GET_QUESTIONS, tryGetQuestionsSaga);
}
