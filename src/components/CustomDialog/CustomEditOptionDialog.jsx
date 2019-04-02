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

class CustomEditOptionDialog extends React.Component {
  state = {
    inputValue: ""
  };

  render() {
    const { data } = this.props;

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
                value={this.state.inputValue}
                onChange={e => this.setState({ inputValue: e.target.value })}
              />
              <CustomAddButton
                title="Adicionar item"
                onClick={() => {
                  console.log(this.state.inputValue);
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
  data: PropTypes.any.isRequired
};

const mapStateToProps = store => ({
  openDialog: store.itemsState.openDialog,
  data: store.itemsState.items
});

export default connect(
  mapStateToProps,
  { openFormDialog, closeFormDialog }
)(CustomEditOptionDialog);
