import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ItemDialog extends React.Component {
  render() {
    const { open, onClose, onAddItem, children } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cadastrar Item</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={onAddItem} color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ItemDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
};

export default ItemDialog;
