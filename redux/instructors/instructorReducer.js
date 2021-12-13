import * as $ from "../actionTypes";

const initialState = {
  instructor: null,

  instructors: [],
  totalInstructors: 0,
  instructorsLoading: false,
};

export default function instructorReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case $.GET_INSTRUCTORS:
      return {
        ...state,
        instructorsLoading: true,
      };
    case $.SET_INSTRUCTORS:
      return {
        ...state,
        instructors: payload.instructors,
        totalInstructors: payload.totalInstructors,
        instructorsLoading: false,
      };

    case $.GET_INSTRUCTOR_DETAIL:
      return {
        ...state,
        instructorsLoading: true,
      };
    case $.SET_INSTRUCTOR_DETAIL:
      return {
        ...state,
        instructor: payload,
        instructorsLoading: false,
      };
    default:
      return state;
  }
}
