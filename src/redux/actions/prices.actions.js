export const SET_PRICE_RANGE_ID = "SET_PRICE_RANGE_ID";

export const setPriceRangeId = idPriceRange => ({
  type: SET_PRICE_RANGE_ID,
  playload: { idPriceRange }
});
