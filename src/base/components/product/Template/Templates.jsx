import React from 'react';
// core
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import Card from 'base/components/theme/Card/Card.jsx';
import CardBody from 'base/components/theme/Card/CardBody.jsx';
import CardHeader from 'base/components/theme/Card/CardHeader.jsx';
import CardFooter from 'base/components/theme/Card/CardFooter.jsx';

// feature
import Categories from './Categories.jsx';
import ProductImg from 'assets/img/product1.jpg';

const Templates = () => {
  const templates = [
    {
      id: 1,
      url: '/product/edit',
      img: ProductImg,
      name: 'Equilibrio'
    },
    {
      id: 2,
      url: '/product/edit',
      img: ProductImg,
      name: 'Cat & Dog'
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
        <Categories />
      </GridItem>
      <GridItem xs={8} sm={4} md={4} lg={8}>
        <GridContainer>
          {templates.map(t => (
            <GridItem sm={6} md={3} lg={4} key={t.id}>
              <Card product>
                <CardHeader image>
                  <img src={t.img} alt="cardProduct" />
                </CardHeader>
                <CardBody>{t.title}</CardBody>
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
