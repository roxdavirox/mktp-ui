/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';

import AddCategoryDialog from './Dialogs/AddCategoryDialog';
import AddDesignTemplateDialog from './Dialogs/AddDesignTemplateDialog';

const Dialog = props => {
  const { open, onClose, type } = props;
  const dialogs = {
    category: <AddCategoryDialog {...props} />,
    design: <AddDesignTemplateDialog {...props} />
  };

  return (
    <div>
      <MuiDialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        {dialogs[type]}
      </MuiDialog>
    </div>
  );
};

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default Dialog;
