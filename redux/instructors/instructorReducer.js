import * as $ from "../actionTypes";

const initialState = {
  instructors: [],
  totalInstructors: 0,
  instructorsLoading: false,
};

export default function rendezvousReducer(
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
    default:
      return state;
  }
}
