import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const addButtonStyle = {
  iconButton: {}
};

class CustomAddButton extends React.Component {
  render() {
    const { classes, title, onClick, ...rest } = this.props;

    return (
      <>
        <Tooltip title={title ? title : 'custom Add'}>
          <IconButton
            className={classes.iconButton}
            onClick={onClick}
            {...rest}
          >
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </>
    );
  }
}

CustomAddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(addButtonStyle, { name: 'CustomAddButton' })(
  CustomAddButton
);
