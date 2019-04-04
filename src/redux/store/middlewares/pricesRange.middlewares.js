import {
  FETCH_PRICES_RANGE_BEGIN,
  fetchPricesRangeSuccess,
  fetchPricesRangeFailure
} from "../../actions/pricesRange.actions";

const url = "https://mktp.azurewebsites.net/api/PriceRange";

export const fetchPricesRangeMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_PRICES_RANGE_BEGIN) {
    fetch(url)
      .then(res => res.json())
      .then(({ pricesRange }) => dispatch(fetchPricesRangeSuccess(pricesRange)))
      .then(error => dispatch(fetchPricesRangeFailure(error)));
  }

  next(action);
};
