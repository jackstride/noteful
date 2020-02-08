import { FOLDER_SUCCESS, FOLDER_LOADED, REMOVE_FOLDER, TOGGLE_OPEN } from "../actions/types";

const initalState = {
  isOpen: false,
  user_id: null,
  name: null,
  data: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FOLDER_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data]
      };
    case FOLDER_LOADED:
      return {
        ...state,
        data: action.payload
      };
    case REMOVE_FOLDER:
      return {
        ...state,
        data: state.data.filter(data => data._id !== action.payload)
      }
      case TOGGLE_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    default:
      return state;
  }
};
