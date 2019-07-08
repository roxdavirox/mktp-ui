/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import Button from '@material-ui/core/Button';

const styles = {
  container: {
    justifyContent: 'center'
  }
};

const Editor = ({ classes }) => {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    const {
      CustomersCanvas: { IframeApi }
    } = window;
    //Getting the iframe element to display the editor in.
    var iframe = document.getElementById('editorFrame');
    //Loading the editor.
    IframeApi.loadEditor(
      iframe,
      // {
      //   // Specify the empty product size.
      //   surfaces: [{ width: 800, height: 600 }]
      // },
      'afdb11b9-6c6f-4055-a749-e72ee1742b07',
      {
        // Set a user id.
        userId: 'someUserId'
      }
    )
      .then(edt => setEditor(edt))
      .catch(err => {
        console.error('The editor failed to load with an exception: ', err);
      });
  }, []);
  const handleFinish = () => {
    editor.finishProductDesign().then(function(result) {
      console.log('result', result);
      var stateId = result.stateId;
      console.log('State is saved successfully. Its id is ' + stateId);
    });
  };
  return (
    <>
      <GridContainer className={classes.container}>
        <GridItem xs={12} lg={12}>
          <iframe id="editorFrame" width="100%" height="600px" />{' '}
          <Button onClick={handleFinish}>Finalizar</Button>
        </GridItem>
      </GridContainer>
    </>
  );
};

Editor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Editor);
