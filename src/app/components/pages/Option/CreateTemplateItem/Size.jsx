/* eslint-disable react/prop-types */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDebouncedCallback } from 'use-debounce';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 65,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Size = ({ onChangeValueX, onChangeValueY, itemId, size }) => {
  const classes = useStyles();
  const [x, setX] = useState(size.x);
  const [y, setY] = useState(size.y);

  const [handleDebounceX] = useDebouncedCallback(
    (id, _x) => onChangeValueX(id, _x),
    450
  );

  const handleValueXChange = e => {
    setX(e.target.value);
    handleDebounceX(itemId, e.target.value);
  };

  const [handleDebounceY] = useDebouncedCallback(
    (id, _y) => onChangeValueY(id, _y),
    450
  );

  const handleValueYChange = e => {
    setY(e.target.value);
    handleDebounceY(itemId, e.target.value);
  };

  return (
    <>
      <TextField
        type="number"
        onChange={handleValueXChange}
        placeholder={'x'}
        value={x <= 0 ? 1 : x || 1}
        className={classes.TextField}
      />{' '}
      <TextField
        type="number"
        onChange={handleValueYChange}
        placeholder={'y'}
        value={y <= 0 ? 1 : y || 1}
        className={classes.TextField}
      />{' '}
    </>
  );
};

Size.propTypes = {
  onChangeValueX: PropTypes.func.isRequired,
  onChangeValueY: PropTypes.func.isRequired,
  templateItem: PropTypes.object,
  rowIndex: PropTypes.number
};

export default memo(Size);
