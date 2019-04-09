import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import CustomAddButton from "components/CustomButtons/CustomAddButton.jsx";
import Checkbox from "@material-ui/core/Checkbox";

import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class CustomPriceInput extends React.Component {
  render = () => {
    const { classes } = this.props;

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="secondary" text>
            <CardText color="secondary">
              <h4 className={classes.cardTitle}>Adicionar Faixa de preço</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Preço
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        id="start"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Inicio"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        id="end"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Fim"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        id="value"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Valor"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}>
                      <CustomAddButton
                        style={{ padding: "24px 24px 24px 24px" }}
                        title="Adicionar item"
                        onClick={() => {
                          alert("click");
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    );
  };
}

export default withStyles(regularFormsStyle)(CustomPriceInput);
