/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';

import GetComponentType from './types';

const DialogContainer = props => {
  console.log('type dialog', props.type);
  const Component = GetComponentType(props.type);
  return (
    <div>
      <MuiDialog {...props} aria-labelledby="form-dialog-title">
        <Component {...props} />
      </MuiDialog>
    </div>
  );
};

DialogContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  price: PropTypes.object,
  type: PropTypes.string.isRequired
};

export default DialogContainer;
