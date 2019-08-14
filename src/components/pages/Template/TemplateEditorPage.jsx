/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import Button from '@material-ui/core/Button';
import history from 'providers/history';
import { getEndpoint, createPostRequest } from 'helpers/api';

const styles = {
  container: {
    justifyContent: 'center'
  }
};

const TemplateEditor = ({ classes, location }) => {
  const [editor, setEditor] = useState(null);
  console.log('location: ', location);
  useEffect(() => {
    const {
      CustomersCanvas: { IframeApi }
    } = window;
    //Getting the iframe element to display the editor in.
    var iframe = document.getElementById('editorFrame');
    const productDefinition = {
      // Specify the empty product size.
      surfaces: [{ width: 800, height: 600 }]
    };
    //Loading the editor.
    IframeApi.loadEditor(iframe, productDefinition, {
      // masterUserId
      userId: '5d234507acca31173a43b303'
    })
      .then(edt => setEditor(edt))
      .catch(err => {
        console.error('The editor failed to load with an exception: ', err);
      });
  }, []);
  const handleFinish = () => {
    const { templateCategoryId, product } = location.state;

    editor.finishProductDesign().then(result => {
      const { proofImageUrls, stateId } = result;
      const [arrImage] = proofImageUrls;
      const [imageUrl] = arrImage;
      console.log('resultado: ', result);
      const request = createPostRequest({
        name: 'DefaultName',
        stateId,
        imageUrl,
        productId: product._id
      });
      const endpoint = getEndpoint(`/product-templates/${templateCategoryId}`);
      fetch(endpoint, request)
        .then(res => res.json())
        .then(category => {
          const { product } = location.state;
          history.push({
            pathname: '/admin/config/templates',
            state: { product, category }
          });
        })
        .catch(e => console.log(e));
    });
  };
  return (
    <>
      <GridContainer className={classes.container}>
        <GridItem xs={12} lg={12}>
          <Button onClick={handleFinish}>Finalizar</Button>
          <iframe id="editorFrame" width="100%" height="600px" />{' '}
        </GridItem>
      </GridContainer>
    </>
  );
};

TemplateEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};

export default withStyles(styles)(TemplateEditor);
