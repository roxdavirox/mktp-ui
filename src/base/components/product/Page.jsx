import React from 'react';
import { withSnackbar } from 'notistack';
// core components
import Wizard from 'base/components/theme/Wizard/Wizard.jsx';
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import ProductStep from './steps/ProductStep';
import OptionStep from './steps/OptionStep';

const steps = [
  { stepName: 'Produto', stepComponent: ProductStep, stepId: 'productStep' },
  { stepName: 'Opções', stepComponent: OptionStep, stepId: 'optionStep' }
];

class WizardView extends React.Component {
  handleFinish = async steps => {
    const { enqueueSnackbar: snack } = this.props;
    const { optionStep: prevOptions, productStep } = steps;
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
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: productStep.productName, options })
    };
    fetch(`${host}/products`, request)
      .then(res => res.json())
      .then(product => {
        snack('Produto criado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        console.log('produto', product);
      });
  };

  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
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
