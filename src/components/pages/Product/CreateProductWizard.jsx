/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import { withSnackbar } from 'notistack';
// core components
import Wizard from 'components/common/Wizard/CustomWizard.jsx';
import Container from '@material-ui/core/Container';
import ProductStep from './steps/ProductInfo/ProductForm';
import OptionStep from './steps/OptionInfo/Option';
import history from 'providers/history';
import { getEndpoint } from 'helpers/api';

const steps = [
  { stepName: 'Produto', stepComponent: ProductStep, stepId: 'productStep' },
  { stepName: 'Opções', stepComponent: OptionStep, stepId: 'optionStep' }
];

class CreateProductPage extends React.Component {
  handleFinish = async steps => {
    const { enqueueSnackbar: snack } = this.props;
    const { optionStep: prevOptions, productStep } = steps;
    const { productName: name, categoryId, imageFile } = productStep;
    const options = prevOptions.map(op => ({
      id: op.id,
      items: op.items.map(i => i.id)
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
      method: 'POST',
      body: data
    };

    const endpoint = getEndpoint('/products');
    fetch(endpoint, request)
      .then(res => res.json())
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
          validate
          steps={steps}
          title="Cadastrar produto"
          subtitle="Preencha as informações com atenção."
          finishButtonClick={this.handleFinish}
        />
      </Container>
    );
  }
}

export default withSnackbar(CreateProductPage);
