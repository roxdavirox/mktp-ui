import React from "react";

// core components
import Wizard from "components/Theme/Wizard/Wizard.jsx";
import GridContainer from "components/Theme/Grid/GridContainer.jsx";
import GridItem from "components/Theme/Grid/GridItem.jsx";

const steps = [];

class WizardView extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            steps={steps}
            title="Build Your Profile"
            subtitle="This information will let us know more about you."
            finishButtonClick={e => console.log(e)}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
