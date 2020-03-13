/* eslint-disable react/prop-types */
import React, { memo, useState } from 'react';
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

// TODO: mudar para uncontrolled component para melhorar a performance - onBlur
// eslint-disable-next-line react/prop-types
const Quantity = ({ itemId, initialValue, onChangeQuantity }) => {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue);

  const [handleDebounce] = useDebouncedCallback(
    (id, v) => onChangeQuantity(id, v),
    450
  );

  const handleChangeQuantity = e => {
    setValue(e.target.value);
    handleDebounce(itemId, e.target.value);
  };

  return (
    <>
      <TextField
        type="number"
        onChange={handleChangeQuantity}
        value={value <= 0 ? 1 : value || 1}
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
