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
import { connect } from "react-redux";
import {
  openFormDialog,
  closeFormDialog
} from "../../redux/actions/items.actions";

class FormDialog extends React.Component {
  render() {
    const data = [["Acrilico 3mm", "1234"], ["Acrilico 4mm", "4321"]];

    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          // onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar Opção</DialogTitle>
          <DialogContent>
            <div style={{ display: "flex" }}>
              <TextField
                autoFocus
                margin="dense"
                id="editItem"
                label="Nome do item"
                fullWidth
              />
              <CustomAddButton onClick={() => console.log("click")} />
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

FormDialog.propTypes = {
  openDialog: PropTypes.any.isRequired,
  closeFormDialog: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  openDialog: store.itemsState.openDialog
});

export default connect(
  mapStateToProps,
  { openFormDialog, closeFormDialog }
)(FormDialog);
