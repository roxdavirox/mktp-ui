import React from 'react';

// core components
import Wizard from 'base/components/theme/Wizard/Wizard.jsx';
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import ProductStep from './steps/ProductStep';
import OptionStep from './steps/OptionStep';

const steps = [
  { stepName: 'Produto', stepComponent: ProductStep, stepId: 'ProductStep' },
  { stepName: 'Opções', stepComponent: OptionStep, stepId: 'OptionStep' }
];

class WizardView extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            steps={steps}
            title="Cadastrar produto"
            subtitle="Preencha as informações com atenção."
            finishButtonClick={e => console.log(e)}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
