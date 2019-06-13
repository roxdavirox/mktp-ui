import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

const ViewListIcon = props => (
  <IconButton arial-label="ViewList" {...props}>
    <SvgIcon>
      <path d="M3 5v14h17V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm13 2H9v-2h9v2zm0-4H9v-2h9v2zm0-4H9V7h9v2z" />
    </SvgIcon>
  </IconButton>
);

export default ViewListIcon;
