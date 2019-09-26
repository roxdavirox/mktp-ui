import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { editPrice } from 'store/ducks/price';
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
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [value, setValue] = useState(0);
  const [priceId, setPriceId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (price) {
      setStart(Number(price.start));
      setEnd(Number(price.end));
      setValue(Number(price.value));
      setPriceId(price._id);
    }
  }, []);

  const handleClose = () => onClose();

  const handleSubmit = () => {
    const price = {
      start: Number(start.floatValue),
      end: Number(end.floatValue),
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
              //format
              customInput={TextField}
              defaultValue={start}
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
              margin="dense"
              id="end"
              name="end"
              label="Fim"
              fullWidth
              //format
              customInput={TextField}
              defaultValue={end}
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
              // format
              customInput={TextField}
              defaultValue={value}
              value={value.formattedValue || value}
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
