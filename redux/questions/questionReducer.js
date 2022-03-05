import * as $ from "../actionTypes";

const initialState = {
  questions: [],
  durations: [],
  categories: [],
  grades: [],
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

    case $.GET_QUESTION_CONFIGS_FINISHED:
      return {
        ...state,
        categories: payload.categories,
        durations: payload.durations,
        grades: payload.grades,
      };

    default:
      return state;
  }
}
