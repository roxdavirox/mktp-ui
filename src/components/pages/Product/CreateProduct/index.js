import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import ArrowForward from '@material-ui/icons/ArrowForward';
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImage);
  const [imageChanged, setImageChange] = useState(true);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
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
    handleRemove();
  };

  const handleFinish = () => {
    handleReset();
  };

  const handleRemove = () => {
    setImageFile(null);
    setImagePreviewUrl(defaultImage);
    setImageChange(false);
    setImageRemoved(true);
  };

  const state = {
    productName,
    categoryId,
    items,
    imageFile,
    imagePreviewUrl,
    imageChanged,
    imageRemoved
  };
  const contextProps = {
    ...state,
    handleRemove,
    setImageFile,
    setImageRemoved,
    setImagePreviewUrl,
    setImageChange,
    setItems,
    setProductName,
    setCategoryId
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
                  <ProductProvider value={contextProps}>
                    {getStepContent(activeStep)}
                  </ProductProvider>
                </Typography>
              </div>
            )}
            <Container maxWidth="xl" style={{ paddingTop: '50px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Voltar
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleFinish}
                    endIcon={<Icon>send</Icon>}
                  >
                    Cadastrar{' '}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                  >
                    Próximo{' '}
                  </Button>
                )}
              </div>
            </Container>
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
