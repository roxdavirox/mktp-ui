const types = {
  SET_TEMPLATE_NAME: 'SET_TEMPLATE_NAME',
  SET_ITEMS: 'SET_ITEMS',
  SET_ITEM: 'SET_ITEM',
  SET_OPTION_ID: 'SET_OPTION_ID'
};

const INITIAL_STATE = {
  name: '',
  optionId: '0',
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

export const setOptionId = id => ({
  type: types.SET_OPTION_ID,
  playload: { id }
});

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
      const selectedItems = {
        ...state.selectedItems,
        [item.optionId]: item
      };
      return {
        ...state,
        selectedItems
      };
    }

    case types.SET_OPTION_ID: {
      return { ...state, optionId: action.playload.id };
    }

    default:
      return state;
  }
}

//selectors
export const getProductTemplateState = store => store.productTemplates;
export const selectTemplateName = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).name : '';

export const selectOptionId = store =>
  getProductTemplateState(store)
    ? getProductTemplateState(store).optionId
    : '0';
