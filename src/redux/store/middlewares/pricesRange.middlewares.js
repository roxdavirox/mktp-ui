import {
  FETCH_PRICES_RANGE_BEGIN,
  fetchPricesRangeSuccess,
  fetchPricesRangeFailure,
  POST_PRICE_RANGE_BEGIN,
  postPriceRangeSuccess,
  postPriceRangeFailure
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

export const postPriceRangeMiddleware = ({ dispatch }) => next => action => {
  if (action.type === POST_PRICE_RANGE_BEGIN) {
    const { priceRange, snack } = action.playload;

    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(priceRange)
    };

    fetch(url, request)
      .then(res => res.json())
      .then(price => {
        snack(`Tabela de preço ${price.name} adicionada com sucesso!`, {
          variant: "success",
          autoHideDuration: 2000
        });
        dispatch(postPriceRangeSuccess(price));
      })
      .catch(error => {
        snack(`Error: ${error}`);
        dispatch(postPriceRangeFailure(error));
      });
  }

  next(action);
};
