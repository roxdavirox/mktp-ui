/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';

import AddPriceDialog from './dialogs/AddPriceDialog';
import EditPrice from './dialogs/EditPrice';
import RangePrice from './dialogs/RangePrice';

const Dialog = props => {
  const { open, onClose, mode } = props;
  const dialogs = {
    add: <AddPriceDialog {...props} />,
    edit: <EditPrice {...props} />,
    range: <RangePrice {...props} />
  };

  return (
    <div>
      <MuiDialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        {dialogs[mode]}
      </MuiDialog>
    </div>
  );
};

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // classes: PropTypes.object.isRequired,
  price: PropTypes.object,
  mode: PropTypes.string.isRequired
};

export default Dialog;
