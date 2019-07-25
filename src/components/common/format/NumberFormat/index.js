import React from 'react';
import ReactNumberFormat from 'react-number-format';

const NumberFormat = props => (
  <ReactNumberFormat
    decimalScale={4}
    fixedDecimalScale
    decimalSeparator={','}
    thousandSeparator={'.'}
    displayType={'text'}
    prefix={'R$'}
    {...props}
  />
);

export default NumberFormat;
