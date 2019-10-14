const types = {
  SET_TEMPLATE_NAME: 'SET_TEMPLATE_NAME',
  SET_ITEMS: 'SET_ITEMS',
  SET_ITEM: 'SET_ITEM',
  SET_OPTION: 'SET_OPTION',
  RESET: 'RESET'
};

const INITIAL_STATE = {
  name: '',
  option: '0',
  selectedItems: {}
};

export const setTemplateName = name => ({
  type: types.SET_TEMPLATE_NAME,
  playload: { name }
});

export const setItems = items => ({
  type: types.SET_ITEMS,
  playload: { items }
});

export const setItem = item => ({
  type: types.SET_ITEM,
  playload: { item }
});

export const setOption = option => ({
  type: types.SET_OPTION,
  playload: { option }
});

export const resetTemplateState = () => ({ type: types.RESET });

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_TEMPLATE_NAME: {
      const { name } = action.playload;
      return {
        ...state,
        name
      };
    }

    case types.SET_ITEMS: {
      const { items } = action.playload;
      return {
        ...state,
        items
      };
    }

    case types.SET_ITEM: {
      const { item } = action.playload;
      const { option } = item;
      const selectedItems = {
        ...state.selectedItems,
        [option._id]: item
      };
      return {
        ...state,
        selectedItems
      };
    }

    case types.SET_OPTION: {
      const { option } = action.playload;
      return { ...state, option };
    }

    case types.RESET: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
}

//selectors
export const getProductTemplateState = store => store.productTemplates;
export const selectTemplateName = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).name : '';

export const selectOption = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).option : '0';
