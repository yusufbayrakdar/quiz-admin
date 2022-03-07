import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import authReducer from "./auth/authReducer";
import authSaga from "./auth/authSaga";

import instructorReducer from "./instructors/instructorReducer";
import instructorSaga from "./instructors/instructorSaga";

import studentReducer from "./students/studentReducer";
import studentSaga from "./students/studentSaga";

import questionReducer from "./questions/questionReducer";
import questionSaga from "./questions/questionSaga";

import shapeReducer from "./shapes/shapeReducer";
import shapeSaga from "./shapes/shapeSaga";

import softwareSaga from "./software/softwareSaga";

const combinedSagas = function* () {
  yield all([
    authSaga(),
    instructorSaga(),
    studentSaga(),
    questionSaga(),
    shapeSaga(),
    softwareSaga(),
  ]);
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
  student: studentReducer,
  question: questionReducer,
  shape: shapeReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export type RootState = ReturnType<typeof rootReducer>;

sagaMiddleware.run(combinedSagas);
