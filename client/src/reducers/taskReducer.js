import {
    ADD_TASK,
    REMOVE_TASK,
    TOGGLE_TASK,
    GET_TASKS,
  } from "../actions/types";
  
  const initalState = {
      id: null,
      isCompleted: false,
        
    
  };
  
  export default (state = initalState, action) => {
    switch (action.type) {
      case ADD_TASK:
          return {
              ...state,
          };
          case REMOVE_TASK:
          return {
              ...state,
          };
          case TOGGLE_TASK:
          return {
              ...state,
          };
          case GET_TASKS:
              return {
                  ...state,
                  taskData: action.payload,
              }
      default:
          return state;
    }
  };
  