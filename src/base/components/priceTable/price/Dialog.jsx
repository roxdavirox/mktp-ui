/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';

import AddPrice from './dialogs/AddPrice';
import EditPrice from './dialogs/EditPrice';
import RangePrice from './dialogs/RangePrice';

const Dialog = props => {
  const { open, fnClose, mode } = props;
  const dialogs = {
    add: <AddPrice {...props} />,
    edit: <EditPrice {...props} />,
    range: <RangePrice {...props} />
  };

  return (
    <div>
      <MuiDialog
        open={open}
        onClose={fnClose}
        aria-labelledby="form-dialog-title"
      >
        {dialogs[mode]}
      </MuiDialog>
    </div>
  );
};

Dialog.propTypes = {
  fnClose: PropTypes.func.isRequired,
  fnSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  price: PropTypes.object,
  mode: PropTypes.string.isRequired
};

export default Dialog;
