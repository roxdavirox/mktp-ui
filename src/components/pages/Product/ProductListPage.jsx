/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Datatable from './Datatable';
import { getEndpoint } from 'helpers/api';

const parseProducts = data => {
  // loop do produto
  var products = [];
  var newOptions = [];
  var newOption = {};
  var newItems = [];
  if (!data) return [];

  for (let i = 0; i < data.length; i++) {
    const { options } = data[i];
    if (options.length <= 0) continue;
    console.log('data[i]', data[i]);

    // loop das opções do produto
    for (let j = 0; j < options.length; j++) {
      if (!options[j].option) continue;
      newOption = {
        _id: options[j].option._id,
        id: options[j].option._id + data[i]._id,
        name: options[j].option.name,
        parentId: data[i]._id
      };

      const { items } = options[j];
      if (items.length >= 0) {
        console.log('items da opção', items);
        for (let k = 0; k < items.length; k++) {
          var item = {
            _id: items[k]._id,
            id: items[k]._id + options[j].option._id,
            name: items[k].name,
            parentId: options[j].option._id + data[i]._id
          };
          console.log('adicionando item', item);
          newItems.push(item);
        }
        console.log('newItems', newItems);
        // adiciona items
      }
      newOptions.push({
        items: newItems,
        ...newOption
      });
    }

    products.push({
      id: data[i]._id,
      name: data[i].name,
      parentId: null,
      options: newOptions
    });
    //reseta os dados
    newOptions = [];
    newOption = {};
    newItems = [];
  }

  return products;
};

const generateTree = data => {
  console.log('data', data);
  const products = parseProducts(data);

  console.log('produtos', products);
  const productRows = products.map(p => ({ id: p.id, name: p.name }));
  console.log('product rows', productRows);

  const options = products
    .map(p => p.options)
    .reduce((options, option) => [...options, ...option], productRows);
  console.log('options', options);
  const optionRows = options.map(o => ({
    id: o.id,
    name: o.name,
    parentId: o.parentId
  }));
  console.log('optionrows', optionRows);
  const itemRows = options
    .filter(o => o.items)
    .map(o => o.items)
    .reduce((items, item) => [...items, ...item], [])
    .map(i => ({
      id: i.id,
      name: i.name,
      parentId: i.parentId
    }));

  console.log('itemsRows', itemRows);
  const rows = [...optionRows, ...itemRows];
  console.log('rows', rows);
  return rows;
};

const ProductListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const endpoint = getEndpoint('/products');
    fetch(endpoint)
      .then(res => res.json())
      .then(products => generateTree(products))
      .then(data => setData(data));
  }, []);

  return <Datatable data={data} />;
};

export default ProductListPage;
