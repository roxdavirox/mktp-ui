/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { EditTemplateItemContext } from './context';
import { useDebouncedCallback } from 'use-debounce';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 65,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prop-types
const Size = ({ uuid }) => {
  const classes = useStyles();
  const { changeSizeX, changeSizeY, templateItems } = useContext(
    EditTemplateItemContext
  );
  const { size } = templateItems[uuid];

  const [x, setX] = useState(size.x);
  const [y, setY] = useState(size.y);

  const [handleDebounceX] = useDebouncedCallback(
    (id, _x) => changeSizeX(id, _x),
    450
  );

  const handleValueXChange = e => {
    setX(e.target.value);
    if (e.target.value >= 1) {
      handleDebounceX(uuid, e.target.value);
    }
  };

  const [handleDebounceY] = useDebouncedCallback(
    (id, _y) => changeSizeY(id, _y),
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
        defaultValue={size.x}
        onChange={handleValueXChange}
        placeholder={'x'}
        value={x <= 0 ? 1 : x || 1}
        className={classes.TextField}
      />{' '}
      <TextField
        type="number"
        defaultValue={size.y}
        onChange={handleValueYChange}
        placeholder={'y'}
        value={y <= 0 ? 1 : y || 1}
        className={classes.TextField}
      />{' '}
    </>
  );
};

Size.propTypes = {
  uuid: PropTypes.object
};

export default Size;
