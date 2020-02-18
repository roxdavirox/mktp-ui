/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import { withSnackbar } from 'notistack';
// core components
import Wizard from 'components/common/Wizard/CustomWizard.jsx';
import Container from '@material-ui/core/Container';

// import GridContainer from 'components/theme/Grid/GridContainer.jsx';
// import GridItem from 'components/theme/Grid/GridItem.jsx';
import ProductStep from './steps/ProductInfo/ProductForm';
import ItemStep from './steps/ItemInfo/SelectItems';
import history from 'providers/history';
import { getEndpoint } from 'helpers/api';

const steps = [
  { stepName: 'Produto', stepComponent: ProductStep, stepId: 'productStep' },
  {
    stepName: 'Selecione os itens',
    stepComponent: ItemStep,
    stepId: 'itemStep'
  }
];

class EditProductPage extends React.Component {
  handleFinish = async steps => {
    const { enqueueSnackbar: snack } = this.props;
    const { itemStep, productStep } = steps;
    const {
      productName: name,
      categoryId,
      imageFile,
      productId,
      isImageChanged,
      isImageDeleted
    } = productStep;
    const { selectedItems } = itemStep;
    const productOptions = selectedItems.map(item => ({
      option: item.optionId,
      item: item._id
    }));

    snack('Editando produto...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const data = new FormData();
    data.append('name', name);
    data.append('categoryId', categoryId);
    data.append('productOptions', JSON.stringify(productOptions));
    data.append('isImageChanged', isImageChanged);
    data.append('isImageDeleted', isImageDeleted);
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
        snack('Produto criado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        history.push('/admin/config/products/list');
      });
  };
  render() {
    return (
      <Container maxWidth="xl">
        <Wizard
          initialState={{ locationState: { ...this.props.location } }}
          validate
          steps={steps}
          title="Editar produto"
          finishButtonText="Editar"
          subtitle="Preencha as informações com atenção."
          finishButtonClick={this.handleFinish}
          finishButtonDisabled={true}
        />
      </Container>
    );
  }
}

export default withSnackbar(EditProductPage);
