import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//RETURN ERRORS
export const returnErrors = (message, status) => {
  return {
    type: GET_ERRORS,
    payload: message
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
