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
    showErrorMessage("Sorular getirilemedi");
  }
};

const tryCreateDurationSaga = function* ({ payload }) {
  try {
    yield call(Api.createDuration, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Süre oluşturulamadı");
  }
};

const tryCreateCategorySaga = function* ({ payload }) {
  try {
    yield call(Api.createCategory, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Kategori oluşturulamadı");
  }
};

const tryCreateGradeSaga = function* ({ payload }) {
  try {
    yield call(Api.createGrade, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Sınıf oluşturulamadı");
  }
};

const tryGetQuestionConfigsSaga = function* () {
  try {
    const { data } = yield call(Api.getQuestionConfigs);
    const { categories, durations, grades } = data;
    let payload = {};
    if (categories.length) payload = { categories };
    if (durations.length) payload = { ...payload, durations };
    if (grades.length) payload = { ...payload, grades };

    yield put($A($.GET_QUESTION_CONFIGS_FINISHED, payload));
  } catch (error) {
    showErrorMessage("Configs getirilemedi");
  }
};

const tryActivateDurationSaga = function* ({ payload }) {
  try {
    yield call(Api.activateDuration, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Süre güncellenemedi");
  }
};

const tryDeactivateDurationSaga = function* ({ payload }) {
  try {
    yield call(Api.deactivateDuration, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Süre güncellenemedi");
  }
};

const tryActivateCategorySaga = function* ({ payload }) {
  try {
    yield call(Api.activateCategory, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Kategori güncellenemedi");
  }
};

const tryDeactivateCategorySaga = function* ({ payload }) {
  try {
    yield call(Api.deactivateCategory, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Kategori güncellenemedi");
  }
};

const tryActivateGradeSaga = function* ({ payload }) {
  try {
    yield call(Api.activateGrade, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Sınıflar güncellenemedi");
  }
};

const tryDeactivateGradeSaga = function* ({ payload }) {
  try {
    yield call(Api.deactivateGrade, payload);

    yield put($A($.GET_QUESTION_CONFIGS_REQUEST));
  } catch (error) {
    showErrorMessage("Sınıflar güncellenemedi");
  }
};

export default function* questionSaga() {
  yield takeEvery($.GET_QUESTIONS, tryGetQuestionsSaga);
  yield takeEvery($.CREATE_DURATION_REQUEST, tryCreateDurationSaga);
  yield takeEvery($.CREATE_CATEGORY_REQUEST, tryCreateCategorySaga);
  yield takeEvery($.CREATE_GRADE_REQUEST, tryCreateGradeSaga);
  yield takeEvery($.GET_QUESTION_CONFIGS_REQUEST, tryGetQuestionConfigsSaga);
  yield takeEvery($.ACTIVATE_DURATION, tryActivateDurationSaga);
  yield takeEvery($.DEACTIVATE_DURATION, tryDeactivateDurationSaga);
  yield takeEvery($.ACTIVATE_CATEGORY, tryActivateCategorySaga);
  yield takeEvery($.DEACTIVATE_CATEGORY, tryDeactivateCategorySaga);
  yield takeEvery($.ACTIVATE_GRADE, tryActivateGradeSaga);
  yield takeEvery($.DEACTIVATE_GRADE, tryDeactivateGradeSaga);
}
