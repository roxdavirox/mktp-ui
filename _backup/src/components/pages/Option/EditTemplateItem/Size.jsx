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
const Size = ({ rowIndex, valueX, valueY, onChangeSizeX, onChangeSizeY }) => {
  const classes = useStyles();

  const handleValueXChange = e => onChangeSizeX(rowIndex, e.target.value);

  const handleValueYChange = e => onChangeSizeY(rowIndex, e.target.value);

  return (
    <>
      <TextField
        type="number"
        onChange={handleValueXChange}
        placeholder={'x'}
        value={valueX <= 0 ? 1 : valueX || 1}
        className={classes.TextField}
      />{' '}
      <TextField
        type="number"
        onChange={handleValueYChange}
        placeholder={'y'}
        value={valueY <= 0 ? 1 : valueY || 1}
        className={classes.TextField}
      />{' '}
    </>
  );
};

Size.propTypes = {
  onChangeSizeX: PropTypes.func.isRequired,
  onChangeSizeY: PropTypes.func.isRequired,
  rowIndex: PropTypes.object,
  templateItem: PropTypes.object,
  valueX: PropTypes.object,
  valueY: PropTypes.object
};

export default Size;
