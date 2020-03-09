/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '--text-body': 'cornsilk'
  }
});

const SnackbarProviderWrapped = props => {
  const classes = useStyles();
  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      ContentProps={{ classes: { root: classes.root } }}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default memo(SnackbarProviderWrapped);
