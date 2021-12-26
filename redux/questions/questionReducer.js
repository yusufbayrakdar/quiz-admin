import * as $ from "../actionTypes";

const initialState = {
  questions: [],
  totalQuestions: 0,
  questionsLoading: false,
  resetForm: false,
};

export default function questionReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case $.GET_QUESTIONS:
      return {
        ...state,
        questionsLoading: true,
      };
    case $.SET_QUESTIONS:
      return {
        ...state,
        questions: payload.questions,
        totalQuestions: payload.totalQuestions,
        questionsLoading: false,
      };
    default:
      return state;
  }
}
