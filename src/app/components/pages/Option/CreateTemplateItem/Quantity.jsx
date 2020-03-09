/* eslint-disable react/prop-types */
import React, { memo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  TextField: {
    maxWidth: 45,
    textAlign: 'center'
  }
});

// TODO: mudar para uncontrolled component para melhorar a performance - onBlur
// eslint-disable-next-line react/prop-types
const Quantity = ({ rowIndex, quantity, onChangeQuantity }) => {
  const [value, setValue] = useState(quantity);
  const classes = useStyles();

  const handleChangeQuantity = e => setValue(e.target.value);

  const handleBlur = () => {
    onChangeQuantity(rowIndex, value);
  };

  return (
    <>
      <TextField
        type="number"
        onChange={handleChangeQuantity}
        onBlur={handleBlur}
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
