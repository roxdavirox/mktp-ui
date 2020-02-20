import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { ProductProvider } from './ProductContext';
import SelectItems from './SelectItems';
import Form from './Form';

import defaultImage from 'assets/img/image_placeholder.jpg';
import defaultAvatar from 'assets/img/placeholder.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ['Informações do produto', 'Customize o produto'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Form />;
    case 1:
      return <SelectItems />;
    default:
      return 'Unknown stepIndex';
  }
}

// eslint-disable-next-line no-unused-vars
const CreateProductPage = props => {
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageNotChanged, setImageChange] = useState(true);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [items, setItems] = useState([]);

  const state = {
    items,
    avatar,
    imageFile,
    imagePreviewUrl,
    imageNotChanged,
    imageRemoved
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    const previewImage = avatar ? defaultAvatar : defaultImage;
    setImagePreviewUrl(previewImage);
  }, []);

  const handleImageChange = imageFile => {
    setImageChange(true);
    setImageRemoved(false);
    setImageFile(imageFile);
  };

  const handleRemove = () => {
    setImageFile(null);
    setImagePreviewUrl(defaultImage);
    setImageChange(false);
    setImageRemoved(true);
  };

  return (
    <>
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  <ProductProvider
                    value={{
                      ...state,
                      handleImageChange,
                      handleRemove,
                      setImagePreviewUrl,
                      setItems
                    }}
                  >
                    {getStepContent(activeStep)}
                  </ProductProvider>
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

CreateProductPage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(CreateProductPage);
