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
    console.log(res);
    dispatch({
      type: NOTE_LOADED,
      payload: res.data
    });
  });
};

export const addNote = () => dispatch => {
  console.log("hello");
  let values = {
    user_id: "5de1207c17910f161383256d",
    folder_id: "5e455ed9482cad1847638b2e"
  };
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

export const getNoteById = _id => dispatch => {
  axios.get(`/api/note/${_id}`).then(res => {
    console.log(res);
    dispatch({
      type: SINGLE_NOTE,
      payload: res.data.note
    });
  });
};
