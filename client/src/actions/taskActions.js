import axios from "axios";

import {
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_TASK,
    GET_TASKS
  } from "./types";



  // Load all tasks from the user
  // Requires user ID
  export const loadTasks = id => dispatch => {
    axios.get(`api/getTasks/${id}`)
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      })
    })
  }





// Add tasks
// Require task name and user id

export const addTask = values => dispatch => {

}





// Delete task
// Requires task id


export const deleteTask = id => dispatch => {



}


