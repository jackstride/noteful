import axios from "axios";

import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  GET_TASKS,
  TOGGLE_ADD_TASK,
  UPDATE_TASK,
} from "./types";

const instance = axios.create({
  withCredentials: true,
});

instance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

// Load all tasks from the user
// Requires user ID
export const loadTasks = (id) => (dispatch) => {
  instance
    .get(process.env.REACT_APP_ENDPOINT + `/getTasks/${id}`)
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data.tasks,
      });
    });
};

// Add tasks
// Require task name and user id

export const addTask = (values) => (dispatch) => {
  instance
    .post(process.env.REACT_APP_ENDPOINT + "/addTask", values)
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADD_TASK,
        payload: res.data.task,
      });
    })
    .catch((err) => console.log(err));
};

//Toggle taks completed or not
export const toggleTask = (id) => (dispatch) => {
  instance
    .patch(process.env.REACT_APP_ENDPOINT + `/editcomplete/${id}`)
    .then((res) => {
      dispatch({
        type: TOGGLE_TASK,
        payload: { id: id, isCompleted: res.data.isCompleted },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete task
// Requires task id

export const removeTask = (id) => (dispatch) => {
  instance
    .delete(process.env.REACT_APP_ENDPOINT + `/deletetask/${id}`)
    .then((res) => {
      dispatch({
        type: REMOVE_TASK,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// Toggle open tasks

export const toggleOpenTask = () => (dispatch) => {
  dispatch({
    type: TOGGLE_ADD_TASK,
  });
};

export const editTask = (values, passType = UPDATE_TASK) => (dispatch) => {
  instance
    .put(process.env.REACT_APP_ENDPOINT + "/task/update", values)
    .then((res) => {
      dispatch({
        type: passType,
        payload: { data: res.data.result, values },
      });
    });
};
