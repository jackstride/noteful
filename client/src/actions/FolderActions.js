import axios from "axios";

import { FOLDER_SUCCESS, FOLDER_LOADED, REMOVE_FOLDER } from "./types";

export const addFolder = values => dispatch => {
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // };
  axios
    .post("api/addFolder", values)
    .then(res => {
      console.log(res);
      dispatch({
        type: FOLDER_SUCCESS,
        payload: res.data.folder
      })
    }
    )
    .catch(err => {
      console.log(err);
    });
};

export const getFolder = id => dispatch => {
  axios
    .get(`api/folders/${id}`)
    .then(res => {
      dispatch({
        type: FOLDER_LOADED,
        payload: res.data
      })
    }
    )
    .catch(err => {
      console.log(err);
    });
};

export const removeFolder = id => dispatch => {
   axios.delete(`api/folders/${id}`, {data: {id: id}}) .then(res => {
        dispatch({
        type: REMOVE_FOLDER,
        payload: id
      })
    })
  
    };


// export const deleteFolder = (id) => dispatch => {
//   axios.delete(`api/folders/${id}`)
//     .then(res =>
//       dispatch({
//         type: FOLDER_DELETE,
//         payload: id
//       })
//     )
//     .catch(err => console.log(err));
// };