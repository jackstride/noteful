import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// Check token and load user

export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({
    type: USER_LOADING
  });
  
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  // if (token) {
  //   config.headers["x-auth-token"] = token;
  // }
  axios
    .get("/auth", config)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = (formValues) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Create request

//   formValues = JSON.stringify(formValues)
  
  axios
    .post("user/register", formValues)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};



export const login = (formValues) => dispatch => {
  axios
  .post("/user/login", formValues, {withCredentials: true})
  .then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  })
  .catch(err => {
    dispatch(
    returnErrors(err.response.data, err.response.state, 'LOGIN_FAIL')
  )
  dispatch({
    type: LOGIN_FAIL
  })

  });

}