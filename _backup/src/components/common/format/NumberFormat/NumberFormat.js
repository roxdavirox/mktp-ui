import React from 'react';
import ReactNumberFormat from 'react-number-format';

const NumberFormat = props => (
  <ReactNumberFormat
    fixedDecimalScale
    decimalSeparator={','}
    thousandSeparator={'.'}
    displayType={'text'}
    isNumericString
    {...props}
  />
);

export default NumberFormat;
