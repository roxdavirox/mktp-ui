/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuantity,
  selectQuantity,
  fetchTotal
} from 'store/ducks/productTemplate';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 45,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Quantity = ({ rowIndex, templateItem }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChangeQuantity = e => {
    dispatch(setQuantity(rowIndex, e.target.value));
    const { isChecked } = templateItem;
    dispatch(fetchTotal(rowIndex, templateItem, isChecked));
  };

  const quantity = useSelector(store => selectQuantity(store, rowIndex));

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

export default Quantity;
