import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GETTING_URL,
  FORGOT_SUCCESS,
  RESET_AUTH,
} from "../actions/types";
const initalState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  url: null,
  redirect: false,
  forgetRes: false,
};
export default (state = initalState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        redirect: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        isAuthenticated: false,
        isLoading: false,
        redirect: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        redirect: false,
      };
    case GETTING_URL:
      return {
        ...state,
        url: action.payload,
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        forgetRes: true,
      };
    case RESET_AUTH:
      return {
        ...state,
        forgetRes: false,
      };
    default:
      return state;
  }
};
