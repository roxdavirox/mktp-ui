import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/More';
import BallotIcon from '../icons/BallotIcon';
import ViewListIcon from '../icons/ViewListIcon';
import PropTypes from 'prop-types';

export const CustomToolbar = ({ children, title, ...rest }) => {
  return (
    <>
      <Tooltip title={title ? title : 'custom toolbar'} {...rest}>
        <IconButton>{children}</IconButton>
      </Tooltip>
    </>
  );
};

CustomToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.func
};

export const AddToolbar = props => (
  <CustomToolbar {...props}>
    <AddIcon />
  </CustomToolbar>
);

export const BallotToolbar = props => (
  <CustomToolbar {...props}>
    <BallotIcon style={{ padding: 0 }} />
  </CustomToolbar>
);

export const ViewListToolbar = props => (
  <CustomToolbar {...props}>
    <ViewListIcon />
  </CustomToolbar>
);

export const MoreToolbar = props => (
  <CustomToolbar {...props}>
    <MoreIcon />
  </CustomToolbar>
);
