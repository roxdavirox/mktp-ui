import { SET_PRICE_RANGE_ID } from "../actions/prices.actions";

const initialState = {
  idPriceRange: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRICE_RANGE_ID: {
      const { idPriceRange } = action.playload;

      return {
        ...state,
        idPriceRange
      };
    }

    default:
      return { ...state };
  }
}
