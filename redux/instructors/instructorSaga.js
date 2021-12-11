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

export default function* instructorSaga() {
  yield takeEvery($.GET_INSTRUCTORS, tryGetInstructorsSaga);
}
