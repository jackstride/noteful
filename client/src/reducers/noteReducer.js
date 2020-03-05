import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  SUBMIT_NOTE,
  NOTE_LOADED,
  SINGLE_NOTE
} from "../actions/types";
const initalState = {
  user_id: null,
  folder_id: null,
  body_Data: null,
  noteData: [],
  singleNoteData: []
};
export default (state = initalState, action) => {
  switch (action.type) {
    case NOTE_LOADED:
      return {
        ...state,
        noteData: action.payload.notes
      };
    case ADD_NOTE:
      return {
        ...state,
        noteData: [...state.noteData, action.payload]
      };
    case SINGLE_NOTE:
      return {
        ...state,
        singleNoteData: action.payload
      };
    case DELETE_NOTE:
      return {
        ...state,
        noteData: state.noteData.filter(note => note._id != action.payload)
      };

    default:
      return state;
  }
};