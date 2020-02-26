import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DialogMenu = ({
  anchorEl,
  onCrateTemplateClick,
  onCreateItemClick,
  onClose
}) => {
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={onCrateTemplateClick}>Adicionar template</MenuItem>
        <MenuItem onClick={onCreateItemClick}>Adicionar item</MenuItem>
      </Menu>
    </div>
  );
};

DialogMenu.propTypes = {
  anchorEl: PropTypes.object,
  onCrateTemplateClick: PropTypes.func,
  onCreateItemClick: PropTypes.func,
  onClose: PropTypes.func
};

export default DialogMenu;
