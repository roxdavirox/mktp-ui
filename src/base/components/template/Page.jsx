/* eslint-disable no-console */
/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';

import TemplateCategories from './TemplateCategories.jsx';
import Templates from './Templates';
import { getEndpoint } from 'base/helpers/api';
import AddCategoryDialog from './AddCategoryDialog.jsx';
import dropImage from 'assets/img/templates/drop-file.png';
import { createPostRequest } from 'base/helpers/api';
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

const Page = withStyles(style)(({ classes, location }) => {
  const [openDialog, setDialogState] = useState(false);
  const [templates, setProductTemplates] = useState([]);
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
        : '/product-templates'
    );

    fetch(endpoint)
      .then(res => res.json())
      .then(({ productTemplates }) => setProductTemplates(productTemplates))
      .catch(e => console.log(e));
  }, [templateCategorySelectedId]);

  useEffect(() => {
    const { _id: productId } = product;
    const endpoint = getEndpoint(`/templates-category/${productId}`);

    fetch(endpoint)
      .then(res => res.json())
      .then(({ templatesCategory }) => setTemplatesCategory(templatesCategory))
      .catch(e => console.log(e));
  }, []);

  const newTemplates = templates.filter(
    t => t.templateCategory === templateCategorySelectedId
  );
  console.log('new templates', newTemplates);

  const templateCreate = {
    _id: 0,
    name: (
      <Link
        to={{
          pathname: '/admin/template/create',
          state: {
            templateCategoryId: templateCategorySelectedId,
            ...location.state
          }
        }}
        style={{ color: 'blue' }}
      >
        Criar template
      </Link>
    ),
    imageUrl: dropImage
  };

  const productTemplates =
    templateCategorySelectedId !== 'a'
      ? [templateCreate, ...newTemplates]
      : templates;

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
            <Templates
              productTemplates={productTemplates}
              location={location}
            />
          </GridContainer>
        </GridItem>
      </GridContainer>
    </>
  );
});

export default Page;
