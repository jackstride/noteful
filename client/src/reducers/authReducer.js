import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

const initalState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case USER_LOADING:
      console.log("loading")
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,
      };
    case USER_LOADED:
      console.log("user Loaded")
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
        console.log("reg/login")
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
          console.log("fail")
    return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
    }
    default:
        return state;
  }
};
