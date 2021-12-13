import { put, call, takeEvery } from "redux-saga/effects";
import * as $ from "../actionTypes";
import Api from "../../services/Api";
import { $A, showErrorMessage, showSuccessMessage } from "../../utils";

const tryGetInstructorsSaga = function* ({ payload }) {
  try {
    const { data } = yield call(Api.getInstructors, payload);
    const { docs: instructors, totalDocs: totalInstructors } = data;

    yield put($A($.SET_INSTRUCTORS, { instructors, totalInstructors }));
  } catch (error) {
    yield put($A($.SET_INSTRUCTORS, []));
    showErrorMessage("Could not get instructors");
  }
};

const tryGetInstructorDetailSaga = function* ({ payload }) {
  try {
    const { data } = yield call(Api.getInstructorDetail, payload);

    yield put($A($.SET_INSTRUCTOR_DETAIL, data));
  } catch (error) {
    yield put($A($.SET_INSTRUCTOR_DETAIL, null));
    showErrorMessage("Could not get instructor");
  }
};

export default function* instructorSaga() {
  yield takeEvery($.GET_INSTRUCTORS, tryGetInstructorsSaga);
  yield takeEvery($.GET_INSTRUCTOR_DETAIL, tryGetInstructorDetailSaga);
}
