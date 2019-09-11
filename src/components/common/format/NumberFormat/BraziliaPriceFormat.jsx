import React from 'react';
import NumberFormat from './NumberFormat';

const BraziliaPriceFormat = props => (
  <NumberFormat prefix={'R$ '} decimalScale={4} {...props} />
);

export default BraziliaPriceFormat;
