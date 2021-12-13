import * as $ from "../actionTypes";

const initialState = {
  students: [],
  totalStudents: 0,
  studentsLoading: false,
};

export default function studentReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case $.GET_STUDENTS:
      return {
        ...state,
        studentsLoading: true,
      };
    case $.SET_STUDENTS:
      return {
        ...state,
        students: payload.students,
        totalStudents: payload.totalStudents,
        studentsLoading: false,
      };
    default:
      return state;
  }
}
