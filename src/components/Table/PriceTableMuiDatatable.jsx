import React from "react";
import CustomMUIDataTable from "./MuiDatatables";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PriceTableMuiDatatable extends React.Component {
  render = () => {
    return <CustomMUIDataTable />;
  };
}

export default PriceTableMuiDatatable;
