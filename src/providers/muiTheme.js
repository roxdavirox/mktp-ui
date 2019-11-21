import React from 'react';

/* eslint-disable react/prop-types */
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        overflowY: 'auto'
      }
    },
    MuiDialog: {
      container: { height: 'auto' }
    },
    MUIDataTableSelectCell: {
      root: { width: '10px' }
    },
    MuiTableCell: {
      root: { padding: '1px 1px 1px 10px' }
    }
  }
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;
