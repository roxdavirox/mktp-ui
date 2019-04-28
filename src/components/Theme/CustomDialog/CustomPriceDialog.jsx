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
import CustomPriceInput from "components/CustomInput/CustomPriceInput.jsx";
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
            style={{ padding: "24px 24px 20px" }}
            id="form-dialog-title"
          >
            Adicionar preço
          </DialogTitle>
          <DialogContent style={{ overflowY: "hidden", padding: "0 24px 1px" }}>
            <div style={{ display: "flex" }}>
              <CustomPriceInput />
            </div>
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
  openDialog: store.prices.openDialog
});

const connectedPriceDialog = connect(
  mapStateToProps,
  { closePriceDialog }
)(CustomPriceDialog);

export default withStyles(validationFormsStyle)(connectedPriceDialog);
