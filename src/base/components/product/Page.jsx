import React from 'react';

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
    const { optionStep: options, productStep } = steps;
    const host = process.env.REACT_APP_HOST_API;
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: productStep.productName, options })
    };
    const response = await fetch(`${host}/products`, request);
    const data = await response.json();
    console.log('data response:', data);
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

export default WizardView;
