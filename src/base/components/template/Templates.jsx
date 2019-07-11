import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import Card from 'base/components/theme/Card/Card.jsx';
import CardBody from 'base/components/theme/Card/CardBody.jsx';
import CardHeader from 'base/components/theme/Card/CardHeader.jsx';
import CardFooter from 'base/components/theme/Card/CardFooter.jsx';
import history from 'base/providers/history';

const style = {
  cardHeader: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardBody: {
    display: 'flex',
    justifyContent: 'center'
  },
  img: {
    position: 'relative',
    padding: '0',
    zIndex: '1',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '-30px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center'
  }
};

const Templates = withStyles(style)(({ productTemplates, classes }) => {
  return productTemplates.map(pt => (
    <GridItem sm={6} md={3} lg={4} key={pt._id}>
      <Card product plain>
        <CardHeader
          className={classes.cardHeader}
          image
          onClick={() =>
            history.push({
              pathname: '/admin/config/templates',
              state: {
                templateCategory: pt.templateCategory
              }
            })
          }
        >
          <img src={pt.image} alt="cardProduct" className={classes.img} />
        </CardHeader>
        <CardBody className={classes.cardBody}>{pt.name}</CardBody>
        <CardFooter />
      </Card>
    </GridItem>
  ));
});

export default Templates;
