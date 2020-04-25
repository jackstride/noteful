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
  SUPPORT_SUCCESS,
  FORGOT_SUCCESS,
  RESET_AUTH,
} from "./types";

//Load user
export const loadUser = () => (dispatch, getState) => {
  console.log("this");
  //User Loading

  axios
    .get(`${process.env.REACT_APP_ENDPOINT}/dashboard`, {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const register = (formValues) => (dispatch) => {
  console.log(formValues);
  axios
    .post(process.env.REACT_APP_ENDPOINT + "/user/register", formValues)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.error.message,
          err.response.data.error.status
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const login = (formValues) => (dispatch) => {
  axios({
    method: "post",
    url: process.env.REACT_APP_ENDPOINT + "/user/login",
    data: formValues,
    withCredentials: true,
  })
    .then((res) => {
      // Set short lived token in local storage;
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(
      //   returnErrors(
      //     err.response.data.error.message,
      //     err.response.data.error.status
      //   )
      // );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => (dispatch) => {
  axios
    .get(process.env.REACT_APP_ENDPOINT + "/user/logout", {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res);
      localStorage.removeItem("token");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const userUpdate = (_id, values) => (distpach) => {
  console.log(_id, values);
  axios
    .patch(process.env.REACT_APP_ENDPOINT + `/user/update/${_id}`, values)
    .then((res) => {
      distpach({
        type: USER_UPDATE,
        payload: values,
      });
    });
};

export const supportRequest = (formValues) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_ENDPOINT + "/support", formValues, {
      withCredentials: false,
    })
    .then((res) => {
      dispatch({
        type: SUPPORT_SUCCESS,
      });
    });
};

export const forgotPassword = (value) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_ENDPOINT + "/user/reset", value, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: FORGOT_SUCCESS,
      });
    });
};

export const resetAuth = () => (dispatch) => {
  dispatch({
    type: RESET_AUTH,
  });
};

export const refreshToken = (token) => (dispatch) => {
  token = {
    key: token,
  };
  axios
    .post(process.env.REACT_APP_ENDPOINT + "/user/refresh", token, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    });
};
