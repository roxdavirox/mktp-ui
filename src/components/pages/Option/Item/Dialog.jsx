/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import AddItemDialog from './dialogs/AddItemDialog';
import EditItemDialog from './dialogs/EditItemDialog';
import ExistingItems from './dialogs/ExistingItems';

const Dialog = props => {
  const { onClose, open, mode } = props;
  const handleClose = () => onClose();

  const dialogs = {
    add: <AddItemDialog {...props} />,
    edit: <EditItemDialog {...props} />,
    existing: <ExistingItems {...props} />
  };

  return (
    <div>
      <MuiDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {dialogs[mode]}
      </MuiDialog>
    </div>
  );
};

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  selectedItems: PropTypes.array.isRequired,
  priceTables: PropTypes.array.isRequired
};

export default Dialog;
