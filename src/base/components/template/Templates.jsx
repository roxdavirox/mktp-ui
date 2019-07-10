import React from 'react';

import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import Card from 'base/components/theme/Card/Card.jsx';
import CardBody from 'base/components/theme/Card/CardBody.jsx';
import CardHeader from 'base/components/theme/Card/CardHeader.jsx';
import CardFooter from 'base/components/theme/Card/CardFooter.jsx';
import history from 'base/providers/history';

const Templates = ({ products }) => {
  return products.map(p => (
    <GridItem sm={6} md={3} lg={4} key={p._id}>
      <Card product>
        <CardHeader
          image
          onClick={() => history.push('/admin/config/templates')}
        >
          <img src={p.image} alt="cardProduct" />
        </CardHeader>
        <CardBody>{p.name}</CardBody>
        <CardFooter />
      </Card>
    </GridItem>
  ));
};

export default Templates;
