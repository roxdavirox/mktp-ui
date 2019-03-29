// start fetch options
export const FETCH_OPTIONS_BEGIN = "FETCH_OPTIONS_BEGIN";

export const fetchOptionsBegin = () => ({ type: FETCH_OPTIONS_BEGIN });

export const FETCH_OPTIONS_SUCCESS = "FETCH_OPTIONS_SUCCESS";

export const fetchOptionsSuccess = options => ({
  type: FETCH_OPTIONS_SUCCESS,
  playload: { options }
});

export const FETCH_OPTIONS_FAILURE = "FETCH_OPTIONS_FAILURE";

export const fetchOptionsFailure = error => ({
  type: FETCH_OPTIONS_FAILURE,
  playload: { error }
});

// add new option
export const POST_OPTION_BEGIN = "POST_OPTION_BEGIN";

export const postOptionBegin = optionName => ({
  type: POST_OPTION_BEGIN,
  playload: { optionName }
});

export const POST_OPTION_SUCCESS = "POST_OPTION_SUCCESS";

export const postOptionSuccess = option => ({
  type: POST_OPTION_SUCCESS,
  playload: { option }
});

export const POST_OPTION_FAILURE = "POST_OPTION_FAILURE";

export const postOptionFailure = error => ({
  type: POST_OPTION_FAILURE,
  playload: { error }
});

// delete options rows
export const DELETE_OPTIONS_BEGIN = "DELETE_OPTIONS_BEGIN";

export const deleteOptionsBegin = deletedOptionsIds => ({
  type: DELETE_OPTIONS_BEGIN,
  playload: { deletedOptionsIds }
});

export const DELETE_OPTIONS_SUCCESS = "DELETE_OPTIONS_SUCCESS";

export const deleteOptionsSuccess = options => ({
  type: DELETE_OPTIONS_SUCCESS,
  playload: { options }
});

export const DELETE_OPTIONS_FAILURE = "DELETE_OPTIONS_FAILURE";

export const deleteOptionsFailure = error => ({
  type: DELETE_OPTIONS_FAILURE,
  playload: { error }
});
