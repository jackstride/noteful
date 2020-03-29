import { TOGGLE_DARK } from "../actions/types";

export const toggleDarkMode = value => dispatch => {
  dispatch({
    type: TOGGLE_DARK,
    payload: value
  });
};
