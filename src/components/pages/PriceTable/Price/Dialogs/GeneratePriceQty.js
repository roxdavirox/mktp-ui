const base = [
  { inicio: 0, fim: 1 },
  { inicio: 2, fim: 3 },
  { inicio: 4, fim: 5 },
  { inicio: 6, fim: 7 },
  { inicio: 8, fim: 9 },
  { inicio: 10, fim: 12 },
  { inicio: 13, fim: 15 },
  { inicio: 16, fim: 18 },
  { inicio: 19, fim: 21 },
  { inicio: 22, fim: 25 },
  { inicio: 26, fim: 29 },
  { inicio: 30, fim: 33 },
  { inicio: 34, fim: 37 },
  { inicio: 38, fim: 43 },
  { inicio: 44, fim: 49 },
  { inicio: 50, fim: 55 },
  { inicio: 56, fim: 64 },
  { inicio: 65, fim: 73 },
  { inicio: 74, fim: 82 },
  { inicio: 83, fim: 95 },
  { inicio: 96, fim: 108 },
  { inicio: 109, fim: 125 },
  { inicio: 126, fim: 145 },
  { inicio: 146, fim: 170 },
  { inicio: 171, fim: 200 },
  { inicio: 201, fim: 235 },
  { inicio: 236, fim: 280 },
  { inicio: 281, fim: 340 },
  { inicio: 341, fim: 410 },
  { inicio: 421, fim: 500 }
];

export const calculate = p => v => v * ((p <= 1 ? 1 : p) / 100) + v;

export const generatePriceRange = (cost, menorMargem, maiorMargem) => {
  const prices = [];
  let value = 0;
  let aux = 0;
  let linhas = 30;
  const maiorMargemVenda = calculate(maiorMargem)(cost);
  const menorMargemVenda = calculate(menorMargem)(cost);
  const intervalo = maiorMargemVenda - menorMargemVenda;
  const diferenca = intervalo / linhas;
  for (let i = 0; i < linhas; i++) {
    // primeira linha?
    if (i === 0) {
      value = aux = maiorMargemVenda;
      prices.push({
        start: base[i].inicio,
        end: base[i].fim,
        value: value.toFixed(4)
      });
      continue;
    }
    value = aux - diferenca;
    prices.push({
      start: base[i].inicio,
      end: base[i].fim,
      value: i + 1 === linhas ? menorMargemVenda.toFixed(4) : value.toFixed(4)
    });
    aux = value;
  }
  return prices;
};
