import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import ItemMuiDatatable from "components/Table/ItemMuiDatatable.jsx";
import CustomAddButton from "components/CustomButtons/CustomAddButton.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Close from "@material-ui/icons/Close";

import { withSnackbar } from "notistack";
import withStyles from "@material-ui/core/styles/withStyles";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

import { connect } from "react-redux";
import {
  openFormDialog,
  closeFormDialog,
  postItemBegin
} from "../../redux/actions/items.actions";

class CustomEditOptionDialog extends React.Component {
  state = {
    inputValue: "",
    minLength: "",
    labelText: ""
  };

  verifyMinLength = (value, length) => {
    return value.length >= length;
  };

  change = value => {
    this.setState({
      minLength: this.verifyMinLength(value, 3) ? "success" : "error"
    });
  };

  render() {
    const { data, classes, enqueueSnackbar } = this.props;

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
            Editar itens
          </DialogTitle>
          <DialogContent style={{ overflowY: "hidden", padding: "0 24px 1px" }}>
            <div style={{ display: "flex" }}>
              <CustomInput
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
              />
              <CustomAddButton
                style={{ padding: "24px 24px 24px 24px" }}
                title="Adicionar item"
                onClick={() => {
                  const { inputValue } = this.state;
                  const { postItemBegin } = this.props;
                  if (!this.verifyMinLength(inputValue, 3)) {
                    this.setState({
                      minLength: "error",
                      labelText: "O nome deve conter no minimo 3 caracteres"
                    });
                    return;
                  }

                  enqueueSnackbar(`Adicionando item ${inputValue}`, {
                    variant: "info",
                    autoHideDuration: 2000
                  });

                  postItemBegin(inputValue, enqueueSnackbar);
                  this.setState({ inputValue: "" });
                }}
              />
            </div>

            <ItemMuiDatatable data={data} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.closeFormDialog()}
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
  }
}

CustomEditOptionDialog.propTypes = {
  openDialog: PropTypes.any.isRequired,
  closeFormDialog: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  postItemBegin: PropTypes.func.isRequired,
  classes: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  openDialog: store.itemsState.openDialog,
  data: store.itemsState.items
});

const connectedEditOptionDialog = connect(
  mapStateToProps,
  { openFormDialog, closeFormDialog, postItemBegin }
)(CustomEditOptionDialog);

const CustomEditDialog = withSnackbar(connectedEditOptionDialog);

export default withStyles(validationFormsStyle)(CustomEditDialog);
