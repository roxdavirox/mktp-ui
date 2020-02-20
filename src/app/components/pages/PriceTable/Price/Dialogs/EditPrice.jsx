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
import ReactNumberFormat from 'react-number-format';
import { editPrice } from 'app/redux/actions/Price.actions';
import { getPrices } from 'app/redux/selectors/Price.selectors';

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

const EditPrice = ({
  enqueueSnackbar: snack,
  classes,
  onClose,
  price,
  onSetPrice
}) => {
  const prices = useSelector(store => getPrices(store));
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
    onSetPrice(price);
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
    if (prices.length <= 0) {
      disableEditButton();
      return;
    }
    if (!validateState()) {
      disableEditButton();
      return;
    }

    const price = prices.find(price => price._id === priceId);
    const index = prices.indexOf(price);
    // editando primeira linha?
    if (
      index == 0 &&
      prices.length > 1 &&
      start.floatValue !== end.floatValue &&
      start.floatValue < end.floatValue &&
      end.floatValue < prices[index + 1].start
    ) {
      enableEditButton();
      return;
    } else if (
      index > 0 &&
      start.floatValue !== end.floatValue &&
      prices[index].start !== start.floatValue &&
      prices[index].end !== end.floatValue &&
      start.floatValue < end.floatValue &&
      prices[index - 1].end < start.floatValue &&
      value.floatValue > 0 &&
      (prices.length - 1 === index || end.floatValue < prices[index + 1].start)
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
