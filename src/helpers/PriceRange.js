export const calculate = p => v => v * ((p <= 1 ? 1 : p) / 100) + v;

const baseRange = [
  { start: 0, end: 800 }, //1
  { start: 801, end: 900 }, //2
  { start: 901, end: 1000 }, //3
  { start: 1001, end: 1250 }, //4
  { start: 1251, end: 1500 }, //5
  { start: 1501, end: 1750 }, //6
  { start: 1751, end: 2000 }, //7
  { start: 2001, end: 2250 }, //8
  { start: 2251, end: 2500 }, //9
  { start: 2501, end: 2750 }, //10
  { start: 2751, end: 3000 }, //11
  { start: 3001, end: 3250 }, //12
  { start: 3251, end: 3500 }, //13
  { start: 3501, end: 4000 }, //14
  { start: 4001, end: 5000 }, //15
  { start: 5001, end: 6000 }, //16
  { start: 6001, end: 7000 }, //17
  { start: 7001, end: 8000 }, //18
  { start: 8001, end: 9000 }, //19
  { start: 9001, end: 10000 }, //20
  { start: 10001, end: 11000 }, //21
  { start: 11001, end: 12000 }, //22
  { start: 12001, end: 13000 }, //23
  { start: 13001, end: 14000 }, //24
  { start: 14001, end: 16000 }, //25
  { start: 16001, end: 18000 }, //26
  { start: 18001, end: 20000 }, //27
  { start: 20001, end: 25000 }, //28
  { start: 25001, end: 30000 }, //29
  { start: 30001, end: 100000 } //30
];

export const generatePriceRange = data => {
  var lowerSaleQuantity = 5000; // fixo em 5k
  var maxLines = data.maxLines;
  if (lowerSaleQuantity < maxLines) {
    maxLines = lowerSaleQuantity;
  }

  const prices = [];

  var start,
    end,
    value,
    auxValue,
    lineDivision = 0;

  lineDivision = maxLines > 1 ? maxLines - 1 : 1;

  for (var index = 1, lines = maxLines; index <= maxLines; index++, lines--) {
    start = baseRange[index - 1].start / 10000;
    end = baseRange[index - 1].end / 10000; // valor para dividir - unidade mm
    // first loop?
    if (index === 1) {
      value = data.higherSalesMargin;
      auxValue = value;
      prices.push({
        start,
        end,
        value: value.toFixed(4)
      });
      continue;
    }
    value =
      auxValue -
      (data.higherSalesMargin - data.lowerSalesMargin) / lineDivision;

    prices.push({
      start,
      end: index === maxLines ? lowerSaleQuantity : end,
      value:
        index === maxLines ? data.lowerSalesMargin.toFixed(4) : value.toFixed(4)
    });
    auxValue = value;
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
