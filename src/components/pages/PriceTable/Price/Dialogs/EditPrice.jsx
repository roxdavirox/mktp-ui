import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { editPrice, getPrices } from 'store/ducks/price';
import ReactNumberFormat from 'react-number-format';

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

const EditPrice = ({ enqueueSnackbar: snack, classes, onClose, price }) => {
  const data = useSelector(store => getPrices(store));
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [value, setValue] = useState(0);
  const [disableButton, setButtonState] = useState(true);
  const [priceId, setPriceId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (price) {
      setStart(
        price.start == 0
          ? {
              formattedValue: '0,0000',
              value: '0.0000',
              floatValue: 0
            }
          : Number(price.start)
      );
      setEnd(Number(price.end));
      setValue(Number(price.value));
      setPriceId(price._id);
    }
  }, []);

  const handleClose = () => onClose();

  const handleSubmit = () => {
    const price = {
      start: Number(start.floatValue) || 0.0,
      end: Number(end.floatValue) || 0.0,
      value: Number(value.floatValue),
      _id: priceId
    };

    snack('Atualizando preço...', {
      variant: 'info',
      autoHideDuration: 2000
    });
    dispatch(editPrice(price, snack));
    handleClose();
  };

  const enableEditButton = () => setButtonState(false);
  const disableEditButton = () => setButtonState(true);

  const validateState = () => {
    const isValid =
      start &&
      (start.floatValue >= 0 || start >= 0) &&
      end &&
      (end.floatValue >= 0 || end >= 0);

    return isValid;
  };

  const handleInputValidations = () => {
    console.log('start', start);
    console.log('end', end);
    console.log('value', value);
    if (data.length <= 0) {
      disableEditButton();
      return;
    }
    if (!validateState()) {
      disableEditButton();
      console.log('invalid');
      return;
    }

    const price = data.find(price => price._id === priceId);
    const index = data.indexOf(price);
    // editando primeira linha?
    if (
      index == 0 &&
      data.length > 1 &&
      start.floatValue !== end.floatValue &&
      start.floatValue < end.floatValue &&
      end.floatValue < data[index + 1].start
    ) {
      enableEditButton();
      return;
    } else if (
      index > 0 &&
      start.floatValue !== end.floatValue &&
      data[index].start !== start.floatValue &&
      data[index].end !== end.floatValue &&
      start.floatValue < end.floatValue &&
      data[index - 1].end < start.floatValue &&
      end.floatValue < data[index + 1].start &&
      value.floatValue > 0
    ) {
      enableEditButton();
      return;
    }
    disableEditButton();
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Editar preço</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              autoFocus
              margin="dense"
              name="start"
              id="start"
              label="Inicio"
              fullWidth
              onKeyUp={handleInputValidations}
              //format
              customInput={TextField}
              defaultValue={Number(start) || 0.0}
              value={start.formattedValue || start}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={4}
              onValueChange={_value => {
                if (!_value.floatValue && !_value.value) {
                  setStart({
                    floatValue: 0,
                    formattedValue: '0,0000',
                    value: '0'
                  });
                  return;
                }
                setStart(_value);
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              margin="dense"
              id="end"
              name="end"
              label="Fim"
              fullWidth
              onKeyUp={handleInputValidations}
              //format
              customInput={TextField}
              defaultValue={Number(end) || 0.0}
              value={end.formattedValue || end}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={4}
              onValueChange={_value => setEnd(_value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              margin="dense"
              name="value"
              id="value"
              label="Preço"
              fullWidth
              onKeyUp={handleInputValidations}
              // format
              customInput={TextField}
              defaultValue={value}
              value={value.formattedValue || value}
              prefix={'R$ '}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={4}
              onValueChange={_value => {
                if (!_value.floatValue && !_value.value) {
                  setValue({
                    floatValue: 0,
                    formattedValue: '0,0000',
                    value: '0'
                  });
                  return;
                }
                setValue(_value);
              }}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={disableButton}>
          Editar
        </Button>
      </DialogActions>
    </>
  );
};

EditPrice.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  priceTableId: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(EditPrice);
