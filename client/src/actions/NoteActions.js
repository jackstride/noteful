import axios from "axios";
import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  SUBMIT_NOTE,
  NOTE_LOADED
} from "../actions/types";

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
      type: ADD_NOTE
    });
  });
};

export const editNote = values => dispatch => {
  axios.patch(`/api/note/edit/${values._id}`, values).then(res => {
    dispatch({
      type: EDIT_NOTE
    });
  });
};
