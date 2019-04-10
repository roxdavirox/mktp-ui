import {
  FETCH_PRICES_BEGIN,
  fetchPricesSuccess,
  fetchPricesFailure,
  POST_PRICE_BEGIN,
  postPriceSuccess,
  postPriceFailure,
  DELETE_PRICES_BEGIN,
  deletePricesSuccess,
  deletePricesSuccess,
  deletePricesFailure
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

export const deletePricesMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === DELETE_PRICES_BEGIN) {
    const { deletedPricesIds, snack } = action.playload;

    const { prices: prevPrices } = getState().pricesState;

    const prices = prevPrices.filter(
      ({ idPrice }) => deletedPricesIds.indexOf(idPrice) === -1
    );

    const body = {
      pricesIds: deletedPricesIds
    };

    const request = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    fetch(`${url}/price`, request)
      .then(res => res.json())
      .then(({ deletedPrices }) => {
        if (deletedPrices) {
          const count = deletedPrices;
          dispatch(deletePricesSuccess(prices));
          snack(`${count} Preç${count === 1 ?  "o deletado" : "os deletados"}`, {
            variant: "success",
            autoHideDuration: 2000
          });
        }
      })
      .catch(error => {
        snack(`Error: ${error}`);
        dispatch(deletePricesFailure(error));
      })

  }

  next(action);
};