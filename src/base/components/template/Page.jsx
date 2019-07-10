import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import dropImage from 'assets/img/templates/drop-file.png';

const style = {
  container: {
    '& img': {
      maxWidth: '200px',
      maxHeight: '150px',
      width: 'auto',
      height: 'auto'
    }
  }
};

const getRandomImage = () => {
  const images = [product1, product2, product3, product4];
  return images[Math.floor(Math.random() * 3)];
};

const Page = withStyles(style)(({ classes }) => {
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
        setProducts([
          {
            _id: 0,
            name: (
              <Link to="/admin/template/create" style={{ color: 'blue' }}>
                Criar template
              </Link>
            ),
            image: dropImage
          },
          ...newProducts
        ]);
      });
  }, []);
  return (
    <GridContainer>
      <GridItem xs={4} sm={4} md={4} lg={3}>
        <TemplateCategories categories={categories} />
      </GridItem>
      <GridItem xs={8} sm={4} md={4} lg={8}>
        <GridContainer className={classes.container}>
          <Templates products={products} />
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
});

export default Page;
