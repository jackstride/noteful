import {
    FODLER_SUCCESS, FOLDER_SUCCESS
} from '../actions/types';


const initalState = {
    user_id: null,
    name: null,
};



export default (state = initalState, action) => {
    switch (action.type) {
      case FOLDER_SUCCESS:
        console.log("adding Folder")
        return {
          ...state,
          data: action.payload,
        };
      default:
          return state;
    }
  };
  


