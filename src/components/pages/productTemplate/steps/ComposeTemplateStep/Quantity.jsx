import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setQuantity, selectQuantity } from 'store/ducks/productTemplate';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 35,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Quantity = ({ rowIndex }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChangeQuantity = e => {
    dispatch(setQuantity(rowIndex, e.target.value));
  };

  const quantity = useSelector(store => selectQuantity(store, rowIndex));

  return (
    <>
      <TextField
        onChange={handleChangeQuantity}
        value={quantity}
        placeholder={'1'}
        className={classes.TextField}
      />
    </>
  );
};

export default Quantity;
