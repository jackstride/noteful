import axios from 'axios';
import {returnErrors} from './errorActions'

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

  export const loadUser = () => (dispatch,getState) => {
      //User Loading
      dispatch({
          type: USER_LOADING
      })

      //Get token from loca storage
      const token = getState().auth.token;
      //Headers
      const config = {
          headers: {
              "Content-type": "application/json"
          }
      }

      // If token, add to heaers
      if(token) {
          config.headers['x-auth-token'] = token;
      }
      axios.get('/test', config)
      .then(res => dispatch({
          type: USER_LOADED,
          payload: res.data
      }))
      .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status))
          dispatch({
              type: AUTH_ERROR,
          })
      })

  }