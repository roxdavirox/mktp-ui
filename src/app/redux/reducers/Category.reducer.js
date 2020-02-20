import { ADD_ENTITIES } from '../actions';
import {
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORIES_SUCCESS,
  DELETE_SUB_CATEGORIES_SUCCESS,
  ADD_SUB_CATEGORY_SUCCESS
} from '../actions/Category.actions';
// reducers
const initialState = {
  byId: {},
  allIds: [],
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { categories }
      } = action.payload;

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
      const { category } = action.payload;

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
      const { categoryIds } = action.payload;

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

    case DELETE_SUB_CATEGORIES_SUCCESS: {
      const { subCategoryIds, categoryId } = action.payload;
      const category = state.byId[categoryId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [categoryId]: {
            ...category,
            subCategories: category.subCategories.filter(
              sub => subCategoryIds.indexOf(sub._id) === -1
            )
          }
        }
      };
    }

    case ADD_SUB_CATEGORY_SUCCESS: {
      const { subCategory, categoryId } = action.payload;

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
