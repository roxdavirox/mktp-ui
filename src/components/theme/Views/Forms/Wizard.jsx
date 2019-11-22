import React from 'react';

// core components
import Wizard from 'components/Theme/Wizard/Wizard.jsx';
import GridContainer from 'components/Theme/Grid/GridContainer.jsx';
import GridItem from 'components/Theme/Grid/GridItem.jsx';

import Step1 from './WizardSteps/Step1.jsx';
import Step2 from './WizardSteps/Step2.jsx';
import Step3 from './WizardSteps/Step3.jsx';

class WizardView extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            steps={[
              { stepName: 'About', stepComponent: Step1, stepId: 'about' },
              { stepName: 'Account', stepComponent: Step2, stepId: 'account' },
              { stepName: 'Address', stepComponent: Step3, stepId: 'address' }
            ]}
            title="Build Your Profile"
            subtitle="This information will let us know more about you."
            // eslint-disable-next-line no-console
            finishButtonClick={e => console.log(e)}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
