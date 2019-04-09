import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import CustomAddButton from "components/CustomButtons/CustomAddButton.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { connect } from "react-redux";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { postPriceBegin } from "../../redux/actions/prices.actions";

class CustomPriceInput extends React.Component {
  state = {
    inputStart: "",
    inputEnd: "",
    inputValue: ""
  };

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
                          placeholder: "Inicio",
                          onChange: e =>
                            this.setState({ inputStart: e.target.value })
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
                          placeholder: "Fim",
                          onChange: e =>
                            this.setState({ inputEnd: e.target.value })
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
                          placeholder: "Valor",
                          onChange: e =>
                            this.setState({ inputValue: e.target.value })
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}>
                      <CustomAddButton
                        style={{ padding: "24px 24px 24px 24px" }}
                        title="Adicionar intervalo de preço"
                        onClick={() => {
                          const {
                            inputStart,
                            inputEnd,
                            inputValue
                          } = this.state;

                          const { postPriceBegin } = this.props;

                          postPriceBegin(inputStart, inputEnd, inputValue);
                          this.setState({
                            inputStart: "",
                            inputEnd: "",
                            inputValue: ""
                          });
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

const connectedPriceInput = connect(
  null,
  { postPriceBegin }
)(CustomPriceInput);

export default withStyles(regularFormsStyle)(connectedPriceInput);
