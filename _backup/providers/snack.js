import React from 'react';

import { SnackbarProvider } from 'notistack';

const SnackProvider = ({ children }) => (
  <SnackbarProvider
    maxSnack={2}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
  >
    {children}
  </SnackbarProvider>
);

export default SnackProvider;
