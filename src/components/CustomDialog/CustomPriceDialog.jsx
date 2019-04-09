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
              {/* <CustomInput
                success={this.state.minLength === "success"}
                error={this.state.minLength === "error"}
                labelText={
                  this.state.minLength === "error" ? this.state.labelText : ""
                }
                id="minlength"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => {
                    this.setState({
                      inputValue: e.target.value,
                      labelText: ""
                    });
                    this.change(e.target.value);
                  },
                  type: "text",
                  value: this.state.inputValue,
                  endAdornment:
                    this.state.minLength === "error" ? (
                      <InputAdornment position="end">
                        <Close className={classes.danger} />
                      </InputAdornment>
                    ) : (
                      undefined
                    )
                }}
              /> */}
            </div>
            <h1>Dialog content</h1>
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
