import { ADD_ENTITIES } from "../app/redux/actions";

const initialState = {
  byId: {},
  allIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { prices }
      } = action.playload;

      const byId = { ...prices };
      const allIds = Object.keys(prices);
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
