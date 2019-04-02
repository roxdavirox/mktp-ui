import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
    minLength: ""
  };

  verifyMinLength = (value, length) => {
    return value.length >= length;
  };

  change = value => {
    this.setState({
      minLength: this.verifyMinLength(value, 4) ? "success" : "error"
    });
  };

  render() {
    const { data, classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          // onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar itens</DialogTitle>
          <DialogContent>
            <div style={{ display: "flex" }}>
              <CustomInput
                success={this.state.minLength === "success"}
                error={this.state.minLength === "error"}
                id="minlength"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => {
                    this.setState({ inputValue: e.target.value });
                    this.change(e.target.value);
                  },
                  type: "text",
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
                title="Adicionar item"
                onClick={() => {
                  const { inputValue } = this.state;
                  const { postItemBegin } = this.props;

                  postItemBegin(inputValue);
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
  classes: PropTypes.any.isRequired
};

const mapStateToProps = store => ({
  openDialog: store.itemsState.openDialog,
  data: store.itemsState.items
});

export default withStyles(validationFormsStyle)(
  connect(
    mapStateToProps,
    { openFormDialog, closeFormDialog, postItemBegin }
  )(CustomEditOptionDialog)
);
