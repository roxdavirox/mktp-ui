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
const Size = ({ onChangeValueX, onChangeValueY, uuid, size }) => {
  const classes = useStyles();
  const [x, setX] = useState(size.x);
  const [y, setY] = useState(size.y);

  const [handleDebounceX] = useDebouncedCallback(
    (id, _x) => onChangeValueX(id, _x),
    450
  );

  const handleValueXChange = e => {
    setX(e.target.value);
    if (e.target.value >= 1) {
      handleDebounceX(uuid, e.target.value);
    }
  };

  const [handleDebounceY] = useDebouncedCallback(
    (id, _y) => onChangeValueY(id, _y),
    450
  );

  const handleValueYChange = e => {
    setY(e.target.value);
    if (e.target.value >= 1) {
      handleDebounceY(uuid, e.target.value);
    }
  };

  return (
    <>
      <TextField
        type="number"
        defaultValue={x || 1}
        onChange={handleValueXChange}
        placeholder={'1'}
        value={x}
        className={classes.TextField}
      />{' '}
      <TextField
        type="number"
        defaultValue={y || 1}
        onChange={handleValueYChange}
        placeholder={'1'}
        value={y}
        className={classes.TextField}
      />{' '}
    </>
  );
};

Size.propTypes = {
  onChangeValueX: PropTypes.func.isRequired,
  onChangeValueY: PropTypes.func.isRequired,
  templateItem: PropTypes.object
};

export default memo(Size);
