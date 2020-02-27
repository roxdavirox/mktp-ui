import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const DialogMenu = ({ anchorEl, optionId, onCreateItemClick, onClose }) => {
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem>
          <Link
            to={{
              pathname: '/templates/create',
              state: {
                fromRedirect: true,
                optionId
              }
            }}
          >
            Adicionar template
          </Link>
        </MenuItem>
        <MenuItem onClick={onCreateItemClick}>Adicionar item</MenuItem>
      </Menu>
    </div>
  );
};

DialogMenu.propTypes = {
  anchorEl: PropTypes.object,
  optionId: PropTypes.string,
  onCreateItemClick: PropTypes.func,
  onClose: PropTypes.func
};

export default DialogMenu;
