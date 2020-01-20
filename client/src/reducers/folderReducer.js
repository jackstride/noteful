import {
    FOLDER_SUCCESS, FOLDER_LOADED
} from '../actions/types';


const initalState = {
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
          console.log(action.payload)
          return {
            ...state,
            data: action.payload,
          }
      default:
          return state;
    }
  };
  


