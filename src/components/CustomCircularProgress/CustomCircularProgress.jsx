import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import customCircularProgressStyle from "assets/jss/material-dashboard-pro-react/components/customCircularProgressStyle.jsx";

const CircularIndeterminate = props => {
  const { classes } = props;
  return <CircularProgress className={classes.progress} />;
};

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(customCircularProgressStyle)(CircularIndeterminate);
