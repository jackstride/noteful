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
} from "../actions/types";
const initalState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  url: null
};
export default (state = initalState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,
        url: action.payload
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
    return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
    }
    case GETTING_URL:
      return {
        ...state,
        url: action.payload,
      }
    default:
        return state;
  }
};
