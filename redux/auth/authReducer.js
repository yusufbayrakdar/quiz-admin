import * as $ from "../actionTypes";

const initialState = {
  loggedIn: false,
  staff: null,
  loginInProgress: false,
  autoLoginInLoading: false,
  staffInfoVisible: false,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case $.LOGIN_REQUEST:
      return { ...state, loginInProgress: true };

    case $.LOGIN_SUCCESS:
      return {
        ...state,
        loginInProgress: false,
        staff: payload,
        loggedIn: true,
      };

    case $.LOGIN_FAILURE:
      return { ...state, loginInProgress: false, loggedIn: false, staff: null };

    case $.AUTO_LOGIN_REQUEST:
      return { ...state, autoLoginInLoading: true };

    case $.AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        autoLoginInLoading: false,
        staff: payload,
        loggedIn: true,
      };

    case $.AUTO_LOGIN_FAILURE:
      return {
        ...state,
        autoLoginInLoading: false,
        loggedIn: false,
        staff: null,
      };

    case $.LOGOUT_REQUEST:
      return {
        ...state,
        autoLoginInLoading: false,
        loggedIn: false,
        loginInProgress: false,
        staff: null,
      };

    default:
      return state;
  }
}
