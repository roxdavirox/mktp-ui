/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import { withSnackbar } from 'notistack';
import _ from 'lodash';
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
    const { productName: name, categoryId, imageFile } = productStep;
    const { selectedItems } = itemStep;
    const optionsId = selectedItems.map(item => item.optionId);
    const uniqOptionsId = _.uniq(optionsId);
    const options = uniqOptionsId.map(optionId => ({
      option: optionId,
      items: selectedItems
        .filter(i => i.optionId === optionId)
        .map(item => item._id)
    }));

    snack('Criando produto...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const data = new FormData();
    data.append('name', name);
    data.append('categoryId', categoryId);
    data.append('options', JSON.stringify(options));
    data.append('image', imageFile);

    const request = {
      method: 'PUT',
      body: data
    };

    const endpoint = getEndpoint('/products');
    fetch(endpoint, request)
      .then(res => res.json())
      // eslint-disable-next-line no-unused-vars
      .then(product => {
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
          subtitle="Preencha as informações com atenção."
          finishButtonClick={this.handleFinish}
        />
      </Container>
    );
  }
}

export default withSnackbar(EditProductPage);
