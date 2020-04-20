import axios from "axios";

import {
  FOLDER_SUCCESS,
  FOLDER_LOADED,
  REMOVE_FOLDER,
  TOGGLE_OPEN,
  UPDATE_FOLDER,
  AUTH_ERROR,
} from "./types";

import { isSuccess, isError } from "./ResponseActions";

const instance = axios.create({
  withCredentials: true
});

export const addFolder = values => dispatch => {
  instance
    .post(process.env.REACT_APP_ENDPOINT + "/addFolder", values)
    .then(res => {
      dispatch(isSuccess("Folder Added"));
      dispatch({
        type: FOLDER_SUCCESS,
        payload: res.data.folder
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      })
    });
};

export const getFolder = id => dispatch => {
  instance
    .get(process.env.REACT_APP_ENDPOINT + `/folders/${id}`)
    .then(res => {
      dispatch({
        type: FOLDER_LOADED,
        payload: res.data.folder
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const removeFolder = id => dispatch => {
  instance
    .delete(process.env.REACT_APP_ENDPOINT + `/folders/${id}`, {
      data: { id: id }
    })
    .then(res => {
      dispatch({
        type: REMOVE_FOLDER,
        payload: id
      });
    });
};

export const toggleFolderOpen = () => dispatch => {
  dispatch({
    type: TOGGLE_OPEN
  });
};

export const updateFolder = (
  _id,
  values,
  passType = UPDATE_FOLDER
) => dispatch => {
  instance
    .put(process.env.REACT_APP_ENDPOINT + `/folder/update/${_id}`, values)
    .then(res => {
      dispatch({
        type: passType,
        payload: { values, _id }
      });
    });
};
