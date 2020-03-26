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
  GOT_URL,
  USER_UPDATE,
  PASSWORD_UPDATE,
  SUPPORT_SUCCESS
} from "./types";

//Load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get(`${process.env.REACT_APP_ENDPOINT}/dashboard`, {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = formValues => dispatch => {
  console.log(formValues);
  axios
    .post(process.env.REACT_APP_ENDPOINT + "/user/register", formValues)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data.error.message,
          err.response.data.error.status
        )
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const login = formValues => dispatch => {
  axios({
    method: "post",
    url: process.env.REACT_APP_ENDPOINT + "/user/login",
    data: formValues,
    withCredentials: true
  })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data.error.message,
          err.response.data.error.status
        )
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => dispatch => {
  axios
    .get(process.env.REACT_APP_ENDPOINT + "/user/logout", {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const userUpdate = (_id, values) => distpach => {
  console.log(_id, values);
  axios
    .patch(process.env.REACT_APP_ENDPOINT + `/user/update/${_id}`, values)
    .then(res => {
      distpach({
        type: USER_UPDATE,
        payload: values
      });
    });
};

export const supportRequest = formValues => dispatch => {
  axios
    .post(process.env.REACT_APP_ENDPOINT + "/support", formValues, {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: SUPPORT_SUCCESS
      });
    });
};
