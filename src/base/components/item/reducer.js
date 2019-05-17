import { ADD_ENTITIES } from "base/redux/actions";
import { TOGGLE_OPTION_ITEMS } from "./actions";

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

    case ADD_ENTITIES: {
      const {
        entities: { items }
      } = action.playload;

      const byId = { ...items };
      const allIds = Object.keys(items);
      return {
        ...state,
        byId,
        allIds
      };
    }

    default:
      return state;
  }
}
