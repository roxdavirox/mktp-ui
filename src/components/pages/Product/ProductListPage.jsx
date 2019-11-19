/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import { getEndpoint } from 'helpers/api';

const mapProduct = ({ _id, name }) => ({ _id, name });

const mapProductNames = products => products.map(mapProduct);

const ProductListPage = () => {
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    const endpoint = getEndpoint('/products');
    fetch(endpoint)
      .then(res => res.json())
      .then(mapProductNames)
      .then(setProductNames);
  }, []);

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    textLabels: {
      body: {
        noMatch: <h1>sem dados</h1>
      }
    }
  };

  return (
    <MuiDatatable data={productNames} options={options} columns={['name']} />
  );
};

export default ProductListPage;
