import {
  FETCH_PRICES_BEGIN,
  fetchPricesSuccess,
  fetchPricesFailure,
  POST_PRICE_BEGIN,
  postPriceSuccess,
  postPriceFailure
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

export const postPriceMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === POST_PRICE_BEGIN) {
    const { idPriceRange } = getState().pricesState;
    const { price, snack } = action.playload;

    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(price)
    };

    fetch(`${url}/price/${idPriceRange}`, request)
      .then(res => res.json())
      .then(({ idPrice }) => {
        dispatch(postPriceSuccess({ ...price, idPrice }));
        snack(`Intervalo de preço adicionado com sucesso!`, {
          variant: "success",
          autoHideDuration: 2000
        });
      })
      .catch(error => {
        dispatch(postPriceFailure(error));
        snack(`Error: ${error}`);
      });
  }

  next(action);
};
