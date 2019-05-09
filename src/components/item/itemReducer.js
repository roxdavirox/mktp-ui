import { TOGGLE_OPTION_ITEMS } from "./itemActions";

const initialState = {
  optionId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OPTION_ITEMS:
      return {
        ...state,
        optionId: action.playload.optionId
      };

    default:
      return state;
  }
}
