import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';

// eslint-disable-next-line react/prop-types
const DuplicateIcon = ({ onClick, index, ...props }) => {
  const handleClick = () => onClick(index);
  return (
    <IconButton arial-label="ViewList" onClick={handleClick} {...props}>
      <DnsOutlinedIcon />
    </IconButton>
  );
};

export default DuplicateIcon;
