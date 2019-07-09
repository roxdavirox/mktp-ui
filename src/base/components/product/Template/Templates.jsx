import React, { useEffect, useState } from 'react';
// core
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import Card from 'base/components/theme/Card/Card.jsx';
import CardBody from 'base/components/theme/Card/CardBody.jsx';
import CardHeader from 'base/components/theme/Card/CardHeader.jsx';
import CardFooter from 'base/components/theme/Card/CardFooter.jsx';

// feature
import ProductCategory from './ProductCategory.jsx';
import ProductImg from './CartaoVisita.jpg';
import { getEndpoint } from 'base/helpers/api';

const Templates = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const endpoint = getEndpoint('/categories');
    fetch(endpoint)
      .then(res => res.json())
      .then(({ categories }) => setCategories(categories));
  }, []);

  const templates = [
    {
      id: 1,
      url: '/product/edit',
      img: ProductImg,
      name: 'Cartão de visita'
    },
    {
      id: 2,
      url: '/product/edit',
      img: ProductImg,
      name: 'Placa de homenagem'
    },
    {
      id: 3,
      url: '/product/edit',
      img: ProductImg,
      name: 'Music'
    },
    {
      id: 4,
      url: '/product/edit',
      img: ProductImg,
      name: 'Simples'
    }
  ];
  return (
    <GridContainer>
      <GridItem xs={4} sm={4} md={4} lg={3}>
        <ProductCategory categories={categories} />
      </GridItem>
      <GridItem xs={8} sm={4} md={4} lg={8}>
        <GridContainer>
          {templates.map(t => (
            <GridItem sm={6} md={3} lg={4} key={t.id}>
              <Card product>
                <CardHeader image>
                  <img src={t.img} alt="cardProduct" />
                </CardHeader>
                <CardBody>{t.name}</CardBody>
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
