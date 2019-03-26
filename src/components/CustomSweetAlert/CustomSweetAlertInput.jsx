import React from "react";
import PropTypes, { object } from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// react component used to create sweet alerts
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const CustomSweetAlertInput = props => {
  const { classes } = props;

  return (
    <SweetAlert
      input
      showCancel
      style={{ display: "block", marginTop: "-100px" }}
      title="Input something"
      onConfirm={e => this.inputConfirmAlert(e)}
      onCancel={() => this.hideAlert()}
      confirmBtnCssClass={classes.button + " " + classes.info}
      cancelBtnCssClass={classes.button + " " + classes.danger}
    />
  );
};

CustomSweetAlertInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sweetAlertStyle)(CustomSweetAlertInput);
