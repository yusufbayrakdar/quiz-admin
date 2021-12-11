import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import authReducer from "./auth/authReducer";
import authSaga from "./auth/authSaga";

import instructorReducer from "./instructors/instructorReducer";
import instructorSaga from "./instructors/instructorSaga";

const combinedSagas = function* () {
  yield all([authSaga(), instructorSaga()]);
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = compose;
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  instructor: instructorReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export type RootState = ReturnType<typeof rootReducer>;

sagaMiddleware.run(combinedSagas);
