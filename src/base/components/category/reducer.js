import { ADD_ENTITIES } from 'base/redux/actions';
import {
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORIES_SUCCESS,
  ADD_SUB_CATEGORY_SUCCESS
} from './actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
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

    case ADD_CATEGORY_SUCCESS: {
      const { category } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [category._id]: category
        },
        allIds: [...state.allIds, category._id]
      };
    }

    case DELETE_CATEGORIES_SUCCESS: {
      const { categoryIds } = action.playload;

      const allIds = state.allIds.filter(id => categoryIds.indexOf(id) === -1);

      const byId = allIds.reduce((ids, id) => {
        return {
          ...ids,
          [id]: {
            ...state.byId[id]
          }
        };
      }, {});

      return {
        ...state,
        byId,
        allIds
      };
    }

    case ADD_SUB_CATEGORY_SUCCESS: {
      const { subCategory, categoryId } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [categoryId]: {
            ...state.byId[categoryId],
            subCategories: [
              ...state.byId[categoryId].subCategories,
              subCategory
            ]
          }
        }
      };
    }

    default:
      return state;
  }
}
