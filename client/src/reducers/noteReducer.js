import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  SUBMIT_NOTE,
  NOTE_LOADED
} from "../actions/types";
const initalState = {
  user_id: null,
  folder_id: null,
  body_Data: null,
  noteData: []
};
export default (state = initalState, action) => {
  switch (action.type) {
    case NOTE_LOADED:
      return {
        ...state,
        noteData: action.payload.notes
      };

    default:
      return state;
  }
};
