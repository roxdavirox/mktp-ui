export const calculate = p => v => (p / 100) * v;

export const generatePriceRange = data => {
  var lowerSaleQuantity = data.lowerSaleQuantity;
  var maxLines = data.maxLines;

  if (lowerSaleQuantity < maxLines) {
    maxLines = lowerSaleQuantity;
  }

  const prices = [];

  var start,
    end,
    value,
    aux,
    auxValue,
    lineDivision,
    firstEnd = 0;

  lineDivision = maxLines > 1 ? maxLines - 1 : 1;

  for (var index = 1, lines = maxLines; index <= maxLines; index++, lines--) {
    // first loop?
    if (index === 1) {
      start = index;
      end = lowerSaleQuantity / lines;
      value = data.higherSalesMargin;
      auxValue = value;
      prices.push({
        start: Math.trunc(start),
        end: Math.trunc(end),
        value: value.toFixed(4)
      });
      firstEnd = end;
      aux = end + 1;
      continue;
    }

    start = aux;
    end = firstEnd + aux - 1;
    value =
      auxValue -
      (data.higherSalesMargin - data.lowerSalesMargin) / lineDivision;

    prices.push({
      start: Math.trunc(start),
      end: index === maxLines ? lowerSaleQuantity : Math.trunc(end),
      value:
        index === maxLines ? data.lowerSalesMargin.toFixed(4) : value.toFixed(4)
    });
    auxValue = value;
    aux = end + 1;
  }

  return prices;
};

export const getPriceRange = data => {
  const getHigherSalesMargin = calculate(data.higherSalesMargin);
  const getLowerSalesMargin = calculate(data.lowerSalesMargin);
  const higherSalesMargin = getHigherSalesMargin(data.priceValue);
  const lowerSalesMargin = getLowerSalesMargin(data.priceValue);

  const newData = {
    ...data,
    higherSalesMargin,
    lowerSalesMargin
  };

  return generatePriceRange(newData);
};
