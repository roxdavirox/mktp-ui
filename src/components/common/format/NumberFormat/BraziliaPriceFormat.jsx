import React from 'react';
import NumberFormat from './NumberFormat';

const BraziliaPriceFormat = props => (
  <NumberFormat prefix={'R$'} decimalScale={2} {...props} />
);

export default BraziliaPriceFormat;
