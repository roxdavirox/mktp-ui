const types = {
  SET_TEMPLATE_NAME: 'SET_TEMPLATE_NAME',
  SET_ITEMS: 'SET_ITEMS'
};

const INITIAL_STATE = {
  name: '',
  items: []
};

export const setTemplateName = name => ({
  type: types.SET_TEMPLATE_NAME,
  playload: { name }
});

export const setItems = items => ({
  type: types.SET_ITEMS,
  playload: { items }
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

    default:
      return state;
  }
}

//selectors
export const getProductTemplateState = store => store.productTemplates;
export const selectTemplateName = store =>
  getProductTemplateState(store) ? getProductTemplateState(store).name : '';
