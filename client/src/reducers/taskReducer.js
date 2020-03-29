import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  GET_TASKS,
  TOGGLE_ADD_TASK,
  UPDATE_TASK,
  UPDATE_TASK_DATE
} from "../actions/types";

const initalState = {
  dataRecieved: false,
  taskData: [],
  isOpen: null
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
        taskData: state.taskData.map(task =>
          task._id === action.payload.id
            ? { ...task, isCompleted: action.payload.isCompleted }
            : task
        )
      };
    case GET_TASKS:
      return {
        dataRecieved: true,
        taskData: action.payload
      };
    case TOGGLE_ADD_TASK:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case UPDATE_TASK:
      return {
        ...state,
        taskData: state.taskData.map(data =>
          data._id === action.payload.values._id
            ? { ...data, task_name: action.payload.values.task_name }
            : data
        )
      };
    case UPDATE_TASK_DATE:
      return {
        taskData: state.taskData.map(data =>
          data._id === action.payload.data._id
            ? { ...data, due_date: action.payload.data.due_date }
            : data
        )
      };
    default:
      return state;
  }
};
