/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import AddItem from './dialogs/AddItem';
import EditItem from './dialogs/EditItem';
import ExistingItems from './dialogs/ExistingItems';

class Dialog extends React.Component {
  handleClose = () => {
    const { fnClose } = this.props;
    fnClose();
  };

  render() {
    const { open, mode } = this.props;

    const dialogs = {
      add: <AddItem {...this.props} />,
      edit: <EditItem {...this.props} />,
      existing: <ExistingItems {...this.props} />
    };

    return (
      <div>
        <MuiDialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {dialogs[mode]}
        </MuiDialog>
      </div>
    );
  }
}

Dialog.propTypes = {
  fnClose: PropTypes.func.isRequired,
  fnSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  priceTables: PropTypes.array.isRequired,
  allItems: PropTypes.array.isRequired,
  fnChangeName: PropTypes.func.isRequired,
  fnSelect: PropTypes.func.isRequired
};

export default Dialog;
