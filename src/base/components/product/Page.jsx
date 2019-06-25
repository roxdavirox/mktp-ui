import React from 'react';

// core components
import Wizard from 'base/components/theme/Wizard/Wizard.jsx';
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';

const steps = [
  { stepName: 'Produto', stepComponent: Step1, stepId: 'step1' },
  { stepName: 'Opções', stepComponent: Step2, stepId: 'step2' }
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
