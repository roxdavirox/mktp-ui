import {
  FETCH_PRICES_RANGE_BEGIN,
  fetchPricesRangeSuccess,
  fetchPricesRangeFailure,
  POST_PRICE_RANGE_BEGIN,
  postPriceRangeSuccess,
  postPriceRangeFailure,
  DELETE_PRICES_RANGE_BEGIN,
  deletePricesRangeFailure,
  deletePricesRangeSuccess
} from "../actions/pricesRange.actions";

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

export const deletePricesRangeMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === DELETE_PRICES_RANGE_BEGIN) {
    const { pricesRangesIds, snack } = action.playload;

    const { pricesRange: state } = getState();

    const { pricesRange: prevPricesRange } = state;

    const filter = arr => id => arr.indexOf(id) === -1;

    const filterById = filter(pricesRangesIds);

    const pricesRange = prevPricesRange.filter(({ idPriceRange }) =>
      filterById(idPriceRange)
    );

    const body = {
      pricesRangesIds
    };

    const request = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    fetch(url, request)
      .then(res => res.json())
      .then(({ deletedCount }) => {
        if (deletedCount) {
          dispatch(deletePricesRangeSuccess(pricesRange));
          snack(
            `${deletedCount} Tabel${
              deletedCount == 1 ? "a deletada" : "as deletadas"
            }`,
            {
              variant: "success",
              autoHideDuration: 2000
            }
          );
        }
      })
      .catch(error => {
        snack(`Error: ${error}`);
        dispatch(deletePricesRangeFailure(error));
      });
  }

  next(action);
};
