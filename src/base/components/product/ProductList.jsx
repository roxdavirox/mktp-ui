import React, { useState, useEffect } from 'react';
import Datatable from './Datatable';

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const host = process.env.REACT_APP_HOST_API;

    fetch(`${host}/products`)
      .then(res => res.json())
      .then(products =>
        products.map(p => ({
          _id: p._id,
          name: p.name
        }))
      )
      .then(data => setData(data));
  }, []);

  return <Datatable data={data} />;
};

export default ProductList;
