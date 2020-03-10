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
  REGISTER_FAIL,
  GETTING_URL,
  GOT_URL
} from "./types";

//Load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("/dashboard")
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = formValues => dispatch => {
  axios
    .post("/user/register", formValues)
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

export const login = formValues => dispatch => {
  axios
    .post("/user/login", formValues, {
      withCredentials: true
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    });
  // .catch(err => {
  //   dispatch(returnErrors(err.response.data));
  //   dispatch({
  //     type: LOGIN_FAIL
  //   });
  // });
};

export const logout = () => dispatch => {
  axios
    .get("/user/logout", {}, { withCredentials: true })
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {});
};

export const googleLogin = () => dispatch => {
  axios
    .get("/auth/google", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(res => {
      dispatch({
        type: GETTING_URL,
        payload: res.data
      });
    });
};

export const gotGoogle = () => dispatch => {
  axios.get("/auth/google/callback").then(res => {
    dispatch({
      type: GOT_URL,
      payload: res.data
    });
  });
};
