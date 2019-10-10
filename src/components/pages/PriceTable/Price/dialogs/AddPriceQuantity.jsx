/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ReactNumberFormat from 'react-number-format';
//redux
import { addPrice, getPrices, addLastPrice } from 'store/ducks/price';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
}));

const AddPrice = ({ enqueueSnackbar: snack, onClose, priceTableId }) => {
  const classes = useStyles();
  const data = useSelector(store => getPrices(store));
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [value, setValue] = useState(0);
  const [disableButton, setButtonState] = useState(true);
  const [isEndPrice, setEndPriceState] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const price = {
      start: Number(start || 0),
      end: Number(end),
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
      start < end &&
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
            <TextField
              autoFocus
              margin="dense"
              id="start"
              name="start"
              label="Inicio"
              fullWidth
              onKeyUp={handleInputValidations}
              value={start}
              onChange={e => setStart(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              // autoFocus
              margin="dense"
              id="end"
              name="end"
              label="Fim"
              fullWidth
              onKeyUp={handleInputValidations}
              value={end}
              onChange={e => setEnd(e.target.value)}
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

AddPrice.propTypes = {
  onClose: PropTypes.func.isRequired,
  priceTableId: PropTypes.string.isRequired,
  price: PropTypes.object,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default AddPrice;
