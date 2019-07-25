import React from 'react';
import NumberFormat from './NumberFormat';

const BraziliaPriceFormat = props => <NumberFormat prefix={'R$'} {...props} />;

export default BraziliaPriceFormat;
