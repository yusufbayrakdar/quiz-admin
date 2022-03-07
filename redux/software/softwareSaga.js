import { call, takeEvery } from "redux-saga/effects";
import * as $ from "../actionTypes";
import Api from "../../services/Api";
import { showErrorMessage, showSuccessMessage } from "../../utils";

const trySyncSearchesSaga = function* () {
  try {
    yield call(Api.syncSearches);

    showSuccessMessage("Searches are synced");
  } catch (error) {
    showErrorMessage(error);
  }
};

export default function* shapeSaga() {
  yield takeEvery($.SYNC_SEARCHES, trySyncSearchesSaga);
}
