import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {}
};

const Toolbar = (classes, title, onClick, ...rest) => (
  <>
    <Tooltip title={title ? title : "custom Add"}>
      <IconButton className={classes.iconButton} onClick={onClick} {...rest}>
        <AddIcon className={classes.deleteIcon} />
      </IconButton>
    </Tooltip>
  </>
);

export default withStyles(defaultToolbarStyles, { name: "Toolbar" })(Toolbar);
