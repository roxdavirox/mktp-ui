/* eslint-disable no-console */
import { getEndpoint, createPostRequest } from 'helpers/api';

const types = {
  SET_TEMPLATE_NAME: 'SET_TEMPLATE_NAME',
  SET_OPTION: 'SET_OPTION',
  RESET: 'RESET',
  FETCH_TEMPLATE_ITEMS: 'FETCH_TEMPLATE_ITEMS',
  SET_TEMPLATE_ITEMS: 'SET_TEMPLATE_ITEMS',
  SET_CHECKED_ITEM: 'SET_CHECKED_ITEM',
  SET_QUANTITY: 'SET_QUANTITY',
  SET_VALUE_X: 'SET_VALUE_X',
  SET_VALUE_Y: 'SET_VALUE_Y',
  SET_OPTIONS: 'SET_OPTIONS',
  FETCH_TOTAL: 'FETCH_TOTAL',
  SET_PRICE_VALUE: 'SET_PRICE_VALUE',
  DUPLICATE_ITEM: 'DUPLICATE_ITEM',
  DELETE_TEMPLATE_ITEMS: 'DELETE_TEMPLATE_ITEMS'
};

const INITIAL_STATE = {
  name: '',
  option: '0',
  templateItems: [],
  options: [],
  total: 0,
  isLoading: false
};

export const setTemplateName = name => ({
  type: types.SET_TEMPLATE_NAME,
  payload: { name }
});

export const setOption = option => ({
  type: types.SET_OPTION,
  payload: { option }
});

export const resetTemplateState = () => ({ type: types.RESET });

export const fetchTemplateItems = () => ({
  type: types.FETCH_TEMPLATE_ITEMS
});

export const setTemplateItems = templateItems => ({
  type: types.SET_TEMPLATE_ITEMS,
  payload: { templateItems }
});

export const setCheckedItem = (rowIndex, isChecked) => ({
  type: types.SET_CHECKED_ITEM,
  payload: { rowIndex, isChecked }
});

export const setQuantity = (rowIndex, quantity) => ({
  type: types.SET_QUANTITY,
  payload: { rowIndex, quantity }
});

export const setValueX = (rowIndex, valueX) => ({
  type: types.SET_VALUE_X,
  payload: { rowIndex, valueX }
});

export const setValueY = (rowIndex, valueY) => ({
  type: types.SET_VALUE_Y,
  payload: { rowIndex, valueY }
});

export const setOptions = options => ({
  type: types.SET_OPTIONS,
  payload: { options }
});

export const fetchTotal = (rowIndex, item, isChecked) => ({
  type: types.FETCH_TOTAL,
  payload: { rowIndex, item, isChecked }
});

export const setPriceValue = (rowIndex, priceValue) => ({
  type: types.SET_PRICE_VALUE,
  payload: { rowIndex, priceValue }
});

export const duplicateItem = rowIndex => ({
  type: types.DUPLICATE_ITEM,
  payload: { rowIndex }
});

export const deleteTemplateItems = indexRows => ({
  type: types.DELETE_TEMPLATE_ITEMS,
  payload: { indexRows }
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

export const fetchTotalMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.FETCH_TOTAL) {
    const { rowIndex, item, isChecked } = action.payload;
    if (!isChecked) {
      dispatch(setPriceValue(rowIndex, 0));
      next(action);
      return;
    }

    const { priceTable, quantity, size, itemType } = item;
    if (itemType === 'template') {
      dispatch(setPriceValue(rowIndex, item.itemPrice * quantity));
      next(action);
      return;
    }
    const { _id: priceTableId } = priceTable;
    const endpoint = getEndpoint(`/price-tables/total/${priceTableId}`);

    const body = {
      quantity,
      size
    };

    const request = createPostRequest(body);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ total }) => dispatch(setPriceValue(rowIndex, total)))
      .catch(error => {
        console.log(`Error on get total value ${error}`);
      });
  }

  next(action);
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_TEMPLATE_ITEMS: {
      return {
        ...state,
        isLoading: true
      };
    }

    case types.SET_TEMPLATE_NAME: {
      const { name } = action.payload;
      return {
        ...state,
        name
      };
    }

    case types.SET_OPTION: {
      const { option } = action.payload;
      return { ...state, option };
    }

    case types.RESET: {
      return INITIAL_STATE;
    }

    case types.SET_TEMPLATE_ITEMS: {
      const { templateItems: prevTemplateItems } = action.payload;

      const templateItems = prevTemplateItems
        .map(item => {
          if (item.priceTable && item.priceTable.unit === 'quantidade') {
            return item;
          } else {
            return { ...item, size: { x: 1, y: 1 } };
          }
        })
        .map(item => ({ ...item, price: 0, quantity: 1, isChecked: false }));

      return {
        ...state,
        templateItems,
        total: 0,
        isLoading: false
      };
    }

    case types.SET_CHECKED_ITEM: {
      state.templateItems[action.payload.rowIndex].isChecked =
        action.payload.isChecked;
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    case types.SET_QUANTITY: {
      const { quantity } = action.payload;
      state.templateItems[action.payload.rowIndex].quantity =
        quantity <= 0 ? 1 : quantity;
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    case types.SET_VALUE_X: {
      const { rowIndex, valueX } = action.payload;

      state.templateItems[rowIndex].size = {
        ...state.templateItems[rowIndex].size,
        x: valueX <= 0 ? 1 : valueX
      };
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    case types.SET_VALUE_Y: {
      const { rowIndex, valueY } = action.payload;

      state.templateItems[rowIndex].size = {
        ...state.templateItems[rowIndex].size,
        y: valueY <= 0 ? 1 : valueY
      };
      return {
        ...state,
        templateItems: [...state.templateItems]
      };
    }

    case types.SET_OPTIONS: {
      return {
        ...state,
        options: action.payload.options,
        total: 0
      };
    }

    case types.SET_PRICE_VALUE: {
      const { rowIndex, priceValue } = action.payload;
      state.templateItems[rowIndex].price = priceValue;
      return {
        ...state,
        templateItems: state.templateItems,
        total: state.templateItems
          .filter(item => item.isChecked)
          .reduce((total, item) => total + item.price, 0)
      };
    }

    case types.DUPLICATE_ITEM: {
      const { rowIndex } = action.payload;
      const templateItems = state.templateItems;
      templateItems.splice(rowIndex + 1, 0, { ...templateItems[rowIndex] });
      return {
        ...state,
        templateItems,
        total: state.templateItems
          .filter(item => item.isChecked)
          .reduce((total, item) => total + item.price, 0)
      };
    }

    case types.DELETE_TEMPLATE_ITEMS: {
      const { indexRows } = action.payload;
      const templateItems = state.templateItems.filter(
        (_, index) => indexRows.indexOf(index) === -1
      );
      return {
        ...state,
        templateItems
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
    : 1;

export const selectTotal = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).total : 0;

export const selectValueX = (store, rowIndex) =>
  getProductTemplateState(store)
    ? getProductTemplateState(store).templateItems[rowIndex].size.x
    : 0;

export const selectValueY = (store, rowIndex) =>
  getProductTemplateState(store)
    ? getProductTemplateState(store).templateItems[rowIndex].size.y
    : 0;

export const selectOptions = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).options : [];
