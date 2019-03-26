import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import fabStyle from "assets/jss/material-dashboard-pro-react/components/floatActionButtonStyle.jsx";

const FloatActionButton = props => {
  const { classes } = props;

  return (
    <div>
      <Fab color="primary" arial-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
};

FloatActionButton.propTypes = {
  classes: PropTypes.any.isRequired
};

export default withStyles(fabStyle)(FloatActionButton);
