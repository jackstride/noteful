import axios from "axios";
import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  NOTE_LOADED,
  SINGLE_NOTE,
  DELETE_NOTE_BY_FOLDER,
  CHANGE_FOLDER,
  CLEAR_NOTE,
  SORT_NOTE
} from "../actions/types";

const instance = axios.create({
  withCredentials: true
});

//Notes by folder id
export const getNotes = id => dispatch => {
  instance.get(process.env.REACT_APP_ENDPOINT + `/note/all/${id}`).then(res => {
    dispatch({
      type: NOTE_LOADED,
      payload: res.data
    });
  });
};

export const addNote = values => dispatch => {
  instance
    .post(process.env.REACT_APP_ENDPOINT + `/note/add`, values)
    .then(res => {
      dispatch({
        type: ADD_NOTE,
        payload: res.data.note
      });
    });
};

export const editNote = (values, passType = EDIT_NOTE) => dispatch => {
  instance
    .patch(process.env.REACT_APP_ENDPOINT + `/note/edit/${values._id}`, values)
    .then(res => {
      dispatch({
        type: passType,
        payload: values
      });
    });
};

export const getNoteById = _id => dispatch => {
  instance.get(process.env.REACT_APP_ENDPOINT + `/note/${_id}`).then(res => {
    dispatch({
      type: SINGLE_NOTE,
      payload: res.data.note
    });
  });
};

export const removeNote = _id => dispatch => {
  instance
    .delete(process.env.REACT_APP_ENDPOINT + `/note/delete/${_id}`)
    .then(res => {
      dispatch({
        type: DELETE_NOTE,
        payload: _id
      });
    });
};

export const removeAllByFolderId = folder_id => dispatch => {
  instance
    .delete(process.env.REACT_APP_ENDPOINT + `/note/delete/all/${folder_id}`)
    .then(res => {
      dispatch({
        type: DELETE_NOTE_BY_FOLDER,
        payload: folder_id
      });
    });
};

export const sortNotes = folder_id => dispatch => {
  dispatch({
    type: SORT_NOTE,
    payload: folder_id
  });
};

export const clearValues = () => dispatch => {
  dispatch({
    type: CLEAR_NOTE
  });
};
