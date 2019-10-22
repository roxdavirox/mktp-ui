import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setValueX, setValueY } from 'store/ducks/productTemplate';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 35,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Medida = ({ optionId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [xValue, setStateX] = useState(1);
  const [yValue, setStateY] = useState(1);

  const handleValueXChange = e => {
    setStateX(e.target.value);
    // dispatch(setValueX(optionId, e.target.value));
  };

  const handleValueYChange = e => {
    setStateY(e.target.value);
    // dispatch(setValueY(optionId, e.target.value));
  };

  return (
    <>
      <TextField
        onChange={handleValueXChange}
        placeholder={'x'}
        value={xValue}
        className={classes.TextField}
      />{' '}
      <TextField
        onChange={handleValueYChange}
        placeholder={'y'}
        value={yValue}
        className={classes.TextField}
      />{' '}
    </>
  );
};

export default Medida;
