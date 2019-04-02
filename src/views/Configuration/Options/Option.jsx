/* eslint-disable react/display-name */
import React from "react";
import { SnackbarProvider } from "notistack";

import OptionMuiDatatable from "components/Table/OptionMuiDatatable";

const Option = () => (
  <SnackbarProvider maxSnack={2}>
    <OptionMuiDatatable />
  </SnackbarProvider>
);

export default Option;
