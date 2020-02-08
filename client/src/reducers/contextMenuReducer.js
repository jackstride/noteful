import { CONTEXT_MENU_HIDE, CONTEXT_MENU_SHOW } from "../actions/types";

const initialState = {
  show: false,
  location: {
      x: 0,
      y: 0,
  },
  type: "",
  menuArgs: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTEXT_MENU_SHOW:
      console.log(action.payload)
      return {
          show: true,
          location: {
            x: action.payload.x,
            y: action.payload.y,
          },
          type: action.payload.getType
      };
    case CONTEXT_MENU_HIDE:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
