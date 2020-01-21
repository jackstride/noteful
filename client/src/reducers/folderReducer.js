import { FOLDER_SUCCESS, FOLDER_LOADED, FOLDER_DELETE } from "../actions/types";

const initalState = {
  user_id: null,
  name: null,
  data: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FOLDER_SUCCESS:
      console.log("folder added");
      return {
        ...state,
        data: [action.payload, ...state.data]
      };
    case FOLDER_LOADED:
      console.log("GOT FOLDERS")
      return {
        ...state,
        data: action.payload
      };
      case FOLDER_DELETE:
      console.log("TEST")
      return {
        ...state,
        data: null,
      }
    default:
      return state;
  }
};
