import axios from "axios";

import { ADD_TASK, REMOVE_TASK, TOGGLE_TASK, GET_TASKS, TOGGLE_ADD_TASK } from "./types";

// Load all tasks from the user
// Requires user ID
export const loadTasks = id => dispatch => {
  axios.get(`api/getTasks/${id}`).then(res => {
    dispatch({
      type: GET_TASKS,
      payload: res.data.tasks
    });
  });
};

// Add tasks
// Require task name and user id

export const addTask = values => dispatch => {
  axios
    .post("/api/addTask", values)
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_TASK,
        payload: res.data.task
      });
    })
    .catch(err => console.log(err));
};


//Toggle taks completed or not
export const toggleTask = id => dispatch => {
  axios
    .patch(`api/editcomplete/${id}`)
    .then(res => {
      dispatch({
        type: TOGGLE_TASK,
        payload: { id: id,
        isCompleted: res.data.isCompleted }
      });
    })
    .catch(err => {
      console.log(err);
    });
};


// Delete task
// Requires task id

export const removeTask = id => dispatch => {
  axios.delete(`/api/deletetask/${id}`)
  .then(res => {
    dispatch({
      type: REMOVE_TASK,
      payload: id,
    })
  })
  .catch(err=>console.log(err))
};



// Toggle open tasks

export const toggleOpenTask = () => dispatch => {
  dispatch({
    type: TOGGLE_ADD_TASK,
  })
}