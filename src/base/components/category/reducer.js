import { ADD_ENTITIES } from 'base/redux/actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      return {
        ...state,
        loading: true
      };

    case ADD_ENTITIES: {
      const {
        entities: { categories }
      } = action.playload;

      if (!categories) return state;

      const byId = { ...categories };
      const allIds = Object.keys(categories);
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
