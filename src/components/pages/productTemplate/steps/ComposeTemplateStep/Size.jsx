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
    maxWidth: 65,
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

export default Size;
