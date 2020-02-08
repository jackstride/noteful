import { CONTEXT_MENU_HIDE, CONTEXT_MENU_SHOW } from "../actions/types";

const initialState = {
  show: false,
  location: {
      x: 200,
      y: 200,
  },
  type: null,
  menuArgs: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTEXT_MENU_SHOW:
      console.log(action.payload)
      return {
          ...state,
          show: true,
          ...action.payload,
      };
    case CONTEXT_MENU_HIDE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
