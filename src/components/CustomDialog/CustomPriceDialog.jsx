import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomAddButton from "components/CustomButtons/CustomAddButton.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Close from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/styles/withStyles";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import { closePriceDialog } from "../../redux/actions/prices.actions";

class CustomPriceDialog extends React.Component {
  render = () => {
    const { openDialog, classes } = this.props;
    if (!openDialog) return null;

    return (
      <div>
        <Dialog
          classes={{
            paper: classes.dialogPaper
          }}
          open={this.props.openDialog}
          // onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            style={{ padding: "14px 24px 1px" }}
            id="form-dialog-title"
          >
            Adicionar Faixa de Preço
          </DialogTitle>
          <DialogContent style={{ overflowY: "hidden", padding: "0 24px 1px" }}>
            <div style={{ display: "flex" }}>
            <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="secondary" text>
              <CardText color="secondary">
                <h4 className={classes.cardTitle}>Input Variants</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel
                      className={
                        classes.labelHorizontal +
                        " " +
                        classes.labelHorizontalRadioCheckbox
                      }
                    >
                      Custom Checkboxes & Radios
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(21)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Unchecked"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(22)}
                            checked={
                              this.state.checked.indexOf(22) !== -1
                                ? true
                                : false
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Checked"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        disabled
                        control={
                          <Checkbox
                            tabIndex={-1}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          disabled: classes.disabledCheckboxAndRadio
                        }}
                        label="Disabled Unchecked"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        disabled
                        control={
                          <Checkbox
                            tabIndex={-1}
                            checked={
                              this.state.checked.indexOf(24) !== -1
                                ? true
                                : false
                            }
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          disabled: classes.disabledCheckboxAndRadio
                        }}
                        label="Disabled Checked"
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.selectedEnabled === "a"}
                            onChange={this.handleChangeEnabled}
                            value="a"
                            name="radio button enabled"
                            aria-label="A"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="First Radio"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.selectedEnabled === "b"}
                            onChange={this.handleChangeEnabled}
                            value="b"
                            name="radio button enabled"
                            aria-label="B"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Second Radio"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        disabled
                        control={
                          <Radio
                            checked={false}
                            value="a"
                            name="radio button disabled"
                            aria-label="B"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              disabled: classes.disabledCheckboxAndRadio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Second Radio"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        disabled
                        control={
                          <Radio
                            checked={true}
                            value="b"
                            name="radio button disabled"
                            aria-label="B"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              disabled: classes.disabledCheckboxAndRadio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Second Radio"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Input with success
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="success"
                      labelText="Success"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Check
                              className={classes.inputAdornmentIconSuccess}
                            />
                          </InputAdornment>
                        )
                      }}
                      success
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Input with error
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="error"
                      labelText="Error"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Clear
                              className={classes.inputAdornmentIconError}
                            />
                          </InputAdornment>
                        )
                      }}
                      error
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Column sizing
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          id="md3"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            placeholder: "md={3}"
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          id="md4"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            placeholder: "md={4}"
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          id="md5"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            placeholder: "md={5}"
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                const { closePriceDialog } = this.props;
                closePriceDialog();
              }}
              color="primary"
            >
              Fechar
            </Button>
            {/* <Button onClick={this.handleClose} color="primary">
              Salvar
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  };
}

CustomPriceDialog.propTypes = {
  openDialog: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  closePriceDialog: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  openDialog: store.pricesState.openDialog
});

const connectedPriceDialog = connect(
  mapStateToProps,
  { closePriceDialog }
)(CustomPriceDialog);

export default withStyles(validationFormsStyle)(connectedPriceDialog);
