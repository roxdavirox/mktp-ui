/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import DxDatatable from './OptionsDxDatatable';
import uuid from 'uuid/v1';
import Datatable from 
import { getEndpoint } from 'helpers/api';

const parseProducts = products => {
  // loop do produto
  var newProducts = [];
  var newOptions = [];
  var newOption = {};
  var newItems = [];
  if (!products) return [];

  for (let i = 0; i < products.length; i++) {
    const { options } = products[i];
    if (options.length <= 0) continue;
    const productId = uuid();

    // loop das opções do produto
    for (let j = 0; j < options.length; j++) {
      if (!options[j].option) continue;
      const optionId = uuid();
      newOption = {
        _id: options[j].option._id,
        id: optionId,
        name: options[j].option.name,
        parentId: productId
      };
      newItems = [];
      const { items } = options[j];
      if (!items) continue;
      if (items.length >= 0) {
        for (let k = 0; k < items.length; k++) {
          const itemId = uuid();
          newItems.push({
            _id: items[k]._id,
            id: itemId,
            name: items[k].name,
            parentId: optionId
          });
        }
      }
      newOptions.push({
        items: newItems,
        ...newOption
      });
    }

    newProducts.push({
      id: productId,
      name: products[i].name,
      parentId: null,
      options: newOptions
    });
    //reseta os dados
    newOptions = [];
    newOption = {};
    newItems = [];
  }

  return newProducts;
};

const generateTree = data => {
  const products = parseProducts(data);
  const productRows = products.map(p => ({ id: p.id, name: p.name }));

  const options = products
    .map(p => p.options)
    .reduce((options, option) => [...options, ...option], productRows);

  const optionRows = options.map(o => ({
    id: o.id,
    name: o.name,
    parentId: o.parentId
  }));

  const itemRows = options
    .filter(o => o.items)
    .map(o => o.items)
    .reduce((items, item) => [...items, ...item], [])
    .map(i => ({
      id: i.id,
      name: i.name,
      parentId: i.parentId
    }));

  const rows = [...optionRows, ...itemRows];

  return rows;
};

const ProductListPage = () => {
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const endpoint = getEndpoint('/products');
    fetch(endpoint)
      .then(res => res.json())
      .then(products => generateTree(products))
      .then(productOptions => setProductOptions(productOptions));
  }, []);

  return <DxDatatable data={productOptions} />;
};

export default ProductListPage;
