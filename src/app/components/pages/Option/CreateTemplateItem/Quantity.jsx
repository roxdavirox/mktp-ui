/* eslint-disable react/prop-types */
import React, { useRef, useState, memo } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDebouncedCallback } from 'use-debounce';
const useStyles = makeStyles({
  TextField: {
    maxWidth: 45,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Quantity = ({ uuid, initialValue, onChangeQuantity }) => {
  const classes = useStyles();
  const inputRef = useRef(uuid);
  const [value, setValue] = useState(initialValue <= 1 ? 1 : initialValue);

  const [handleDebounce] = useDebouncedCallback(
    (id, v) => onChangeQuantity(id, Number(v)),
    450
  );

  const handleChangeQuantity = e => {
    if (e.target.value >= 1) {
      setValue(e.target.value);
      handleDebounce(uuid, e.target.value);
    }
  };

  return (
    <TextField
      type="number"
      value={value}
      ref={inputRef}
      onChange={handleChangeQuantity}
      placeholder={'1'}
      className={classes.TextField}
    />
  );
};

Quantity.propTypes = {
  templateItem: PropTypes.object,
  onChangeQuantity: PropTypes.func.isRequired
};

export default memo(Quantity);
