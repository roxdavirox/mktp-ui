import React from 'react';
import NumberFormat from './NumberFormat';

const PriceFormat = props => <NumberFormat decimalScale={4} {...props} />;

export default PriceFormat;
