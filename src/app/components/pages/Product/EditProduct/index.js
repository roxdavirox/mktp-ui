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
import { Breadcrumb } from 'matx';
import { ProductProvider } from './ProductContext';
import SelectItems from './SelectItems';
import Form from './Form';
import { getEndpoint } from 'helpers/api';
import history from 'history.js';
import defaultImage from './defaultImage.jpg';

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

// TODO: Encapsular componente stepper
// eslint-disable-next-line no-unused-vars
const EditProductPage = props => {
  // eslint-disable-next-line no-unused-vars
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImage);
  const [imageChanged, setImageChange] = useState(true);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { productId } = props.location.state;

  useEffect(() => {
    async function getProductCategories() {
      const categoriesEndpoint = getEndpoint('/categories');
      const res = await fetch(categoriesEndpoint);
      const { categories } = await res.json();
      setCategories(categories);
    }

    getProductCategories();
  }, []);

  useEffect(() => {
    async function getProductById() {
      const productEndpoint = getEndpoint(`/products/${productId}`);
      const res = await fetch(productEndpoint);
      const { name, category, imageUrl } = await res.json();
      setProductName(name);
      setCategoryId(category);
      setImagePreviewUrl(imageUrl);
    }
    getProductById();
  }, []);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleFirstStep = () => setActiveStep(0);

  const handleReset = () => {
    setActiveStep(0);
    handleRemove();
  };

  const handleFinish = () => {
    if (!imageFile && !imagePreviewUrl) {
      props.enqueueSnackbar('Por favor, adicione uma imagem!', {
        variant: 'warning',
        autoHideDuration: 3000
      });
      handleFirstStep();
      return;
    }
    const productOptions = Object.values(items)
      .filter(item => item.isChecked)
      // eslint-disable-next-line no-unused-vars
      .map(({ isChecked, ...rest }) => ({ ...rest }))
      .map(item => ({
        option: item.optionId,
        item: item._id
      }));

    props.enqueueSnackbar('Editando produto...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const data = new FormData();
    data.append('name', productName);
    data.append('categoryId', categoryId);
    data.append('productOptions', JSON.stringify(productOptions));
    data.append('isImageChanged', imageChanged);
    data.append('isImageDeleted', imageRemoved);
    data.append('image', imageFile);

    const request = {
      method: 'PUT',
      body: data
    };

    const endpoint = getEndpoint(`/products/${productId}`);
    fetch(endpoint, request)
      .then(res => res.json())
      // eslint-disable-next-line no-unused-vars
      .then(({ product }) => {
        props.enqueueSnackbar('Produto editado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        history.push('/products');
      });
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
    imageRemoved,
    categories,
    productId
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
    setCategoryId,
    handleFirstStep
  };
  return (
    <Container maxWidth="xl" className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: 'Produtos', path: '/products' },
            { name: 'Editar' }
          ]}
        />
      </div>
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
              <ProductProvider value={contextProps}>
                {getStepContent(activeStep)}
              </ProductProvider>
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
                  Editar{' '}
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
  );
};

EditProductPage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(EditProductPage);
