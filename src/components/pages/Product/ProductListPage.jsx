/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Datatable from './Datatable';
import { getEndpoint } from 'helpers/api';

const generateTree = data => {
  console.log('data', data);
  const products = data.map(p => ({
    id: p._id,
    name: p.name,
    parentId: null,
    options: p.options.map(op => ({
      _id: op._id,
      id: op._id + p._id,
      name: op.option.name,
      parentId: p._id,
      items: op.items.map(item => {
        const items = {
          _id: item._id,
          id: item._id + op._id,
          name: item.name,
          parentId: op._id + p._id
        };
        return items;
      })
    }))
  }));
  console.log('produtos', products);
  const productRows = products.map(p => ({ id: p.id, name: p.name }));
  console.log('product rows', productRows);

  const options = products
    .map(p => p.options)
    .reduce((options, option) => [...options, ...option], productRows);
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
