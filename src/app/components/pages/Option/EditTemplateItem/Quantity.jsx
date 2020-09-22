/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { EditTemplateItemContext } from './context';
import { useDebouncedCallback } from 'use-debounce';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 45,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Quantity = ({ uuid }) => {
  const classes = useStyles();
  const { templateItems, changeItemQuantity } = useContext(
    EditTemplateItemContext
  );

  const { quantity } = templateItems[uuid];

  const [value, setValue] = useState(quantity <= 1 ? 1 : quantity);

  const [handleDebounce] = useDebouncedCallback(
    (id, v) => changeItemQuantity(id, Number(v)),
    450
  );

  const handleChangeQuantity = e => {
    setValue(e.target.value);
    if (e.target.value >= 1) {
      handleDebounce(uuid, e.target.value);
    }
  };

  return (
    <>
      <TextField
        type="number"
        defaultValue={quantity}
        onChange={handleChangeQuantity}
        value={value}
        placeholder={'1'}
        className={classes.TextField}
      />
    </>
  );
};

Quantity.propTypes = {
  rowIndex: PropTypes.object,
  templateItem: PropTypes.object,
  onChangeQuantity: PropTypes.func.isRequired
};

export default Quantity;
