/* eslint-disable no-console */
/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';

import TemplateCategories from './TemplateCategories.jsx';
import ProductTemplates from './ProductTemplates.jsx';
import AddCategoryDialog from './AddCategoryDialog.jsx';

import { createPostRequest, getEndpoint } from 'helpers/api';

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

const TemplatePage = withStyles(style)(({ classes, location }) => {
  const [openDialog, setDialogState] = useState(false);
  const [productTemplates, setProductTemplates] = useState([]);
  const [templatesCategory, setTemplatesCategory] = useState([]);
  const [templateCategorySelectedId, setTemplateId] = useState('a');

  const {
    state: { product }
  } = location;

  useEffect(() => {
    const templateCategoryId = templateCategorySelectedId;

    const endpoint = getEndpoint(
      templateCategorySelectedId !== 'a'
        ? `/product-templates/${templateCategoryId}`
        : `/product-templates/all/${product._id}`
    );

    fetch(endpoint)
      .then(res => res.json())
      .then(({ productTemplates }) => setProductTemplates(productTemplates))
      .catch(e => console.log(e));
  }, [templateCategorySelectedId, templatesCategory]);

  useEffect(() => {
    const { _id: productId } = product;
    const endpoint = getEndpoint(`/templates-category/${productId}`);

    fetch(endpoint)
      .then(res => res.json())
      .then(({ templatesCategory }) => setTemplatesCategory(templatesCategory))
      .catch(e => console.log(e));
  }, []);

  const handleChangeTemplateSelected = id => setTemplateId(id);

  const handleAddCategory = async categoryName => {
    const { _id: productId } = product;
    const endpoint = getEndpoint(`/templates-category/${productId}`);
    const request = createPostRequest({ name: categoryName });
    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ templateCategory }) =>
        setTemplatesCategory([...templatesCategory, templateCategory])
      )
      .catch(e => console.log(e));
  };

  return (
    <>
      {openDialog && (
        <AddCategoryDialog
          open={openDialog}
          onClose={() => setDialogState(false)}
          onAddCategory={handleAddCategory}
        />
      )}
      <GridContainer>
        <GridItem xs={4} sm={4} md={4} lg={3}>
          <TemplateCategories
            categories={templatesCategory}
            onSelectCategory={handleChangeTemplateSelected}
            selectedEnabled={templateCategorySelectedId}
            onOpenAddCategoryDialog={() => setDialogState(true)}
          />
        </GridItem>
        <GridItem xs={8} sm={4} md={4} lg={8}>
          <GridContainer className={classes.container}>
            <ProductTemplates
              productTemplates={productTemplates}
              location={location}
              templateCategorySelectedId={templateCategorySelectedId}
            />
          </GridContainer>
        </GridItem>
      </GridContainer>
    </>
  );
});

export default TemplatePage;
