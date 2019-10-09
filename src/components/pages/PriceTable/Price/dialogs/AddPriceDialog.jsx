/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { addPrice, getPrices, addLastPrice } from 'store/ducks/price';
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

const getEnd = data => (data.length ? Number(data[data.length - 1].end) : 0);

const AddPriceDialog = ({
  enqueueSnackbar: snack,
  classes,
  price,
  onClose,
  priceTableId
}) => {
  const data = useSelector(store => getPrices(store));
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [value, setValue] = useState(0);
  const [disableButton, setButtonState] = useState(true);
  const [isEndPrice, setEndPriceState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (price) {
      setStart(price.start);
      setEnd(price.end);
      setValue(price.value);
    } else if (data.length) {
      setStart(getEnd(data) + 0.0001);
    }
  }, []);

  const handleSubmit = () => {
    const price = {
      start: Number(start.floatValue || 0),
      end: Number(end.floatValue),
      value: Number(value.floatValue)
    };

    snack('Adicionando preço...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    if (isEndPrice) {
      // dispatch para o endpoint que adicionar no final
      dispatch(addLastPrice(price, priceTableId, snack));
      handleClose();
      return;
    }

    dispatch(addPrice(price, priceTableId, snack));
    handleClose();
  };

  const handleInputValidations = () => {
    console.log('validando inputs');
    console.log('data', data);
    console.log('start', start);
    console.log('end', end);
    console.log('value', value);

    if (
      data.length === 0 &&
      start >= 0 &&
      start < end.floatValue &&
      value.floatValue > 0
    ) {
      console.log('primeiro intervalo valido');
      setButtonState(false);
      return;
    }

    for (var i = 0; i < data.length; i++) {
      // verifica se o intervalo pode ser adicionado ao meio
      if (
        i !== data.length - 1 && //não é a ultima linha ?
        // i != 0 && // não é a primeira linha?
        start.floatValue > data[i].end &&
        end.floatValue < data[i + 1].start &&
        end.floatValue > start.floatValue &&
        value.floatValue > 0
      ) {
        console.log('é possivel adicionar aqui');
        console.log('data[i]', data[i]);
        console.log('data[i+1]', data[i + 1]);
        console.log('inicio:', start.floatValue, 'final:', end.floatValue);
        setButtonState(false);
        return;
      }

      if (
        // eslint-disable-next-line prettier/prettier
        start.floatValue > data[data.length - 1].end &&
        end.floatValue > start.floatValue &&
        i == data.length - 1 && // ultima linha?
        value.floatValue > 0
      ) {
        console.log(
          'a ultima linha possui o valor inicial maior que o ultimo valor final'
        );
        console.log(
          'index =',
          i,
          'Ultimo valor:',
          data[data.length - 1].end,
          'Próximo valor: ',
          start.floatValue
        );
        setButtonState(false);
        setEndPriceState(true);
        return;
      }
    }
    setButtonState(true);
  };

  const handleClose = () => onClose();
  return (
    <>
      <DialogTitle id="form-dialog-title">Adicionar preço</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              // autoFocus
              margin="dense"
              id="start"
              name="start"
              label="Inicio"
              fullWidth
              onKeyUp={handleInputValidations}
              defaultValue={getEnd(data) + 0.0001}
              // format
              customInput={TextField}
              value={start.formattedValue || start}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={4}
              onValueChange={_value => setStart(_value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              autoFocus
              margin="dense"
              id="end"
              name="end"
              label="Fim"
              fullWidth
              onKeyUp={handleInputValidations}
              // format
              customInput={TextField}
              value={end.formattedValue}
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
              id="value"
              name="value"
              label="Preço"
              fullWidth
              onKeyUp={handleInputValidations}
              // format
              customInput={TextField}
              value={value.formattedValue}
              prefix={'R$ '}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={4}
              onValueChange={_value => setValue(_value)}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={disableButton}>
          Adicionar
        </Button>
      </DialogActions>
    </>
  );
};

AddPriceDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object,
  priceTableId: PropTypes.string.isRequired,
  price: PropTypes.object,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(AddPriceDialog);
