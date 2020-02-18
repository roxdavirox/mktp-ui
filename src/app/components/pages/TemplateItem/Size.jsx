/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 65,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Size = ({ onChangeValueX, onChangeValueY, rowIndex, templateItem }) => {
  const classes = useStyles();

  const handleValueXChange = e => onChangeValueX(rowIndex, e.target.value);

  const handleValueYChange = e => onChangeValueY(rowIndex, e.target.value);

  const { size } = templateItem;
  return (
    <>
      <TextField
        type="number"
        onChange={handleValueXChange}
        placeholder={'x'}
        value={size.x <= 0 ? 1 : size.x || 1}
        className={classes.TextField}
      />{' '}
      <TextField
        type="number"
        onChange={handleValueYChange}
        placeholder={'y'}
        value={size.y <= 0 ? 1 : size.y || 1}
        className={classes.TextField}
      />{' '}
    </>
  );
};

Size.propTypes = {
  onChangeValueX: PropTypes.func.isRequired,
  onChangeValueY: PropTypes.func.isRequired,
  templateItem: PropTypes.object,
  rowIndex: PropTypes.number
};

export default Size;
