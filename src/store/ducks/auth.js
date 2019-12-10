import { isEmpty } from 'lodash';

const types = {
  SET_USER: 'SET_USER'
};

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

export const setUser = user => ({
  type: types.SET_USER,
  payload: {
    user
  }
});

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_USER: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: !isEmpty(user),
        user
      };
    }

    default:
      return state;
  }
}
