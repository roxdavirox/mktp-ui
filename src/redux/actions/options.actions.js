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
