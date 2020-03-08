import {
  HANDLE_ERROR,
  HANDLE_SUCESS,
  CLOSE_HANDLE,
  HANDLE_DELETE_FOLDER
} from "./types";
import axios from "axios";

export const isSuccess = message => dispatch => {
  dispatch({
    type: HANDLE_SUCESS,
    payload: message
  });
  setTimeout(() => {
    dispatch({
      type: CLOSE_HANDLE
    });
  }, 5000);
};

export const isError = message => dispatch => {
  dispatch({
    type: HANDLE_ERROR,
    payload: message
  });
  setTimeout(() => {
    dispatch({
      type: CLOSE_HANDLE
    });
  }, 5000);
};

export const handleClose = () => dispatch => {
  dispatch({
    type: CLOSE_HANDLE
  });
};

export const deleteConfirmation = id => dispatch => {
  console.log(id);
  dispatch({
    type: HANDLE_DELETE_FOLDER,
    payload: id
  });
};

export const deleteAllNotes = folder_id => dispatch => {
  console.log(folder_id);
  axios.delete(`/api/note/delete/all/${folder_id}`).then(res => {
    dispatch({
      type: CLOSE_HANDLE
    });
  });
};

export const isFailure = () => dispatch => {};
