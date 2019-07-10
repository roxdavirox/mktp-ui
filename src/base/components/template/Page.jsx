import React, { useState, useEffect } from 'react';

import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';

import TemplateCategories from './TemplateCategories.jsx';
import Templates from './Templates';
import { getEndpoint } from 'base/helpers/api';
import { categories } from 'base/helpers/categories';

import product1 from 'assets/img/templates/cartao/template1.jpeg';
import product2 from 'assets/img/templates/cartao/template2.jpeg';
import product3 from 'assets/img/templates/cartao/template3.jpeg';
import product4 from 'assets/img/templates/cartao/template4.jpeg';

const getRandomImage = () => {
  const images = [product1, product2, product3, product4];
  return images[Math.floor(Math.random() * 3)];
};

const Page = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const endpointProducts = getEndpoint('/products/templates');
    fetch(endpointProducts)
      .then(res => res.json())
      .then(products => {
        const newProducts = products.map(p => ({
          ...p,
          image: getRandomImage()
        }));
        setProducts(newProducts);
      });
  }, []);
  return (
    <GridContainer>
      <GridItem xs={4} sm={4} md={4} lg={3}>
        <TemplateCategories categories={categories} />
      </GridItem>
      <GridItem xs={8} sm={4} md={4} lg={8}>
        <GridContainer>
          <Templates products={products} />
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default Page;
