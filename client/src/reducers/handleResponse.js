import { HANDLE_ERROR, HANDLE_SUCESS, CLOSE_HANDLE } from "../actions/types";

const initialState = {
  show: false,
  isPositive: false,
  message: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SUCESS:
      return {
        show: true,
        isPositive: true,
        message: action.payload
      };
    case CLOSE_HANDLE:
      return {
        show: false
      };
    default:
      return state;
  }
}
