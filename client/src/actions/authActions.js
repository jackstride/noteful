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
    .get(`${process.env.REACT_APP_ENDPOINT}/dashboard`)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      if (err.message) {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR
        });
      } else {
        throw err;
      }
    });
};

export const register = formValues => dispatch => {
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
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
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
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    withCredentials: true
  }).then(res => {
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
  console.log(process.env.REACT_APP_ENDPOINT);

  axios
    .get(process.env.REACT_APP_ENDPOINT + "/user/logout")
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {});
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
  console.log(formValues);
  axios
    .post(process.env.REACT_APP_ENDPOINT + "/support", formValues)
    .then(res => {
      dispatch({
        type: SUPPORT_SUCCESS
      });
    });
};
