import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

const TemplateIcon = props => (
  <IconButton arial-label="ViewList" {...props}>
    <SvgIcon>
      <path
        fill="#000000"
        d="M9,7V9H11V17H13V9H15V7H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"
      />
    </SvgIcon>
  </IconButton>
);

export default TemplateIcon;
