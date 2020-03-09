/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 45,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Quantity = ({ rowIndex, templateItem, onChangeQuantity }) => {
  const classes = useStyles();

  const handleChangeQuantity = e => onChangeQuantity(rowIndex, e.target.value);

  const { quantity } = templateItem;
  return (
    <>
      <TextField
        type="number"
        onChange={handleChangeQuantity}
        value={quantity <= 0 ? 1 : quantity || 1}
        placeholder={'1'}
        className={classes.TextField}
      />
    </>
  );
};

Quantity.propTypes = {
  templateItem: PropTypes.object,
  onCalculateTotal: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired
};

export default memo(Quantity);
