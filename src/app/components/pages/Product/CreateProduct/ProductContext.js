import React from 'react';

const initialState = {};
const ProductContext = React.createContext(initialState);

export const ProductProvider = ProductContext.Provider;
export const ProductConsumer = ProductContext.Consumer;

export default ProductContext;
