import React from "react";

/* eslint-disable react/prop-types */
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        overflowY: "auto"
      }
    },
    MuiDialog: {
      container: { height: "auto" }
    },
    MUIDataTableSelectCell: {
      root: { width: "10px" }
    }
  }
});

const MuiTheme = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default MuiTheme;
