import { HANDLE_ERROR, HANDLE_SUCESS, CLOSE_HANDLE } from "./types";

export const isSuccess = message => dispatch => {
  dispatch({
    type: HANDLE_SUCESS,
    payload: message
  });
  setTimeout(() => {
    dispatch({
      type: CLOSE_HANDLE
    });
  }, 5000);
};

export const handleClose = () => dispatch => {
  dispatch({
    type: CLOSE_HANDLE
  });
};

export const isFailure = () => dispatch => {};
