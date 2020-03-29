import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  NOTE_LOADED,
  SINGLE_NOTE,
  DELETE_NOTE_BY_FOLDER,
  CHANGE_FOLDER,
  CLEAR_NOTE,
  SORT_NOTE,
  TOGGLE_ADD_NOTE
} from "../actions/types";
const initalState = {
  user_id: null,
  folder_id: null,
  body_Data: null,
  noteData: [],
  sortData: [],
  singleNoteData: [],
  isOpen: false
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
        noteData: state.noteData.filter(note => note._id !== action.payload)
      };
    case EDIT_NOTE:
      return {
        ...state,
        noteData: state.noteData.map(data =>
          data._id === action.payload._id
            ? { ...data, note_title: action.payload.note_title }
            : data
        )
      };
    case CHANGE_FOLDER:
      return {
        ...state,
        noteData: state.noteData.map(data =>
          data._id === action.payload._id
            ? { ...data, folder_id: action.payload.folder_id }
            : data
        )
      };
    case DELETE_NOTE_BY_FOLDER:
      return {
        ...state,
        noteData: state.noteData.filter(
          note => note.folder_id !== action.payload
        )
      };
    case CLEAR_NOTE:
      return {
        ...state,
        singleNoteData: []
      };
    case SORT_NOTE:
      return {
        ...state,
        sortData: state.noteData.filter(
          item => item.folder_id === action.payload
        )
      };
    case TOGGLE_ADD_NOTE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
};
