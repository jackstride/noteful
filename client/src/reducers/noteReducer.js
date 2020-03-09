import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  SUBMIT_NOTE,
  NOTE_LOADED,
  SINGLE_NOTE,
  DELETE_NOTE_BY_FOLDER
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
    case EDIT_NOTE:
      console.log(action.payload);
      return {
        ...state,
        noteData: state.noteData.map(data =>
          data._id === action.payload._id
            ? { ...data, note_title: action.payload.note_title }
            : data
        )
      };
    case DELETE_NOTE_BY_FOLDER:
      return {
        ...state,
        noteData: state.noteData.filter(
          note => note.folder_id != action.payload
        )
      };

    default:
      return state;
  }
};
