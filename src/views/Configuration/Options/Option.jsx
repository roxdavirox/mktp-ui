/* eslint-disable react/display-name */
import React from "react";
import { SnackbarProvider } from "notistack";

import OptionMuiDatatable from "components/Table/OptionMuiDatatable";

const Option = () => (
  <SnackbarProvider
    maxSnack={2}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
  >
    <OptionMuiDatatable />
  </SnackbarProvider>
);

export default Option;
