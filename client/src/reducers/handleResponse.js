import {
  HANDLE_ERROR,
  HANDLE_SUCESS,
  CLOSE_HANDLE,
  HANDLE_DELETE_FOLDER
} from "../actions/types";

const initialState = {
  show: false,
  isPositive: false,
  message: null,
  folder_id: null,
  deleteConfirmation: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SUCESS:
      return {
        show: true,
        isPositive: true,
        message: action.payload
      };
    case HANDLE_ERROR:
      return {
        show: true,
        isPositive: false,
        message: action.payload
      };
    case HANDLE_DELETE_FOLDER:
      return {
        ...state,
        show: true,
        isPositive: false,
        message: "All notes will be deleted inside this folder",
        folder_id: action.payload
      };
    case CLOSE_HANDLE:
      return {
        show: false
      };
    default:
      return state;
  }
}
