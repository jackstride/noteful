import { TOGGLE_DARK } from "../actions/types";

const initalState = {
  isDark: false
};
export default (state = initalState, action) => {
  switch (action.type) {
    case TOGGLE_DARK:
      return {
        ...state,
        isDark: !state.isDark
      };
    default:
      return state;
  }
};
