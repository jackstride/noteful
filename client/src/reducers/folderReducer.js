import { FOLDER_SUCCESS, FOLDER_LOADED, REMOVE_FOLDER } from "../actions/types";

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
      return {
        ...state,
        data: action.payload
      };
    case REMOVE_FOLDER:
      console.log("REDUCER REMOVED")
      return {
        ...state,
        data: state.data.filter(data => data._id !== action.payload)
      }
    default:
      return state;
  }
};
