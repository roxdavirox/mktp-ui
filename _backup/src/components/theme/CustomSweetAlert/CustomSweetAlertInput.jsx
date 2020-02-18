import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// react component used to create sweet alerts
import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx';

const CustomSweetAlertInput = props => {
  const { classes, title, ...rest } = props;

  return (
    <SweetAlert
      input
      showCancel
      style={{ display: 'block', marginTop: '-100px' }}
      title={title ? title : 'Input something'}
      confirmBtnCssClass={classes.button + ' ' + classes.info}
      cancelBtnCssClass={classes.button + ' ' + classes.danger}
      // onConfirm={e => this.inputConfirmAlert(e)}
      // onCancel={() => this.hideAlert()}x  v
      {...rest}
    />
  );
};

CustomSweetAlertInput.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(sweetAlertStyle)(CustomSweetAlertInput);
