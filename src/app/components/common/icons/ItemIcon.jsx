import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

const ItemIcon = props => (
  <IconButton arial-label="ViewList" {...props}>
    <SvgIcon>
      <path
        fill="#000000"
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M14,7H10V9H11V15H10V17H14V15H13V9H14V7Z"
      />
    </SvgIcon>
  </IconButton>
);

export default ItemIcon;
