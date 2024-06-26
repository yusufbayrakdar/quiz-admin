import { put, call, takeLatest } from "redux-saga/effects";
import * as $ from "../actionTypes";
import Api from "../../services/Api";
import { $A, showErrorMessage, showSuccessMessage } from "../../utils";

const tryGetShapesSaga = function* ({ payload }) {
  try {
    const putAction = payload.action;
    delete payload.action;
    const { data } = yield call(Api.getShapes, payload);
    const {
      docs: shapes,
      totalDocs: totalShapes,
      nextPage: nextPageShapes,
      hasNextPage: hasNextPageShapes,
    } = data;

    yield put(
      $A(putAction, {
        shapes,
        totalShapes,
        nextPageShapes,
        hasNextPageShapes,
      })
    );
  } catch (error) {
    yield put($A($.ADD_SHAPES, []));
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
  } catch (error) {}
};

const tryGetQuestionListSaga = function* ({ payload }) {
  try {
    const { data } = yield call(Api.getQuestionList, payload);
    const { docs, totalDocs } = data;

    yield put(
      $A($.GET_QUESTION_LIST_FINISHED, {
        questionList: docs,
        totalQuestions: totalDocs,
      })
    );
  } catch (error) {
    yield put(
      $A($.GET_QUESTION_LIST_FINISHED, { questionList: [], totalQuestions: 0 })
    );
  }
};

const tryCreateQuestionSaga = function* ({ payload }) {
  try {
    yield call(Api.createQuestion, payload);

    yield put($A($.CREATE_QUESTION_FINISHED));
    showSuccessMessage("Soru başarıyla oluşturuldu");
  } catch (error) {
    yield put($A($.CREATE_QUESTION_FINISHED));
  }
};

const tryUpdateQuestionSaga = function* ({ payload }) {
  try {
    yield call(Api.updateQuestion, payload);

    yield put($A($.UPDATE_QUESTION_FINISHED));
    yield put($A($.GET_QUESTION_DETAIL_REQUEST, payload._id));
  } catch (error) {
    yield put($A($.UPDATE_QUESTION_FINISHED));
    showErrorMessage(error);
  }
};

const tryDeleteQuestionSaga = function* ({ payload }) {
  try {
    yield call(Api.deleteQuestion, payload);

    yield put($A($.GET_QUESTION_LIST_REQUEST));
    yield put($A($.DELETE_QUESTION_FINISHED));
  } catch (error) {
    yield put($A($.GET_QUESTION_LIST_REQUEST));
    yield put($A($.DELETE_QUESTION_FINISHED));
  }
};

const tryGetQuestionDetailSaga = function* ({ payload }) {
  try {
    const { data } = yield call(Api.getQuestionDetail, payload);
    yield put($A($.RESET_ACTIVE_QUESTION));

    yield put($A($.GET_QUESTION_DETAIL_FINISHED, data));
  } catch (error) {
    yield put($A($.GET_QUESTION_DETAIL_FINISHED, null));
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
  yield takeLatest($.GET_SHAPES, tryGetShapesSaga);
  yield takeLatest($.GET_QUESTION_CONFIGS_REQUEST, tryGetQuestionConfigsSaga);
  yield takeLatest($.CREATE_QUESTION_REQUEST, tryCreateQuestionSaga);
  yield takeLatest($.GET_QUESTION_LIST_REQUEST, tryGetQuestionListSaga);
  yield takeLatest($.DELETE_QUESTION_REQUEST, tryDeleteQuestionSaga);
  yield takeLatest($.GET_QUESTION_DETAIL_REQUEST, tryGetQuestionDetailSaga);
  yield takeLatest($.UPDATE_QUESTION_REQUEST, tryUpdateQuestionSaga);
  yield takeLatest($.CREATE_DURATION_REQUEST, tryCreateDurationSaga);
  yield takeLatest($.CREATE_CATEGORY_REQUEST, tryCreateCategorySaga);
  yield takeLatest($.CREATE_GRADE_REQUEST, tryCreateGradeSaga);
  yield takeLatest($.ACTIVATE_DURATION, tryActivateDurationSaga);
  yield takeLatest($.DEACTIVATE_DURATION, tryDeactivateDurationSaga);
  yield takeLatest($.ACTIVATE_CATEGORY, tryActivateCategorySaga);
  yield takeLatest($.DEACTIVATE_CATEGORY, tryDeactivateCategorySaga);
  yield takeLatest($.ACTIVATE_GRADE, tryActivateGradeSaga);
  yield takeLatest($.DEACTIVATE_GRADE, tryDeactivateGradeSaga);
}
