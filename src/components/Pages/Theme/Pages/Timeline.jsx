import React from "react";

// core components
import GridContainer from "components/Theme/Grid/GridContainer.jsx";
import GridItem from "components/Theme/Grid/GridItem.jsx";
import Heading from "components/Theme/Heading/Heading.jsx";
import Timeline from "components/Theme/Timeline/Timeline.jsx";
import Card from "components/Theme/Card/Card.jsx";
import CardBody from "components/Theme/Card/CardBody.jsx";

import { stories } from "variables/general.jsx";

class TimelinePage extends React.Component {
  render() {
    return (
      <div>
        <Heading title="Timeline" textAlign="center" />
        <GridContainer>
          <GridItem xs={12}>
            <Card plain>
              <CardBody plain>
                <Timeline stories={stories} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default TimelinePage;
