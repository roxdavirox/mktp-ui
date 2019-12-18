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
const Size = ({
  valueX,
  valueY,
  onChangeValueX,
  onChangeValueY,
  rowIndex,
  templateItem,
  onCalculateTotal
}) => {
  const classes = useStyles();

  const handleChange = () => {
    const { isChecked } = templateItem;
    onCalculateTotal(rowIndex, templateItem, isChecked);
  };

  const handleValueXChange = e => {
    onChangeValueX(rowIndex, e.target.value);
    handleChange();
  };

  const handleValueYChange = e => {
    onChangeValueY(rowIndex, e.target.value);
    handleChange();
  };

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
  valueX: PropTypes.string,
  valueY: PropTypes.string,
  onChangeValueX: PropTypes.func.isRequired,
  onChangeValueY: PropTypes.func.isRequired,
  onCalculateTotal: PropTypes.func.isRequired,
  templateItem: PropTypes.object,
  rowIndex: PropTypes.number
};

export default Size;
