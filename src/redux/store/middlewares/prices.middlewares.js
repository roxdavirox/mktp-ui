import {
  FETCH_PRICES_BEGIN,
  fetchPricesSuccess,
  fetchPricesFailure
} from "../../actions/prices.actions";

const url = "https://mktp.azurewebsites.net/api";

export const fetchPricesMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === FETCH_PRICES_BEGIN) {
    const { idPriceRange } = getState().pricesState;

    fetch(`${url}/price/${idPriceRange}`)
      .then(res => res.json())
      .then(({ prices }) => dispatch(fetchPricesSuccess(prices)))
      .catch(error => dispatch(fetchPricesFailure(error)));
  }

  next(action);
};
