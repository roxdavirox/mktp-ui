import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DialogMenu = ({ anchorEl, onSimpleClick, onSpecificClick, onClose }) => {
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={onSimpleClick}>Intervalos simples</MenuItem>
        <MenuItem onClick={onSpecificClick}>Intervalos especificos</MenuItem>
      </Menu>
    </div>
  );
};

DialogMenu.propTypes = {
  anchorEl: PropTypes.object,
  onSimpleClick: PropTypes.func,
  onSpecificClick: PropTypes.func,
  onClose: PropTypes.func
};

export default DialogMenu;
