import {
  HANDLE_ERROR,
  HANDLE_SUCESS,
  CLOSE_HANDLE,
  HANDLE_DELETE_FOLDER
} from "./types";
import { removeFolder } from "./FolderActions";
import { removeAllByFolderId } from "./NoteActions";
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
  dispatch({
    type: HANDLE_DELETE_FOLDER,
    payload: id
  });
};

export const deleteAllNotes = folder_id => dispatch => {
  dispatch(removeAllByFolderId(folder_id));
  dispatch(removeFolder(folder_id));
};

export const isFailure = () => dispatch => {};
