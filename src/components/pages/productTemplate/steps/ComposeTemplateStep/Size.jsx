import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setValueX,
  selectValueX,
  selectValueY,
  setValueY
} from 'store/ducks/productTemplate';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 35,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Size = ({ rowIndex }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleValueXChange = e => {
    dispatch(setValueX(rowIndex, e.target.value));
  };

  const handleValueYChange = e => {
    dispatch(setValueY(rowIndex, e.target.value));
  };

  const valueX = useSelector(store => selectValueX(store, rowIndex));
  const valueY = useSelector(store => selectValueY(store, rowIndex));

  return (
    <>
      <TextField
        onChange={handleValueXChange}
        placeholder={'x'}
        value={valueX}
        className={classes.TextField}
      />{' '}
      <TextField
        onChange={handleValueYChange}
        placeholder={'y'}
        value={valueY}
        className={classes.TextField}
      />{' '}
    </>
  );
};

export default Size;
