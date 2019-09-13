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
import { addPrice, getPrices } from 'store/ducks/price';
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

const AddPriceDialog = ({
  enqueueSnackbar: snack,
  classes,
  price,
  onClose,
  priceTableId
}) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const data = useSelector(store => getPrices(store));
  useEffect(() => {
    if (price) {
      setStart(price.start);
      setEnd(price.end);
      setValue(price.value);
    }
  }, []);

  const handleSubmit = () => {
    for (var i = 0; i < data.length; i++) {
      if (
        // (data[i].end < start.floatValue &&
        //   end.floatValue < data[i + 1].start) ||
        start.floatValue > data[data.length-1].end &&
        i == data.length - 1
      ) {
        console.log(
          'i =',
          i,
          'data[i].start',
          data[i].start,
          'data[i].end',
          data[i].end
        );
        console.log(
          'start.floatValue:',
          start.floatValue,
          'end.floatValue',
          end.floatValue
        );
      }
      console.log(
        'i',
        i,
        'data length',
        data.length,
        'i === data.length -1',
        i === data.length - 1
      );
    }
    console.log('resultado:', start.floatValue > data[data.length -1].end);
    // const price = {
    //   start: Number(start.floatValue),
    //   end: Number(end.floatValue),
    //   value: Number(value.floatValue)
    // };

    // snack('Adicionando preço...', {
    //   variant: 'info',
    //   autoHideDuration: 2000
    // });

    // dispatch(addPrice(price, priceTableId, snack));
    handleClose();
  };

  const handleClose = () => onClose();

  return (
    <>
      <DialogTitle id="form-dialog-title">Adicionar preço</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              autoFocus
              margin="dense"
              id="start"
              name="start"
              label="Inicio"
              fullWidth
              // format
              customInput={TextField}
              value={start.formattedValue}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={4}
              onValueChange={_value => setStart(_value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              margin="dense"
              id="end"
              name="end"
              label="Fim"
              fullWidth
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
        <Button onClick={handleSubmit} color="primary">
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
