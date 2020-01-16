import axios from 'axios';

import {
    FOLDER_SUCCESS
} from './types';




//Add folder
export const addFolder = name => dispatch => {
    console.log("called")
axios
.post('/api/addFolder', name)
.then(res => {
    dispatch({
        type: FOLDER_SUCCESS,
        payload: res.data,
    })
.catch(err => {
    console.log(err);
})
})
} 











// export const register = formValues => dispatch => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     };
  
//     axios
//       .post("user/register", formValues)
//       .then(res =>
//         dispatch({
//           type: REGISTER_SUCCESS,
//           payload: res.data
//         })
//       )
//       .catch(err => {
//         dispatch(
//           returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
//         );
//         dispatch({
//           type: REGISTER_FAIL
//         });
//       });
//   };