import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  render() {
    const { classes, title, onClick, ...rest } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={title ? title : "custom Add"}>
          <IconButton
            className={classes.iconButton}
            onClick={onClick}
            {...rest}
          >
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
