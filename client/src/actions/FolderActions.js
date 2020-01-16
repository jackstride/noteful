import axios from "axios";

import { FOLDER_SUCCESS } from "./types";

//Add folder

export const addFolder = name => dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .post("api/addFolder", name)
      .then(res =>
        dispatch({
          type: FOLDER_SUCCESS,
          payload: res.data
        }))
      .catch(err => {
        console.log(err)
        })
  };




  export const getFolder = id => dispatch => {
  
    axios.get(`/api/folders/${id}`)
    .then(res => {
      console.log(res);
    })
  }