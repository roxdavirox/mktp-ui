import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';

const DuplicateIcon = props => (
  <IconButton arial-label="ViewList" {...props}>
    <DnsOutlinedIcon />
  </IconButton>
);

export default DuplicateIcon;
