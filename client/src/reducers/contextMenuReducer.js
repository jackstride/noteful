import { CONTEXT_MENU_HIDE, CONTEXT_MENU_SHOW } from "../actions/types";

const initialState = {
  show: false,
  location: {
      x: 0,
      y: 0,
  },
  getType: "",
  menuArgs: undefined,
  name: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTEXT_MENU_SHOW:      
      return {
          show: true,
          location: {
            x: action.payload.x,
            y: action.payload.y,
          },
          getType: action.payload.getType,
          menuArgs: action.payload.args,
          name: action.payload.name,
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
