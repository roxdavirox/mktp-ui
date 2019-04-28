import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const defaultToolbarStyles = {
  iconButton: {}
};

const CustomToolbar = ({ classes, title, ...rest }) => (
  <>
    <Tooltip title={title ? title : "custom Add"}>
      <IconButton className={classes.iconButton} {...rest}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  </>
);

CustomToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
