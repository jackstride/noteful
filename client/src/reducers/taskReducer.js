import {
    ADD_TASK,
    REMOVE_TASK,
    TOGGLE_TASK,
    GET_TASKS,
  } from "../actions/types";
  
  const initalState = {
      dataRecieved: false,
      taskData: []
        
    
  };
  
  export default (state = initalState, action) => {
    switch (action.type) {
      case ADD_TASK:
          return {
              ...state,
              taskData: [action.payload, ...state.taskData]
          };
          case REMOVE_TASK:
          return {
              ...state,
              taskData: state.taskData.filter(data => data._id !== action.payload)
          };
          case TOGGLE_TASK:
              // Code taken from https://redux.js.org/basics/example/
          return {
              ...state, 
               taskData: state.taskData.map(task => task._id === action.payload.id ? { ...task, isCompleted: action.payload.isCompleted} : task ),
          };
          case GET_TASKS:
              return {
                  dataRecieved: true,
                  taskData: action.payload,
              }
      default:
          return state;
    }
  };
  