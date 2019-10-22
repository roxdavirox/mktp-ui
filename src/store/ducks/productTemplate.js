/* eslint-disable no-console */
import { getEndpoint } from 'helpers/api';

const types = {
  SET_TEMPLATE_NAME: 'SET_TEMPLATE_NAME',
  SET_OPTION: 'SET_OPTION',
  RESET: 'RESET',
  FETCH_TEMPLATE_ITEMS: 'FETCH_TEMPLATE_ITEMS',
  SET_TEMPLATE_ITEMS: 'SET_TEMPLATE_ITEMS',
  SET_CHECKED_ITEM: 'SET_CHECKED_ITEM',
  SET_QUANTITY: 'SET_QUANTITY',
  SET_VALUE_X: 'SET_VALUE_X',
  SET_VALUE_Y: 'SET_VALUE_Y'
};

const INITIAL_STATE = {
  name: '',
  option: '0',
  templateItems: []
};

export const setTemplateName = name => ({
  type: types.SET_TEMPLATE_NAME,
  playload: { name }
});

export const setOption = option => ({
  type: types.SET_OPTION,
  playload: { option }
});

export const resetTemplateState = () => ({ type: types.RESET });

export const fetchTemplateItems = () => ({
  type: types.FETCH_TEMPLATE_ITEMS
});

export const setTemplateItems = templateItems => ({
  type: types.SET_TEMPLATE_ITEMS,
  playload: { templateItems }
});

export const setCheckedItem = (rowIndex, isChecked) => ({
  type: types.SET_CHECKED_ITEM,
  playload: { rowIndex, isChecked }
});

export const setQuantity = (rowIndex, quantity) => ({
  type: types.SET_QUANTITY,
  playload: { rowIndex, quantity }
});

export const setValueX = (rowIndex, valueX) => ({
  type: types.SET_VALUE_X,
  playload: { rowIndex, valueX }
});

export const setValueY = (rowIndex, valueY) => ({
  type: types.SET_VALUE_Y,
  playload: { rowIndex, valueY }
});

// middlewares
export const fetchTemplateItemsMiddleware = ({
  dispatch
}) => next => action => {
  if (action.type === types.FETCH_TEMPLATE_ITEMS) {
    const endpoint = getEndpoint('/items/templates');

    fetch(endpoint)
      .then(res => res.json())
      .then(({ items }) => dispatch(setTemplateItems(items)))
      .catch(error => {
        console.log(`Error on get template items ${error}`);
      });
  }

  next(action);
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_TEMPLATE_NAME: {
      const { name } = action.playload;
      return {
        ...state,
        name
      };
    }

    case types.SET_OPTION: {
      const { option } = action.playload;
      return { ...state, option };
    }

    case types.RESET: {
      return INITIAL_STATE;
    }

    case types.SET_TEMPLATE_ITEMS: {
      const { templateItems } = action.playload;
      return {
        ...state,
        templateItems: templateItems
          .map(templateItem => ({
            size: { x: 0, y: 0 },
            ...templateItem
          }))
          .filter(item => item.priceTableId)
      };
    }

    case types.SET_CHECKED_ITEM: {
      state.templateItems[action.playload.rowIndex].isChecked =
        action.playload.isChecked;
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    case types.SET_QUANTITY: {
      state.templateItems[action.playload.rowIndex].quantity =
        action.playload.quantity;
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    case types.SET_VALUE_X: {
      const { rowIndex, valueX } = action.playload;

      state.templateItems[rowIndex].size.x = valueX;
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    case types.SET_VALUE_Y: {
      const { rowIndex, valueY } = action.playload;

      state.templateItems[rowIndex].size.y = valueY;
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    default:
      return state;
  }
}

//selectors
export const getProductTemplateState = store => store.productTemplates;

export const selectTemplateItems = store =>
  getProductTemplateState(store)
    ? getProductTemplateState(store).templateItems
    : [];

export const selectTemplateName = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).name : '';

export const selectOption = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).option : '0';

export const selectCheckedTemplateItems = store =>
  getProductTemplateState(store)
    ? selectTemplateItems(store).filter(item => item.isChecked)
    : [];

export const selectQuantity = (store, rowIndex) =>
  getProductTemplateState(store)
    ? getProductTemplateState(store).templateItems[rowIndex].quantity
    : 0;

export const selectValueX = (store, rowIndex) =>
  getProductTemplateState(store)
    ? getProductTemplateState(store).templateItems[rowIndex].size.x
    : 0;

export const selectValueY = (store, rowIndex) =>
  getProductTemplateState(store)
    ? getProductTemplateState(store).templateItems[rowIndex].size.y
    : 0;
