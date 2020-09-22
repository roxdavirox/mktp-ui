/* eslint-disable react/prop-types */
import React, { useRef, useState, memo, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDebouncedCallback } from 'use-debounce';
import { CreateTemplateItemContext } from './context';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 45,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Quantity = ({ uuid }) => {
  const { changeItemQuantity, templateQuantity } = useContext(
    CreateTemplateItemContext
  );
  const classes = useStyles();
  const inputRef = useRef(uuid);
  const [value, setValue] = useState(
    templateQuantity <= 1 ? 1 : templateQuantity
  );

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
    <TextField
      type="number"
      defaultValue={value || 1}
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
