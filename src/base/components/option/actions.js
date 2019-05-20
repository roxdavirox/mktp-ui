// start fetch options
export const FETCH_OPTIONS = 'FETCH_OPTIONS';

export const fetchOptions = () => ({ type: FETCH_OPTIONS });

export const FETCH_OPTIONS_FAILURE = 'FETCH_OPTIONS_FAILURE';

export const fetchOptionsFailure = error => ({
  type: FETCH_OPTIONS_FAILURE,
  playload: { error }
});

// add new option
export const POST_OPTION = 'POST_OPTION';

export const postOption = (optionName, snack) => ({
  type: POST_OPTION,
  playload: { optionName, snack }
});

export const POST_OPTION_SUCCESS = 'POST_OPTION_SUCCESS';

export const postOptionSuccess = option => ({
  type: POST_OPTION_SUCCESS,
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

// alert handlers

export const SHOW_ALERT = 'SHOW_ALERT';

export const showAlert = () => ({
  type: SHOW_ALERT,
  playload: { openAlert: true }
});

export const HIDE_ALERT = 'HIDE_ALERT';

export const hideAlert = () => ({
  type: HIDE_ALERT,
  playload: { openAlert: false }
});
