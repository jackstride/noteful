import {
  FOLDER_SUCCESS,
  FOLDER_LOADED,
  REMOVE_FOLDER,
  TOGGLE_OPEN,
  UPDATE_FOLDER,
  UPDATE_FOLDER_COLOR
} from "../actions/types";

const initalState = {
  isOpen: false,
  user_id: null,
  name: null,
  data: null
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
      };
    case TOGGLE_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case UPDATE_FOLDER:
      console.log(action.payload);
      return {
        ...state,
        data: state.data.map(data =>
          data._id === action.payload._id
            ? { ...data, folder_name: action.payload.values.folder_name }
            : data
        )
      };
    case UPDATE_FOLDER_COLOR:
      return {
        ...state,
        data: state.data.map(data =>
          data._id === action.payload._id
            ? { ...data, folder_color: action.payload.values.folder_color }
            : data
        )
      };
    default:
      return state;
  }
};
