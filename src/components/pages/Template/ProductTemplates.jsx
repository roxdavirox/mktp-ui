import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//core
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import GridItem from 'components/theme/Grid/GridItem.jsx';
import Card from 'components/theme/Card/Card.jsx';
import CardBody from 'components/theme/Card/CardBody.jsx';
import CardHeader from 'components/theme/Card/CardHeader.jsx';
import CardFooter from 'components/theme/Card/CardFooter.jsx';
import history from 'providers/history';
// import dropImage from 'assets/img/templates/drop-file.png';,

const style = theme => ({
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
  },
  button: {
    margin: theme.spacing.unit
  }
});

// eslint-disable-next-line react/display-name
const CreateTemplate = ({ onOpenDialog, classes }) => (
  <GridItem sm={6} md={3} lg={4} key={0}>
    <Card product plain>
      <CardHeader className={classes.cardHeader} image>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={() => onOpenDialog()}
        >
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </CardHeader>
      <CardBody className={classes.cardBody}>Adicionar template</CardBody>
      <CardFooter />
    </Card>
  </GridItem>
);

const Templates = withStyles(style)(
  ({
    productTemplates,
    classes,
    location,
    templateCategorySelectedId,
    onOpenDialog
  }) => {
    // eslint-disable-next-line no-console
    console.log('selectedId', templateCategorySelectedId);
    return (
      <>
        {templateCategorySelectedId !== 'a' && (
          <CreateTemplate onOpenDialog={onOpenDialog} classes={classes} />
        )}
        {productTemplates.map(pt => (
          <GridItem sm={6} md={3} lg={4} key={pt._id}>
            <Card product plain>
              <CardHeader
                className={classes.cardHeader}
                image
                onClick={() =>
                  //abre o editor com o template selecionado(clicado)
                  history.push({
                    pathname: '/admin/config/templates',
                    state: {
                      templateCategory: pt.templateCategory,
                      ...location.state
                    }
                  })
                }
              >
                <img
                  src={pt.imageUrl}
                  alt="cardProduct"
                  className={classes.img}
                />
              </CardHeader>
              <CardBody className={classes.cardBody}>{pt.name}</CardBody>
              <CardFooter />
            </Card>
          </GridItem>
        ))}
      </>
    );
  }
);

export default Templates;
