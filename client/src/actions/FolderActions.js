import axios from "axios";

import { FOLDER_SUCCESS, FOLDER_LOADED, FOLDER_DELETE } from "./types";

//Add folder

export const addFolder = folder_name => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post("api/addFolder", folder_name)
    .then(res =>
      dispatch({
        type: FOLDER_SUCCESS,
        payload: folder_name
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const getFolder = id => dispatch => {
  axios
    .get(`/api/folders/${id}`)
    .then(res =>
      dispatch({
        type: FOLDER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const deleteFolder = id => dispatch => {
  axios
    .delete(`/api/folders/${id}`)
    .then(res =>
      dispatch({
        type: FOLDER_DELETE,
        payload: res
      })
    )
    .catch(err => {
      console.log(err);
    });
};
