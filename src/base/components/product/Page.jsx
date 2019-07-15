/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import { withSnackbar } from 'notistack';
// core components
import Wizard from 'base/components/theme/Wizard/Wizard.jsx';
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import ProductStep from './steps/ProductStep';
import OptionStep from './steps/OptionStep';
import history from 'base/providers/history';

const steps = [
  { stepName: 'Produto', stepComponent: ProductStep, stepId: 'productStep' },
  { stepName: 'Opções', stepComponent: OptionStep, stepId: 'optionStep' }
];

class WizardView extends React.Component {
  handleFinish = async steps => {
    const { enqueueSnackbar: snack } = this.props;
    const { optionStep: prevOptions, productStep } = steps;
    const { productName: name, categoryId, imageFile } = productStep;
    const options = prevOptions.map(op => ({
      id: op.id,
      items: op.items.map(i => i.id)
    }));
    console.log('options', options);
    snack('Criando produto...', {
      variant: 'info',
      autoHideDuration: 2000
    });
    const host = process.env.REACT_APP_HOST_API;
    const data = new FormData();
    data.append('image', imageFile);
    data.append('name', name);
    data.append('categoryId', categoryId);
    data.append('options', options);

    const request = {
      method: 'POST',
      body: data
    };

    fetch(`${host}/products`, request)
      .then(res => res.json())
      .then(product => {
        snack('Produto criado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        console.log('produto', product);
        history.push('/admin/config/products/list');
      });
  };

  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} lg={12}>
          <Wizard
            validate
            steps={steps}
            title="Cadastrar produto"
            subtitle="Preencha as informações com atenção."
            finishButtonClick={this.handleFinish}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withSnackbar(WizardView);
