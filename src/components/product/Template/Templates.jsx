import React, { useEffect, useState } from 'react';
// core
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import Card from 'components/theme/Card/Card.jsx';
import CardBody from 'components/theme/Card/CardBody.jsx';
import CardHeader from 'components/theme/Card/CardHeader.jsx';
import CardFooter from 'components/theme/Card/CardFooter.jsx';

// feature
import ProductCategory from './ProductCategory.jsx';
import { getEndpoint } from 'helpers/api';
import history from 'providers/history';

const Templates = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const endpointCategories = getEndpoint('/categories');
    fetch(endpointCategories)
      .then(res => res.json())
      .then(({ categories }) => setCategories(categories));

    const endpointProducts = getEndpoint('/products/templates');
    fetch(endpointProducts)
      .then(res => res.json())
      .then(products => setProducts(products));
  }, []);

  return (
    <GridContainer>
      <GridItem xs={4} sm={4} md={4} lg={3}>
        <ProductCategory categories={categories} />
      </GridItem>
      <GridItem xs={8} sm={4} md={4} lg={8}>
        <GridContainer>
          {products &&
            products.map(p => (
              <GridItem sm={6} md={3} lg={4} key={p._id}>
                <Card product>
                  <CardHeader
                    image
                    onClick={() =>
                      history.push({
                        pathname: '/admin/config/templates',
                        state: { product: p }
                      })
                    }
                  >
                    <img src={p.imageUrl} alt="cardProduct" />
                  </CardHeader>
                  <CardBody>{p.name}</CardBody>
                  <CardFooter />
                </Card>
              </GridItem>
            ))}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default Templates;
