import axios from "axios";
import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  SUBMIT_NOTE,
  NOTE_LOADED,
  SINGLE_NOTE
} from "../actions/types";

//Notes by folder id
export const getNotes = id => dispatch => {
  axios.get(`/api/note/all/${id}`).then(res => {
    dispatch({
      type: NOTE_LOADED,
      payload: res.data
    });
  });
};

export const addNote = values => dispatch => {
  axios.post(`/api/note/add`, values).then(res => {
    dispatch({
      type: ADD_NOTE,
      payload: res.data.note
    });
  });
};

export const editNote = values => dispatch => {
  console.log(values);
  axios.patch(`/api/note/edit/${values._id}`, values).then(res => {
    dispatch({
      type: EDIT_NOTE
    });
  });
};

export const getNoteById = _id => dispatch => {
  axios.get(`/api/note/${_id}`).then(res => {
    dispatch({
      type: SINGLE_NOTE,
      payload: res.data.note
    });
  });
};

export const removeNote = _id => dispatch => {
  axios.delete(`/api/note/delete/${_id}`).then(res => {
    console.log(res);
    dispatch({
      type: DELETE_NOTE,
      payload: _id
    });
  });
};
