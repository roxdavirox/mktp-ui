/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 45,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Quantity = ({
  rowIndex,
  templateItem,
  onCalculateTotal,
  onChangeQuantity,
  quantity
}) => {
  const classes = useStyles();

  const handleChangeQuantity = e => {
    console.log('templateItem', templateItem);
    onChangeQuantity(rowIndex, e.target.value);
    const { isChecked } = templateItem;
    onCalculateTotal(rowIndex, templateItem, isChecked);
  };

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
  rowIndex: PropTypes.object,
  templateItem: PropTypes.object,
  onCalculateTotal: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.object
};

export default Quantity;
