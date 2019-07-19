// start fetch options
export const FETCH_OPTIONS = 'FETCH_OPTIONS';

export const fetchOptions = () => ({ type: FETCH_OPTIONS });

// add new option
export const ADD_OPTION = 'ADD_OPTION';

export const addOption = (optionName, snack) => ({
  type: ADD_OPTION,
  playload: { optionName, snack }
});

export const ADD_OPTION_SUCCESS = 'ADD_OPTION_SUCCESS';

export const addOptionSuccess = option => ({
  type: ADD_OPTION_SUCCESS,
  playload: { option }
});

export const POST_OPTION_FAILURE = 'POST_OPTION_FAILURE';

export const postOptionFailure = error => ({
  type: POST_OPTION_FAILURE,
  playload: { error }
});

// delete options rows
export const DELETE_OPTIONS_BEGIN = 'DELETE_OPTIONS_BEGIN';

export const deleteOptionsBegin = (optionsId, snack) => ({
  type: DELETE_OPTIONS_BEGIN,
  playload: { optionsId, snack }
});

export const DELETE_OPTIONS_SUCCESS = 'DELETE_OPTIONS_SUCCESS';

export const deleteOptionsSuccess = optionsId => ({
  type: DELETE_OPTIONS_SUCCESS,
  playload: { optionsId }
});

export const DELETE_OPTIONS_FAILURE = 'DELETE_OPTIONS_FAILURE';

export const deleteOptionsFailure = error => ({
  type: DELETE_OPTIONS_FAILURE,
  playload: { error }
});
